import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const mockRefs = [
  { id: "1", companyName: "Pekgöz Vinç", sector: "Vinç & Kaldırma", project: "Hidrolik Kurtarıcı Teslimi", year: "2024", location: "İzmir" },
  { id: "2", companyName: "Fındık Vinç", sector: "Vinç & Kaldırma", project: "Mobil Katlanır Vinç Teslimi", year: "2024", location: "İzmir" },
  { id: "3", companyName: "Bergama Vinç", sector: "Kurtarıcı Hizmetleri", project: "Hidrolik Gözlüklü Kurtarıcı", year: "2025", location: "Bergama" },
  { id: "4", companyName: "Kuşadası Vinç", sector: "Platform & Kaldırma", project: "Sepetli Platform Teslimi", year: "2025", location: "Kuşadası" },
];

export default function ReferanslarAdmin() {
  const { toast } = useToast();
  const [refs, setRefs] = useState(mockRefs);

  function handleDelete(id: string) {
    setRefs(prev => prev.filter(r => r.id !== id));
    toast({ title: "Silindi", description: "Referans kaldırıldı." });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Referanslar</h1>
          <p className="text-gray-500 text-sm mt-1">{refs.length} aktif referans firması.</p>
        </div>
        <Button className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold rounded-sm border-none">
          <Plus className="w-4 h-4 mr-2" /> Referans Ekle
        </Button>
      </div>

      <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-3 px-5 text-gray-500 font-semibold text-xs">Firma</th>
              <th className="text-left py-3 px-5 text-gray-500 font-semibold text-xs">Sektör</th>
              <th className="text-left py-3 px-5 text-gray-500 font-semibold text-xs">Proje</th>
              <th className="text-left py-3 px-5 text-gray-500 font-semibold text-xs">Lokasyon</th>
              <th className="text-left py-3 px-5 text-gray-500 font-semibold text-xs">Yıl</th>
              <th className="py-3 px-5 text-gray-500 font-semibold text-xs">İşlemler</th>
            </tr>
          </thead>
          <tbody>
            {refs.map((r) => (
              <tr key={r.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-4 px-5 font-semibold text-gray-900">{r.companyName}</td>
                <td className="py-4 px-5 text-gray-500">{r.sector}</td>
                <td className="py-4 px-5 text-gray-600">{r.project}</td>
                <td className="py-4 px-5 text-gray-500">{r.location}</td>
                <td className="py-4 px-5">
                  <span className="text-[10px] font-bold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-sm">{r.year}</span>
                </td>
                <td className="py-4 px-5">
                  <div className="flex items-center gap-2 justify-end">
                    <button className="p-1.5 text-gray-400 hover:text-[#8B1A1A] hover:bg-red-50 rounded-sm transition-colors">
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(r.id)}
                      className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
