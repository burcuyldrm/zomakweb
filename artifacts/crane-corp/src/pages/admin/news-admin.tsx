import { useState } from "react";
import { useListNews, useDeleteNews, getListNewsQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export default function AdminNews() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: news, isLoading } = useListNews({}, { query: { queryKey: getListNewsQueryKey({}) } });
  const deleteNews = useDeleteNews();

  function handleDelete(slug: string, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    deleteNews.mutate(
      { slug },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListNewsQueryKey({}) });
          toast({ title: "Article deleted" });
        },
        onError: () => toast({ title: "Error", variant: "destructive" }),
      }
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">News Articles</h1>
          <p className="text-slate-400 mt-1">{news?.length ?? 0} articles</p>
        </div>
        <Button className="font-bold" data-testid="button-add-news">
          <Plus className="w-4 h-4 mr-2" /> ADD ARTICLE
        </Button>
      </div>

      <div className="bg-slate-800 border border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" data-testid="table-news">
            <thead>
              <tr className="border-b border-slate-700 bg-slate-900">
                <th className="text-left py-3 px-4 text-slate-400 font-bold">Article</th>
                <th className="text-left py-3 px-4 text-slate-400 font-bold hidden md:table-cell">Date</th>
                <th className="text-left py-3 px-4 text-slate-400 font-bold">Status</th>
                <th className="text-right py-3 px-4 text-slate-400 font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isLoading
                ? Array(3).fill(0).map((_, i) => (
                  <tr key={i} className="border-b border-slate-700">
                    <td colSpan={4} className="p-4"><Skeleton className="h-8 bg-slate-700" /></td>
                  </tr>
                ))
                : news?.map((article) => (
                  <tr key={article.id} className="border-b border-slate-700 hover:bg-slate-700 transition-colors" data-testid={`row-news-${article.id}`}>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-10 bg-slate-600 overflow-hidden flex-shrink-0">
                          <img src={article.image} alt={article.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="text-white font-bold text-sm line-clamp-1">{article.title}</div>
                          <div className="text-slate-400 text-xs">{article.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-slate-300 hidden md:table-cell">
                      {new Date(article.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={cn(
                        "text-xs font-bold rounded-none",
                        article.status === "published"
                          ? "bg-green-900 text-green-400 hover:bg-green-900"
                          : "bg-yellow-900 text-yellow-400 hover:bg-yellow-900"
                      )}>
                        {article.status.toUpperCase()}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="w-8 h-8 text-slate-400 hover:text-red-400"
                        onClick={() => handleDelete(article.slug, article.title)}
                        data-testid={`button-delete-news-${article.id}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
