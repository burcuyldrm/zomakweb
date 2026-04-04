import { useListMedia, useDeleteMedia, getListMediaQueryKey } from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Plus, Trash2, Video, Image, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const typeIcons = {
  video: Video,
  gallery: Image,
  pdf: FileText,
};

const typeColors = {
  video: "bg-blue-900 text-blue-400",
  gallery: "bg-green-900 text-green-400",
  pdf: "bg-orange-900 text-orange-400",
};

export default function AdminMedia() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: media, isLoading } = useListMedia({}, { query: { queryKey: getListMediaQueryKey({}) } });
  const deleteMedia = useDeleteMedia();

  function handleDelete(id: number, title: string) {
    if (!confirm(`Delete "${title}"?`)) return;
    deleteMedia.mutate(
      { id },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: getListMediaQueryKey({}) });
          toast({ title: "Media deleted" });
        },
        onError: () => toast({ title: "Error", variant: "destructive" }),
      }
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-white">Media Library</h1>
          <p className="text-slate-400 mt-1">{media?.length ?? 0} media items</p>
        </div>
        <Button className="font-bold" data-testid="button-add-media">
          <Plus className="w-4 h-4 mr-2" /> ADD MEDIA
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array(6).fill(0).map((_, i) => (
            <Skeleton key={i} className="h-48 bg-slate-700" />
          ))
          : media?.map((item) => {
            const Icon = typeIcons[item.type as keyof typeof typeIcons] ?? FileText;
            return (
              <div key={item.id} className="bg-slate-800 border border-slate-700 overflow-hidden group hover:border-primary transition-colors" data-testid={`card-media-${item.id}`}>
                <div className="aspect-video bg-slate-900 relative overflow-hidden">
                  {item.thumbnail ? (
                    <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
                  ) : item.type === "gallery" ? (
                    <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Icon className="w-12 h-12 text-slate-500" />
                    </div>
                  )}
                  <div className="absolute top-2 left-2">
                    <Badge className={`text-xs font-bold rounded-none ${typeColors[item.type as keyof typeof typeColors] ?? "bg-slate-700 text-slate-400"}`}>
                      {item.type.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      size="icon"
                      variant="destructive"
                      className="w-8 h-8 rounded-none"
                      onClick={() => handleDelete(item.id, item.title)}
                      data-testid={`button-delete-media-${item.id}`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-white font-bold text-sm line-clamp-1">{item.title}</p>
                  <p className="text-slate-400 text-xs mt-1 truncate">{item.url}</p>
                </div>
              </div>
            );
          })}
      </div>

      {!isLoading && !media?.length && (
        <div className="text-center py-16">
          <p className="text-slate-400">No media items found.</p>
        </div>
      )}
    </div>
  );
}
