import { useState, useRef } from "react";
import { useListCategories, useCreateCategory, useUpdateCategory, useDeleteCategory, getListCategoriesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2, X, Check, Upload, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type EditState = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  sortOrder: number;
} | null;

const emptyNew = { name: "", slug: "", description: "", image: "", sortOrder: 0 };

export default function AdminCategories() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<EditState>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newCat, setNewCat] = useState({ ...emptyNew });
  const [uploading, setUploading] = useState(false);
  const newImageRef = useRef<HTMLInputElement>(null);
  const editImageRef = useRef<HTMLInputElement>(null);

  const { data: categories, isLoading } = useListCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: getListCategoriesQueryKey() });
  }

  function autoSlug(name: string) {
    return name.toLowerCase()
      .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
      .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  async function uploadFile(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Yükleme başarısız");
    const data = await res.json();
    return data.url as string;
  }

  async function handleImageUpload(file: File, target: "new" | "edit") {
    setUploading(true);
    try {
      const url = await uploadFile(file);
      if (target === "new") setNewCat(p => ({ ...p, image: url }));
      else setEditing(p => p ? { ...p, image: url } : p);
      toast({ title: "Görsel yüklendi" });
    } catch {
      toast({ title: "Hata", description: "Yükleme başarısız.", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  }

  function handleCreate() {
    if (!newCat.name || !newCat.slug) {
      toast({ title: "Ad ve slug zorunludur", variant: "destructive" });
      return;
    }
    createCategory.mutate(
      { data: { ...newCat } },
      {
        onSuccess: () => {
          invalidate();
          setIsAdding(false);
          setNewCat({ ...emptyNew });
          toast({ title: "Kategori eklendi" });
        },
        onError: () => toast({ title: "Hata", variant: "destructive" }),
      }
    );
  }

  function handleUpdate() {
    if (!editing) return;
    updateCategory.mutate(
      { id: editing.id, data: { name: editing.name, slug: editing.slug, description: editing.description, image: editing.image, sortOrder: editing.sortOrder } },
      {
        onSuccess: () => { invalidate(); setEditing(null); toast({ title: "Kategori güncellendi" }); },
        onError: () => toast({ title: "Hata", variant: "destructive" }),
      }
    );
  }

  function handleDelete(id: number, name: string) {
    if (!confirm(`"${name}" kategorisini silmek istediğinizden emin misiniz?`)) return;
    deleteCategory.mutate(
      { id },
      {
        onSuccess: () => { invalidate(); toast({ title: "Kategori silindi" }); },
        onError: () => toast({ title: "Hata", variant: "destructive" }),
      }
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Ürün Grupları</h1>
          <p className="text-gray-500 text-sm mt-1">
            {isLoading ? "Yükleniyor..." : `${categories?.length ?? 0} kategori`}
          </p>
        </div>
        <Button
          className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold rounded-sm border-none"
          onClick={() => { setIsAdding(true); setEditing(null); }}
          disabled={isAdding}
        >
          <Plus className="w-4 h-4 mr-2" /> Kategori Ekle
        </Button>
      </div>

      {/* Yeni Kategori Formu */}
      {isAdding && (
        <div className="bg-white border border-gray-200 rounded-sm p-5 mb-5">
          <h2 className="font-bold text-gray-900 text-sm mb-4">Yeni Kategori</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">KATEGORİ ADI *</label>
              <Input
                placeholder="örn. Mobil Katlanır Vinç"
                value={newCat.name}
                onChange={e => setNewCat(p => ({ ...p, name: e.target.value, slug: p.slug || autoSlug(e.target.value) }))}
                className="rounded-sm border-gray-200 text-sm h-9"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">SLUG (URL) *</label>
              <Input
                placeholder="mobil-katlanir-vinc"
                value={newCat.slug}
                onChange={e => setNewCat(p => ({ ...p, slug: e.target.value }))}
                className="rounded-sm border-gray-200 text-sm h-9"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">AÇIKLAMA</label>
              <Input
                placeholder="Kısa açıklama"
                value={newCat.description}
                onChange={e => setNewCat(p => ({ ...p, description: e.target.value }))}
                className="rounded-sm border-gray-200 text-sm h-9"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1">SIRA NO</label>
              <Input
                type="number"
                value={newCat.sortOrder}
                onChange={e => setNewCat(p => ({ ...p, sortOrder: parseInt(e.target.value) || 0 }))}
                className="rounded-sm border-gray-200 text-sm h-9 w-24"
              />
            </div>
            <div className="md:col-span-2">
              <label className="text-xs font-semibold text-gray-500 block mb-1">KATEGORİ GÖRSELİ</label>
              <input
                ref={newImageRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, "new"); }}
              />
              <div className="flex items-center gap-3">
                {newCat.image ? (
                  <div className="relative w-16 h-16 flex-shrink-0">
                    <img src={newCat.image} alt="" className="w-full h-full object-contain rounded-sm border border-gray-200 bg-gray-50 p-1" />
                    <button type="button" className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center"
                      onClick={() => setNewCat(p => ({ ...p, image: "" }))}>
                      <X className="w-2.5 h-2.5" />
                    </button>
                  </div>
                ) : (
                  <div className="w-16 h-16 border-2 border-dashed border-gray-200 rounded-sm flex items-center justify-center bg-gray-50 flex-shrink-0">
                    <Image className="w-5 h-5 text-gray-300" />
                  </div>
                )}
                <div className="flex flex-col gap-1.5">
                  <Button type="button" variant="outline" size="sm" className="rounded-sm border-gray-300 text-gray-600 h-8 text-xs"
                    onClick={() => newImageRef.current?.click()} disabled={uploading}>
                    <Upload className="w-3.5 h-3.5 mr-1.5" /> {uploading ? "Yükleniyor..." : "Görsel Yükle"}
                  </Button>
                  <Input
                    placeholder="veya görsel yolu girin..."
                    value={newCat.image}
                    onChange={e => setNewCat(p => ({ ...p, image: e.target.value }))}
                    className="rounded-sm border-gray-200 text-xs h-8 w-64"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <Button
              size="sm"
              className="bg-[#8B1A1A] hover:bg-[#A52020] text-white rounded-sm"
              onClick={handleCreate}
              disabled={!newCat.name || !newCat.slug || createCategory.isPending}
            >
              <Check className="w-3.5 h-3.5 mr-1.5" />
              {createCategory.isPending ? "Kaydediliyor..." : "Kaydet"}
            </Button>
            <Button size="sm" variant="ghost" className="rounded-sm text-gray-500"
              onClick={() => { setIsAdding(false); setNewCat({ ...emptyNew }); }}>
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
              <th className="text-left py-3 px-5 text-gray-500 font-semibold text-xs">Kategori</th>
              <th className="text-left py-3 px-5 text-gray-500 font-semibold text-xs hidden md:table-cell">Slug</th>
              <th className="text-left py-3 px-5 text-gray-500 font-semibold text-xs hidden lg:table-cell">Ürün Sayısı</th>
              <th className="text-left py-3 px-5 text-gray-500 font-semibold text-xs hidden md:table-cell">Sıra</th>
              <th className="py-3 px-5 text-gray-500 font-semibold text-xs text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array(4).fill(0).map((_, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td colSpan={5} className="p-4"><Skeleton className="h-8" /></td>
                </tr>
              ))
              : categories?.map((cat) => (
                <tr key={cat.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  {editing?.id === cat.id ? (
                    <>
                      <td className="py-3 px-5" colSpan={4}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2">
                          <Input className="rounded-sm border-gray-200 text-xs h-8" placeholder="Ad" value={editing.name}
                            onChange={e => setEditing(p => p ? { ...p, name: e.target.value } : p)} />
                          <Input className="rounded-sm border-gray-200 text-xs h-8" placeholder="slug" value={editing.slug}
                            onChange={e => setEditing(p => p ? { ...p, slug: e.target.value } : p)} />
                          <Input className="rounded-sm border-gray-200 text-xs h-8" placeholder="Açıklama" value={editing.description}
                            onChange={e => setEditing(p => p ? { ...p, description: e.target.value } : p)} />
                          <Input type="number" className="rounded-sm border-gray-200 text-xs h-8" placeholder="Sıra" value={editing.sortOrder}
                            onChange={e => setEditing(p => p ? { ...p, sortOrder: parseInt(e.target.value) || 0 } : p)} />
                        </div>
                        <div className="flex items-center gap-2">
                          <input ref={editImageRef} type="file" accept="image/*" className="hidden"
                            onChange={e => { const f = e.target.files?.[0]; if (f) handleImageUpload(f, "edit"); }} />
                          {editing.image ? (
                            <img src={editing.image} alt="" className="w-10 h-10 object-contain rounded bg-gray-100 border border-gray-200 p-0.5" />
                          ) : (
                            <div className="w-10 h-10 border border-dashed border-gray-200 rounded flex items-center justify-center bg-gray-50">
                              <Image className="w-4 h-4 text-gray-300" />
                            </div>
                          )}
                          <Button type="button" variant="outline" size="sm" className="rounded-sm border-gray-200 text-gray-500 h-7 text-xs"
                            onClick={() => editImageRef.current?.click()} disabled={uploading}>
                            <Upload className="w-3 h-3 mr-1" /> Görsel
                          </Button>
                          <Input className="rounded-sm border-gray-200 text-xs h-7 flex-1" placeholder="Görsel yolu..." value={editing.image}
                            onChange={e => setEditing(p => p ? { ...p, image: e.target.value } : p)} />
                        </div>
                      </td>
                      <td className="py-3 px-5">
                        <div className="flex justify-end gap-1">
                          <Button size="sm" className="bg-[#8B1A1A] text-white rounded-sm h-7 px-2"
                            onClick={handleUpdate} disabled={updateCategory.isPending}>
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
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-3">
                          {cat.image ? (
                            <img src={cat.image} alt={cat.name} className="w-9 h-9 object-contain rounded bg-gray-100 border border-gray-100 p-0.5 flex-shrink-0" />
                          ) : (
                            <div className="w-9 h-9 rounded bg-gray-100 flex items-center justify-center flex-shrink-0">
                              <Image className="w-4 h-4 text-gray-300" />
                            </div>
                          )}
                          <div>
                            <div className="font-bold text-gray-900">{cat.name}</div>
                            {cat.description && <div className="text-xs text-gray-400 mt-0.5">{cat.description}</div>}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-5 text-gray-400 text-xs font-mono hidden md:table-cell">{cat.slug}</td>
                      <td className="py-3 px-5 text-gray-600 hidden lg:table-cell">
                        <span className="text-xs font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-sm">{cat.productCount ?? 0}</span>
                      </td>
                      <td className="py-3 px-5 text-gray-500 hidden md:table-cell">{cat.sortOrder}</td>
                      <td className="py-3 px-5">
                        <div className="flex items-center gap-1 justify-end">
                          <button
                            className="p-1.5 text-gray-400 hover:text-[#8B1A1A] hover:bg-red-50 rounded-sm transition-colors"
                            onClick={() => setEditing({ id: cat.id, name: cat.name, slug: cat.slug, description: cat.description, image: cat.image, sortOrder: cat.sortOrder })}
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </button>
                          <button
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-colors"
                            onClick={() => handleDelete(cat.id, cat.name)}
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

      {!isLoading && categories?.length === 0 && (
        <div className="text-center py-16 text-gray-400">Henüz kategori eklenmemiş.</div>
      )}
    </div>
  );
}
