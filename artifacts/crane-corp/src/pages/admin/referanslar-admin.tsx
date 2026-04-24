import { useState, useRef } from "react";
import { Plus, Pencil, Trash2, X, Check, Upload, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface Reference {
  id: number;
  companyName: string;
  sector: string;
  project: string;
  location: string;
  year: string;
  logoUrl: string;
}

const empty = { companyName: "", sector: "", project: "", location: "", year: "", logoUrl: "" };

async function fetchRefs(): Promise<Reference[]> {
  const r = await fetch("/api/references");
  return r.json();
}

export default function ReferanslarAdmin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isAdding, setIsAdding] = useState(false);
  const [newRef, setNewRef] = useState({ ...empty });
  const [editing, setEditing] = useState<Reference | null>(null);
  const [uploading, setUploading] = useState(false);
  const newLogoRef = useRef<HTMLInputElement>(null);
  const editLogoRef = useRef<HTMLInputElement>(null);

  const { data: refs, isLoading } = useQuery({ queryKey: ["references"], queryFn: fetchRefs });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["references"] });

  const createMutation = useMutation({
    mutationFn: async (data: typeof empty) => {
      const r = await fetch("/api/references", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!r.ok) throw new Error("Hata");
      return r.json();
    },
    onSuccess: () => { invalidate(); setIsAdding(false); setNewRef({ ...empty }); toast({ title: "Referans eklendi" }); },
    onError: () => toast({ title: "Hata", variant: "destructive" }),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: number; data: typeof empty }) => {
      const r = await fetch(`/api/references/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!r.ok) throw new Error("Hata");
      return r.json();
    },
    onSuccess: () => { invalidate(); setEditing(null); toast({ title: "Referans güncellendi" }); },
    onError: () => toast({ title: "Hata", variant: "destructive" }),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/references/${id}`, { method: "DELETE" });
    },
    onSuccess: () => { invalidate(); toast({ title: "Referans silindi" }); },
    onError: () => toast({ title: "Hata", variant: "destructive" }),
  });

  async function uploadFile(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Yükleme başarısız");
    const data = await res.json();
    return data.url as string;
  }

  async function handleLogoUpload(file: File, target: "new" | "edit") {
    setUploading(true);
    try {
      const url = await uploadFile(file);
      if (target === "new") setNewRef(p => ({ ...p, logoUrl: url }));
      else setEditing(p => p ? { ...p, logoUrl: url } : p);
      toast({ title: "Logo yüklendi" });
    } catch {
      toast({ title: "Hata", description: "Yükleme başarısız.", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  }

  function handleDelete(id: number, name: string) {
    if (!confirm(`"${name}" referansını silmek istediğinizden emin misiniz?`)) return;
    deleteMutation.mutate(id);
  }

  const infoFields: { key: keyof typeof empty; label: string; placeholder: string }[] = [
    { key: "companyName", label: "Firma Adı *", placeholder: "Örn. Pekgöz Vinç" },
    { key: "sector", label: "Sektör", placeholder: "Vinç & Kaldırma" },
    { key: "project", label: "Proje", placeholder: "Hidrolik Kurtarıcı Teslimi" },
    { key: "location", label: "Lokasyon", placeholder: "İzmir" },
    { key: "year", label: "Yıl", placeholder: "2025" },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Referanslar</h1>
          <p className="text-gray-500 text-sm mt-1">{isLoading ? "Yükleniyor..." : `${refs?.length ?? 0} referans firması`}</p>
        </div>
        <Button
          className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold rounded-sm border-none"
          onClick={() => { setIsAdding(true); setEditing(null); }}
        >
          <Plus className="w-4 h-4 mr-2" /> Referans Ekle
        </Button>
      </div>

      {/* Yeni Referans Formu */}
      {isAdding && (
        <div className="bg-white border border-gray-200 rounded-sm p-5 mb-5">
          <h2 className="font-bold text-gray-900 text-sm mb-4">Yeni Referans</h2>

          {/* Logo yükleme */}
          <div className="mb-4">
            <label className="text-xs font-semibold text-gray-500 block mb-2">FİRMA LOGOSU</label>
            <input
              ref={newLogoRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => { const f = e.target.files?.[0]; if (f) handleLogoUpload(f, "new"); }}
            />
            <div className="flex items-center gap-3">
              {newRef.logoUrl ? (
                <div className="relative w-16 h-16 flex-shrink-0">
                  <img src={newRef.logoUrl} alt="Logo" className="w-full h-full object-contain rounded-sm border border-gray-200 bg-white p-1" />
                  <button type="button" className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center"
                    onClick={() => setNewRef(p => ({ ...p, logoUrl: "" }))}>
                    <X className="w-2.5 h-2.5" />
                  </button>
                </div>
              ) : (
                <div className="w-16 h-16 border-2 border-dashed border-gray-200 rounded-sm flex items-center justify-center bg-gray-50 flex-shrink-0">
                  <Building2 className="w-6 h-6 text-gray-300" />
                </div>
              )}
              <div className="flex flex-col gap-1.5">
                <Button type="button" variant="outline" size="sm" className="rounded-sm border-gray-300 text-gray-600 h-8 text-xs self-start"
                  onClick={() => newLogoRef.current?.click()} disabled={uploading}>
                  <Upload className="w-3.5 h-3.5 mr-1.5" /> {uploading ? "Yükleniyor..." : "Logo Yükle"}
                </Button>
                <Input
                  placeholder="veya logo URL girin..."
                  value={newRef.logoUrl}
                  onChange={e => setNewRef(p => ({ ...p, logoUrl: e.target.value }))}
                  className="rounded-sm border-gray-200 text-xs h-8 w-72"
                />
              </div>
            </div>
          </div>

          {/* Bilgi alanları */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {infoFields.map(f => (
              <div key={f.key}>
                <label className="text-xs font-semibold text-gray-500 block mb-1">{f.label}</label>
                <Input
                  placeholder={f.placeholder}
                  value={newRef[f.key]}
                  onChange={e => setNewRef(prev => ({ ...prev, [f.key]: e.target.value }))}
                  className="rounded-sm border-gray-200 text-sm h-9"
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              size="sm"
              className="bg-[#8B1A1A] hover:bg-[#A52020] text-white rounded-sm"
              onClick={() => createMutation.mutate(newRef)}
              disabled={!newRef.companyName || createMutation.isPending}
            >
              <Check className="w-3.5 h-3.5 mr-1.5" />
              {createMutation.isPending ? "Kaydediliyor..." : "Kaydet"}
            </Button>
            <Button size="sm" variant="ghost" className="rounded-sm text-gray-500"
              onClick={() => { setIsAdding(false); setNewRef({ ...empty }); }}>
              <X className="w-3.5 h-3.5 mr-1.5" /> İptal
            </Button>
          </div>
        </div>
      )}

      {/* Tablo */}
      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-5 text-gray-500 font-semibold text-xs">Firma</th>
              <th className="text-left py-3 px-5 text-gray-500 font-semibold text-xs hidden md:table-cell">Sektör</th>
              <th className="text-left py-3 px-5 text-gray-500 font-semibold text-xs hidden lg:table-cell">Proje</th>
              <th className="text-left py-3 px-5 text-gray-500 font-semibold text-xs hidden md:table-cell">Lokasyon</th>
              <th className="text-left py-3 px-5 text-gray-500 font-semibold text-xs">Yıl</th>
              <th className="py-3 px-5 text-gray-500 font-semibold text-xs text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array(4).fill(0).map((_, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td colSpan={6} className="p-4"><Skeleton className="h-7" /></td>
                </tr>
              ))
              : refs?.map((r) => (
                <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  {editing?.id === r.id ? (
                    <>
                      <td colSpan={5} className="py-3 px-5">
                        {/* Logo yükleme - düzenleme modu */}
                        <div className="flex items-center gap-2 mb-2">
                          <input ref={editLogoRef} type="file" accept="image/*" className="hidden"
                            onChange={e => { const f = e.target.files?.[0]; if (f) handleLogoUpload(f, "edit"); }} />
                          {editing.logoUrl ? (
                            <img src={editing.logoUrl} alt="Logo" className="w-10 h-10 object-contain rounded border border-gray-200 bg-white p-0.5 flex-shrink-0" />
                          ) : (
                            <div className="w-10 h-10 border border-dashed border-gray-200 rounded flex items-center justify-center bg-gray-50 flex-shrink-0">
                              <Building2 className="w-4 h-4 text-gray-300" />
                            </div>
                          )}
                          <Button type="button" variant="outline" size="sm" className="rounded-sm border-gray-200 text-gray-500 h-7 text-xs"
                            onClick={() => editLogoRef.current?.click()} disabled={uploading}>
                            <Upload className="w-3 h-3 mr-1" /> Logo
                          </Button>
                          <Input
                            placeholder="Logo URL..."
                            value={editing.logoUrl}
                            onChange={e => setEditing(p => p ? { ...p, logoUrl: e.target.value } : p)}
                            className="rounded-sm border-gray-200 text-xs h-7 flex-1"
                          />
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {infoFields.map(f => (
                            <Input
                              key={f.key}
                              placeholder={f.placeholder}
                              value={editing[f.key]}
                              onChange={e => setEditing(prev => prev ? ({ ...prev, [f.key]: e.target.value }) : null)}
                              className="rounded-sm border-gray-200 text-xs h-8"
                            />
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex justify-end gap-1">
                          <Button size="sm" className="bg-[#8B1A1A] text-white rounded-sm h-7 px-2"
                            onClick={() => updateMutation.mutate({ id: r.id, data: editing })} disabled={updateMutation.isPending}>
                            <Check className="w-3.5 h-3.5" />
                          </Button>
                          <Button size="sm" variant="ghost" className="rounded-sm h-7 px-2 text-gray-500"
                            onClick={() => setEditing(null)}>
                            <X className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-3">
                          {r.logoUrl ? (
                            <img src={r.logoUrl} alt={r.companyName} className="w-10 h-10 object-contain rounded bg-white border border-gray-100 p-0.5 flex-shrink-0"
                              onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                          ) : (
                            <div className="w-10 h-10 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <Building2 className="w-4 h-4 text-gray-300" />
                            </div>
                          )}
                          <span className="font-semibold text-gray-900">{r.companyName}</span>
                        </div>
                      </td>
                      <td className="py-4 px-5 text-gray-500 hidden md:table-cell">{r.sector}</td>
                      <td className="py-4 px-5 text-gray-600 hidden lg:table-cell">{r.project}</td>
                      <td className="py-4 px-5 text-gray-500 hidden md:table-cell">{r.location}</td>
                      <td className="py-4 px-5">
                        <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-sm">{r.year}</span>
                      </td>
                      <td className="py-4 px-5">
                        <div className="flex items-center gap-1 justify-end">
                          <button
                            className="p-1.5 text-gray-400 hover:text-[#8B1A1A] hover:bg-red-50 rounded-sm transition-colors"
                            onClick={() => setEditing(r)}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-colors"
                            onClick={() => handleDelete(r.id, r.companyName)}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {!isLoading && refs?.length === 0 && (
        <div className="text-center py-16 text-gray-400">Henüz referans eklenmemiş.</div>
      )}
    </div>
  );
}
