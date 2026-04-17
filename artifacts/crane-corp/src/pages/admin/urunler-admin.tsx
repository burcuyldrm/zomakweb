import { useState } from "react";
import { Link } from "wouter";
import { Plus, Pencil, Trash2, Search, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useListProducts, useDeleteProduct, useListCategories, getListProductsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function UrunlerAdmin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [deletingSlug, setDeletingSlug] = useState<string | null>(null);

  const { data: products, isLoading } = useListProducts({}, { query: { queryKey: getListProductsQueryKey({}) } });
  const { data: categories } = useListCategories();
  const deleteProduct = useDeleteProduct();

  const filtered = (products ?? []).filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.categoryName.toLowerCase().includes(search.toLowerCase())
  );

  function handleDelete(slug: string, name: string) {
    if (!confirm(`"${name}" ürününü silmek istediğinizden emin misiniz?`)) return;
    setDeletingSlug(slug);
    deleteProduct.mutate(
      { slug },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListProductsQueryKey({}) });
          toast({ title: "Ürün silindi", description: `"${name}" başarıyla kaldırıldı.` });
        },
        onError: () => toast({ title: "Hata", description: "Silme işlemi başarısız oldu.", variant: "destructive" }),
        onSettled: () => setDeletingSlug(null),
      }
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Ürünler</h1>
          <p className="text-gray-500 text-sm mt-1">
            {isLoading ? "Yükleniyor..." : `${products?.length ?? 0} ürün · ${categories?.length ?? 0} kategori`}
          </p>
        </div>
        <Link href="/admin/urunler/yeni">
          <Button className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold rounded-sm border-none">
            <Plus className="w-4 h-4 mr-2" /> Ürün Ekle
          </Button>
        </Link>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm p-4 mb-5">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Ürün veya kategori ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-sm border-gray-200 text-sm"
          />
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-5 text-gray-500 font-semibold text-xs">Ürün</th>
              <th className="text-left py-3 px-5 text-gray-500 font-semibold text-xs hidden md:table-cell">Kategori</th>
              <th className="text-left py-3 px-5 text-gray-500 font-semibold text-xs hidden lg:table-cell">Kapasite</th>
              <th className="text-left py-3 px-5 text-gray-500 font-semibold text-xs">Durum</th>
              <th className="py-3 px-5 text-gray-500 font-semibold text-xs text-right">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array(5).fill(0).map((_, i) => (
                <tr key={i} className="border-b border-gray-100">
                  <td colSpan={5} className="p-4"><Skeleton className="h-8" /></td>
                </tr>
              ))
              : filtered.map((p, i) => (
                <tr
                  key={p.slug}
                  className={cn("border-b border-gray-100 hover:bg-gray-50 transition-colors", i % 2 === 0 ? "" : "bg-gray-50/30")}
                >
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-3">
                      {p.coverImage ? (
                        <img
                          src={p.coverImage}
                          alt={p.name}
                          className="w-10 h-10 object-contain rounded bg-gray-100 flex-shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded bg-gray-100 flex-shrink-0" />
                      )}
                      <div>
                        <div className="font-bold text-gray-900">{p.name}</div>
                        <div className="text-xs text-gray-400">{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-5 text-gray-600 hidden md:table-cell">{p.categoryName}</td>
                  <td className="py-3 px-5 text-gray-600 hidden lg:table-cell">{p.capacity || "—"}</td>
                  <td className="py-3 px-5">
                    <Badge className={cn(
                      "text-xs font-bold rounded-sm",
                      p.status === "published"
                        ? "bg-green-100 text-green-700 hover:bg-green-100"
                        : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                    )}>
                      {p.status === "published" ? "Yayında" : "Taslak"}
                    </Badge>
                  </td>
                  <td className="py-3 px-5">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/urunler/${p.categoryName ? categories?.find(c => c.id === p.categoryId)?.slug ?? "" : ""}/${p.slug}`}>
                        <Button size="icon" variant="ghost" className="w-8 h-8 text-gray-400 hover:text-gray-700">
                          <Eye className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                      <Link href={`/admin/urunler/${p.slug}/duzenle`}>
                        <Button size="icon" variant="ghost" className="w-8 h-8 text-gray-400 hover:text-[#8B1A1A]">
                          <Pencil className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-8 h-8 text-gray-400 hover:text-red-600"
                        onClick={() => handleDelete(p.slug, p.name)}
                        disabled={deletingSlug === p.slug}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {!isLoading && filtered.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          {search ? "Arama sonucu bulunamadı." : "Henüz ürün eklenmemiş."}
        </div>
      )}
    </div>
  );
}
