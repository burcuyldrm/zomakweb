import { useState } from "react";
import { Link } from "wouter";
import { useListProducts, useDeleteProduct, useListCategories, getListProductsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2, Star } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function AdminProducts() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data: products, isLoading } = useListProducts({}, { query: { queryKey: getListProductsQueryKey({}) } });
  const { data: categories } = useListCategories();
  const deleteProduct = useDeleteProduct();

  function handleDelete(slug: string, name: string) {
    if (!confirm(`Delete "${name}"? This cannot be undone.`)) return;
    setDeletingId(slug);
    deleteProduct.mutate(
      { slug },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListProductsQueryKey({}) });
          toast({ title: "Product deleted", description: `"${name}" has been removed.` });
        },
        onError: () => {
          toast({ title: "Error", description: "Failed to delete product.", variant: "destructive" });
        },
        onSettled: () => setDeletingId(null),
      }
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">Products</h1>
          <p className="text-slate-400 mt-1">{products?.length ?? 0} products in the catalog</p>
        </div>
        <Link href="/admin/products/new">
          <Button className="font-bold" data-testid="button-add-product">
            <Plus className="w-4 h-4 mr-2" /> ADD PRODUCT
          </Button>
        </Link>
      </div>

      <div className="bg-slate-800 border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-testid="table-products">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900">
                <th className="text-left py-3 px-4 text-slate-400 font-bold">Product</th>
                <th className="text-left py-3 px-4 text-slate-400 font-bold hidden md:table-cell">Category</th>
                <th className="text-left py-3 px-4 text-slate-400 font-bold hidden md:table-cell">Capacity</th>
                <th className="text-left py-3 px-4 text-slate-400 font-bold">Status</th>
                <th className="text-left py-3 px-4 text-slate-400 font-bold hidden lg:table-cell">Featured</th>
                <th className="text-right py-3 px-4 text-slate-400 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array(4).fill(0).map((_, i) => (
                  <tr key={i} className="border-b border-slate-700">
                    <td colSpan={6} className="p-4"><Skeleton className="h-8 bg-slate-700" /></td>
                  </tr>
                ))
                : products?.map((p) => (
                  <tr key={p.id} className="border-b border-slate-700 hover:bg-slate-700 transition-colors" data-testid={`row-product-${p.id}`}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-600 overflow-hidden flex-shrink-0">
                          <img src={p.coverImage} alt={p.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm">{p.name}</div>
                          <div className="text-slate-400 text-xs">{p.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300 hidden md:table-cell">{p.categoryName}</td>
                    <td className="py-3 px-4 text-slate-300 hidden md:table-cell">{p.capacity}</td>
                    <td className="py-3 px-4">
                      <Badge
                        className={cn(
                          "text-xs font-bold rounded-none",
                          p.status === "published"
                            ? "bg-green-900 text-green-400 hover:bg-green-900"
                            : "bg-yellow-900 text-yellow-400 hover:bg-yellow-900"
                        )}
                      >
                        {p.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 hidden lg:table-cell">
                      {p.featured && <Star className="w-4 h-4 text-primary fill-primary" />}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/admin/products/${p.slug}/edit`}>
                          <Button size="icon" variant="ghost" className="text-slate-400 hover:text-white w-8 h-8" data-testid={`button-edit-${p.id}`}>
                            <Pencil className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-slate-400 hover:text-red-400 w-8 h-8"
                          onClick={() => handleDelete(p.slug, p.name)}
                          disabled={deletingId === p.slug}
                          data-testid={`button-delete-${p.id}`}
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
      </div>

      {!isLoading && !products?.length && (
        <div className="text-center py-16">
          <p className="text-slate-400 mb-4">No products found.</p>
          <Link href="/admin/products/new">
            <Button>Add Your First Product</Button>
          </Link>
        </div>
      )}

      <div className="mt-4 text-xs text-slate-500">
        {categories?.length} categories available — <Link href="/admin/categories"><span className="text-primary cursor-pointer hover:underline">manage categories</span></Link>
      </div>
    </div>
  );
}
