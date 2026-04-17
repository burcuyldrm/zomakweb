import { useRef } from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

interface MediaItem {
  id: number;
  type: string;
  title: string;
  url: string;
  thumbnail: string | null;
  createdAt: string;
}

async function fetchMedia(): Promise<MediaItem[]> {
  const r = await fetch("/api/media");
  return r.json();
}

export default function GaleriAdmin() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data: images, isLoading } = useQuery({ queryKey: ["media"], queryFn: fetchMedia });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["media"] });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/media/${id}`, { method: "DELETE" });
    },
    onSuccess: () => { invalidate(); toast({ title: "Görsel silindi" }); },
    onError: () => toast({ title: "Hata", variant: "destructive" }),
  });

  const createMutation = useMutation({
    mutationFn: async ({ url, title }: { url: string; title: string }) => {
      const r = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "image", title, url }),
      });
      if (!r.ok) throw new Error("Hata");
      return r.json();
    },
    onSuccess: () => { invalidate(); },
    onError: () => toast({ title: "Hata", variant: "destructive" }),
  });

  async function handleFiles(files: FileList | null) {
    if (!files) return;
    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        const res = await fetch("/api/upload", { method: "POST", body: formData });
        const data = await res.json();
        await createMutation.mutateAsync({ url: data.url, title: file.name.replace(/\.[^.]+$/, "") });
        toast({ title: "Görsel yüklendi", description: file.name });
      } catch {
        toast({ title: "Hata", description: `${file.name} yüklenemedi.`, variant: "destructive" });
      }
    }
  }

  function handleDelete(id: number) {
    if (!confirm("Bu görseli silmek istediğinizden emin misiniz?")) return;
    deleteMutation.mutate(id);
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Galeri</h1>
          <p className="text-gray-500 text-sm mt-1">
            {isLoading ? "Yükleniyor..." : `${images?.length ?? 0} görsel`}
          </p>
        </div>
        <Button
          className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold rounded-sm border-none"
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="w-4 h-4 mr-2" /> Görsel Yükle
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        className="hidden"
        onChange={e => handleFiles(e.target.files)}
      />

      {/* Drag & drop zone + grid */}
      <div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        onDragOver={e => e.preventDefault()}
        onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
      >
        {/* Upload card */}
        <div
          className="aspect-[4/3] border-2 border-dashed border-gray-200 rounded-sm flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#8B1A1A] hover:bg-red-50 transition-all group"
          onClick={() => fileInputRef.current?.click()}
        >
          <Plus className="w-6 h-6 text-gray-300 group-hover:text-[#8B1A1A]" />
          <span className="text-xs text-gray-400 group-hover:text-[#8B1A1A] font-medium text-center leading-tight px-2">
            Görsel Ekle<br/>
            <span className="text-[10px] text-gray-300">veya sürükle bırak</span>
          </span>
        </div>

        {isLoading
          ? Array(6).fill(0).map((_, i) => (
            <Skeleton key={i} className="aspect-[4/3] rounded-sm" />
          ))
          : images?.map((img) => (
            <div key={img.id} className="aspect-[4/3] relative rounded-sm overflow-hidden group shadow-sm bg-gray-100">
              <img
                src={img.url}
                alt={img.title}
                className="w-full h-full object-cover"
                onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all" />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-between p-3">
                <div />
                <div>
                  <p className="text-white text-xs font-semibold mb-2 leading-tight line-clamp-2">{img.title}</p>
                  <button
                    onClick={() => handleDelete(img.id)}
                    className="p-1.5 bg-red-600 hover:bg-red-700 text-white rounded-sm transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>

      {!isLoading && images?.length === 0 && (
        <div className="text-center py-16 text-gray-400">
          Henüz görsel yüklenmemiş. Görsel eklemek için yukarıdaki butona tıklayın.
        </div>
      )}
    </div>
  );
}
