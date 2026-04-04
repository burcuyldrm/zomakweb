import { useState } from "react";
import { Link } from "wouter";
import { Plus, Pencil, Eye, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const mockProducts = [
  { slug: "mobil-katlanir-vinc", title: "Mobil Katlanır Vinç", shortDesc: "Kompakt yapısı ve yüksek kapasitesiyle dar alanlarda üstün kaldırma performansı.", status: "published", specs: "60 ton/metre · 27m Bom" },
  { slug: "hidrolik-gozluklu-kurtarici", title: "Hidrolik Gözlüklü Kurtarıcı", shortDesc: "Ağır araç kurtarma operasyonlarında güvenilir ve etkin hidrolik sistem.", status: "published", specs: "Ağır taşıt kurtarma" },
  { slug: "hidrolik-kurtarici", title: "Hidrolik Kurtarıcı", shortDesc: "TIR, otobüs ve ağır iş makinesi kurtarma için özel tasarım sistemler.", status: "published", specs: "Ağır nakliye kurtarma" },
  { slug: "ozel-hidrolik-makineler", title: "Özel Hidrolik Makineler", shortDesc: "Standart çözümlerin yetersiz kaldığı projelere özel tasarım ve üretim.", status: "published", specs: "Projeye özel" },
  { slug: "sepetli-platform", title: "Sepetli Platform", shortDesc: "Yüksekte çalışma gerektiren operasyonlar için güvenli ve konforlu platform.", status: "published", specs: "İzoleli · İzolasyonsuz" },
];

export default function UrunlerAdmin() {
  const [search, setSearch] = useState("");
  const filtered = mockProducts.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Ürünler</h1>
          <p className="text-gray-500 text-sm mt-1">Ürün kataloğunu yönetin.</p>
        </div>
        <Button className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold rounded-sm border-none">
          <Plus className="w-4 h-4 mr-2" /> Ürün Ekle
        </Button>
      </div>

      {/* Search */}
      <div className="bg-white border border-gray-200 rounded-sm p-4 mb-5">
        <div className="relative max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Ürün ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 rounded-sm border-gray-200 text-sm"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-5 text-gray-500 font-semibold text-xs">Ürün Adı</th>
              <th className="text-left py-3 px-5 text-gray-500 font-semibold text-xs">Kısa Açıklama</th>
              <th className="text-left py-3 px-5 text-gray-500 font-semibold text-xs">Özellikler</th>
              <th className="text-left py-3 px-5 text-gray-500 font-semibold text-xs">Durum</th>
              <th className="py-3 px-5 text-gray-500 font-semibold text-xs">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.slug} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${i % 2 === 0 ? "" : "bg-gray-50/30"}`}>
                <td className="py-4 px-5">
                  <span className="font-semibold text-gray-900">{p.title}</span>
                </td>
                <td className="py-4 px-5 text-gray-500 max-w-[240px]">
                  <span className="line-clamp-2 text-xs">{p.shortDesc}</span>
                </td>
                <td className="py-4 px-5">
                  <span className="text-xs text-gray-400 font-mono">{p.specs}</span>
                </td>
                <td className="py-4 px-5">
                  <span className="text-[10px] font-bold px-2.5 py-1 bg-emerald-100 text-emerald-700 rounded-sm">
                    Yayında
                  </span>
                </td>
                <td className="py-4 px-5">
                  <div className="flex items-center gap-2 justify-end">
                    <Link href={`/urunler/${p.slug}`} target="_blank">
                      <button className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-sm transition-colors" title="Görüntüle">
                        <Eye className="w-4 h-4" />
                      </button>
                    </Link>
                    <button className="p-1.5 text-gray-400 hover:text-[#8B1A1A] hover:bg-red-50 rounded-sm transition-colors" title="Düzenle">
                      <Pencil className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="py-12 text-center text-gray-400 text-sm">Ürün bulunamadı.</div>
        )}
      </div>
    </div>
  );
}
