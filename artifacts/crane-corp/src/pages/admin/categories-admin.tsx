import { useState } from "react";
import { useListCategories, useCreateCategory, useUpdateCategory, useDeleteCategory, getListCategoriesQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Pencil, Trash2, X, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type EditState = {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  sortOrder: number;
} | null;

export default function AdminCategories() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editing, setEditing] = useState<EditState>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newCat, setNewCat] = useState({ name: "", slug: "", description: "", image: "", sortOrder: 0 });

  const { data: categories, isLoading } = useListCategories();
  const createCategory = useCreateCategory();
  const updateCategory = useUpdateCategory();
  const deleteCategory = useDeleteCategory();

  function invalidate() {
    queryClient.invalidateQueries({ queryKey: getListCategoriesQueryKey() });
  }

  function handleCreate() {
    if (!newCat.name || !newCat.slug) {
      toast({ title: "Name and slug are required", variant: "destructive" });
      return;
    }
    createCategory.mutate(
      { data: { ...newCat } },
      {
        onSuccess: () => { invalidate(); setIsAdding(false); setNewCat({ name: "", slug: "", description: "", image: "", sortOrder: 0 }); toast({ title: "Category created" }); },
        onError: () => toast({ title: "Error", variant: "destructive" }),
      }
    );
  }

  function handleUpdate() {
    if (!editing) return;
    updateCategory.mutate(
      { id: editing.id, data: { name: editing.name, slug: editing.slug, description: editing.description, image: editing.image, sortOrder: editing.sortOrder } },
      {
        onSuccess: () => { invalidate(); setEditing(null); toast({ title: "Category updated" }); },
        onError: () => toast({ title: "Error", variant: "destructive" }),
      }
    );
  }

  function handleDelete(id: number, name: string) {
    if (!confirm(`Delete category "${name}"?`)) return;
    deleteCategory.mutate(
      { id },
      {
        onSuccess: () => { invalidate(); toast({ title: "Category deleted" }); },
        onError: () => toast({ title: "Error", variant: "destructive" }),
      }
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">Categories</h1>
          <p className="text-slate-400 mt-1">{categories?.length ?? 0} categories</p>
        </div>
        <Button onClick={() => setIsAdding(true)} className="font-bold" disabled={isAdding} data-testid="button-add-category">
          <Plus className="w-4 h-4 mr-2" /> ADD CATEGORY
        </Button>
      </div>

      <div className="bg-slate-800 border border-slate-700 overflow-hidden">
        <table className="w-full text-sm" data-testid="table-categories">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-900">
              <th className="text-left py-3 px-4 text-slate-400 font-bold">Name</th>
              <th className="text-left py-3 px-4 text-slate-400 font-bold hidden md:table-cell">Slug</th>
              <th className="text-left py-3 px-4 text-slate-400 font-bold hidden lg:table-cell">Products</th>
              <th className="text-left py-3 px-4 text-slate-400 font-bold hidden md:table-cell">Order</th>
              <th className="text-right py-3 px-4 text-slate-400 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isAdding && (
              <tr className="border-b border-primary bg-slate-700">
                <td className="py-2 px-4"><Input className="bg-slate-600 border-slate-500 text-white rounded-none h-8 text-xs" placeholder="Category Name" value={newCat.name} onChange={e => setNewCat(p => ({ ...p, name: e.target.value }))} /></td>
                <td className="py-2 px-4 hidden md:table-cell"><Input className="bg-slate-600 border-slate-500 text-white rounded-none h-8 text-xs" placeholder="category-slug" value={newCat.slug} onChange={e => setNewCat(p => ({ ...p, slug: e.target.value }))} /></td>
                <td className="py-2 px-4 hidden lg:table-cell"><span className="text-slate-400 text-xs">0</span></td>
                <td className="py-2 px-4 hidden md:table-cell"><Input className="bg-slate-600 border-slate-500 text-white rounded-none h-8 text-xs w-16" type="number" value={newCat.sortOrder} onChange={e => setNewCat(p => ({ ...p, sortOrder: parseInt(e.target.value) || 0 }))} /></td>
                <td className="py-2 px-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button size="icon" className="w-8 h-8 rounded-none" onClick={handleCreate}><Check className="w-3.5 h-3.5" /></Button>
                    <Button size="icon" variant="ghost" className="w-8 h-8 text-slate-400" onClick={() => setIsAdding(false)}><X className="w-3.5 h-3.5" /></Button>
                  </div>
                </td>
              </tr>
            )}
            {isLoading
              ? Array(3).fill(0).map((_, i) => (
                <tr key={i} className="border-b border-slate-700">
                  <td colSpan={5} className="p-4"><Skeleton className="h-8 bg-slate-700" /></td>
                </tr>
              ))
              : categories?.map((cat) => (
                <tr key={cat.id} className="border-b border-slate-700 hover:bg-slate-700 transition-colors" data-testid={`row-category-${cat.id}`}>
                  {editing?.id === cat.id ? (
                    <>
                      <td className="py-2 px-4"><Input className="bg-slate-600 border-slate-500 text-white rounded-none h-8 text-xs" value={editing.name} onChange={e => setEditing(p => p ? { ...p, name: e.target.value } : p)} /></td>
                      <td className="py-2 px-4 hidden md:table-cell"><Input className="bg-slate-600 border-slate-500 text-white rounded-none h-8 text-xs" value={editing.slug} onChange={e => setEditing(p => p ? { ...p, slug: e.target.value } : p)} /></td>
                      <td className="py-2 px-4 hidden lg:table-cell text-slate-300">{cat.productCount}</td>
                      <td className="py-2 px-4 hidden md:table-cell"><Input className="bg-slate-600 border-slate-500 text-white rounded-none h-8 text-xs w-16" type="number" value={editing.sortOrder} onChange={e => setEditing(p => p ? { ...p, sortOrder: parseInt(e.target.value) || 0 } : p)} /></td>
                      <td className="py-2 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="icon" className="w-8 h-8 rounded-none" onClick={handleUpdate}><Check className="w-3.5 h-3.5" /></Button>
                          <Button size="icon" variant="ghost" className="w-8 h-8 text-slate-400" onClick={() => setEditing(null)}><X className="w-3.5 h-3.5" /></Button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="py-3 px-4 text-white font-bold">{cat.name}</td>
                      <td className="py-3 px-4 text-slate-400 hidden md:table-cell text-xs">{cat.slug}</td>
                      <td className="py-3 px-4 text-slate-300 hidden lg:table-cell">{cat.productCount}</td>
                      <td className="py-3 px-4 text-slate-300 hidden md:table-cell">{cat.sortOrder}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="icon" variant="ghost" className="w-8 h-8 text-slate-400 hover:text-white" onClick={() => setEditing({ id: cat.id, name: cat.name, slug: cat.slug, description: cat.description, image: cat.image, sortOrder: cat.sortOrder })} data-testid={`button-edit-cat-${cat.id}`}><Pencil className="w-3.5 h-3.5" /></Button>
                          <Button size="icon" variant="ghost" className="w-8 h-8 text-slate-400 hover:text-red-400" onClick={() => handleDelete(cat.id, cat.name)} data-testid={`button-delete-cat-${cat.id}`}><Trash2 className="w-3.5 h-3.5" /></Button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
