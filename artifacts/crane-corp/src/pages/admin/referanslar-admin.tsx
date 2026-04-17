import { useState } from "react";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
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

  function handleDelete(id: number, name: string) {
    if (!confirm(`"${name}" referansını silmek istediğinizden emin misiniz?`)) return;
    deleteMutation.mutate(id);
  }

  const fields: { key: keyof typeof empty; label: string; placeholder: string }[] = [
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {fields.map(f => (
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
            <Button size="sm" variant="ghost" className="rounded-sm text-gray-500" onClick={() => setIsAdding(false)}>
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
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                          {fields.map(f => (
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
                          <Button size="sm" className="bg-[#8B1A1A] text-white rounded-sm h-7 px-2" onClick={() => updateMutation.mutate({ id: r.id, data: editing })} disabled={updateMutation.isPending}>
                            <Check className="w-3.5 h-3.5" />
                          </Button>
                          <Button size="sm" variant="ghost" className="rounded-sm h-7 px-2 text-gray-500" onClick={() => setEditing(null)}>
                            <X className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-4 px-5 font-semibold text-gray-900">{r.companyName}</td>
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
