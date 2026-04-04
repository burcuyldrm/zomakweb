import { useState } from "react";
import { Plus, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const mockImages = [
  { id: "1", title: "Mobil Katlanır Vinç — Şantiye", category: "Ürün", src: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&q=80" },
  { id: "2", title: "Hidrolik Kurtarıcı — Teslimat", category: "Ürün", src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=400&q=80" },
  { id: "3", title: "Şantiye Operasyonu", category: "Proje", src: "https://images.unsplash.com/photo-1590141837800-79b87ece2f6e?w=400&q=80" },
  { id: "4", title: "Platform Çalışması", category: "Proje", src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=400&q=80" },
  { id: "5", title: "Sanayi Projesi — İzmir", category: "Referans", src: "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=400&q=80" },
  { id: "6", title: "Vinç Operasyonu", category: "Proje", src: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=400&q=80" },
];

export default function GaleriAdmin() {
  const { toast } = useToast();
  const [images, setImages] = useState(mockImages);
  const [filter, setFilter] = useState("Tümü");

  const categories = ["Tümü", ...Array.from(new Set(mockImages.map(i => i.category)))];
  const filtered = filter === "Tümü" ? images : images.filter(i => i.category === filter);

  function handleDelete(id: string) {
    setImages(prev => prev.filter(i => i.id !== id));
    toast({ title: "Silindi", description: "Görsel galeriden kaldırıldı." });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Galeri</h1>
          <p className="text-gray-500 text-sm mt-1">{images.length} görsel — projelerin fotoğraflarını yönetin.</p>
        </div>
        <Button className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold rounded-sm border-none">
          <Upload className="w-4 h-4 mr-2" /> Görsel Yükle
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-sm transition-all ${
              filter === cat
                ? "bg-[#8B1A1A] text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Upload card */}
        <div className="aspect-[4/3] border-2 border-dashed border-gray-200 rounded-sm flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#8B1A1A] hover:bg-red-50 transition-all group">
          <Plus className="w-6 h-6 text-gray-300 group-hover:text-[#8B1A1A]" />
          <span className="text-xs text-gray-400 group-hover:text-[#8B1A1A] font-medium">Görsel Ekle</span>
        </div>

        {filtered.map((img) => (
          <div key={img.id} className="aspect-[4/3] relative rounded-sm overflow-hidden group shadow-sm">
            <img src={img.src} alt={img.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all" />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all flex flex-col justify-between p-3">
              <div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 bg-white/20 text-white rounded-sm backdrop-blur-sm">
                  {img.category}
                </span>
              </div>
              <div>
                <p className="text-white text-xs font-semibold mb-2 leading-tight">{img.title}</p>
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
    </div>
  );
}
