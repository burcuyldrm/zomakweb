import { useState } from "react";
import { Eye, ChevronDown, X } from "lucide-react";

const mockQuotes = [
  { id: "TKL-001", name: "Ahmet Yılmaz", firma: "Konak Vinç Ltd.", telefon: "0532 111 22 33", email: "ahmet@konak.com", hizmet: "Mobil Katlanır Vinç", sehir: "İzmir", aciklama: "Şantiye için kısa vadeli kiralama ya da satın alma seçeneklerini değerlendirmek istiyoruz.", status: "yeni", tarih: "2026-04-03" },
  { id: "TKL-002", name: "Mehmet Kaya", firma: "Ege İş Makineleri", telefon: "0541 222 33 44", email: "m.kaya@egeis.com", hizmet: "Hidrolik Kurtarıcı", sehir: "Manisa", aciklama: "TIR ve ağır taşıt kurtarma için araç arıyoruz.", status: "incelendi", tarih: "2026-04-02" },
  { id: "TKL-003", name: "Fatma Demir", firma: "Güneş Nakliyat", telefon: "0533 444 55 66", email: "f.demir@gunes.com", hizmet: "Kayar Kasa", sehir: "Ankara", aciklama: "Kayar kasa ihtiyacımız var.", status: "teklif-verildi", tarih: "2026-04-01" },
  { id: "TKL-004", name: "Hasan Çelik", firma: "Birlik İnşaat", telefon: "0545 777 88 99", email: "hcelik@birlik.com", hizmet: "Özel Hidrolik Makine", sehir: "İstanbul", aciklama: "Özel proje için tasarım ve üretim hizmeti almak istiyoruz.", status: "kapandi", tarih: "2026-03-28" },
];

const statusMap: Record<string, { label: string; bg: string; color: string }> = {
  yeni: { label: "Yeni", bg: "bg-blue-100", color: "text-blue-700" },
  incelendi: { label: "İncelendi", bg: "bg-amber-100", color: "text-amber-700" },
  "teklif-verildi": { label: "Teklif Verildi", bg: "bg-emerald-100", color: "text-emerald-700" },
  kapandi: { label: "Kapatıldı", bg: "bg-gray-100", color: "text-gray-600" },
};

export default function TekliflerAdmin() {
  const [selected, setSelected] = useState<typeof mockQuotes[0] | null>(null);
  const [quotes, setQuotes] = useState(mockQuotes);

  function changeStatus(id: string, status: string) {
    setQuotes(prev => prev.map(q => q.id === id ? { ...q, status } : q));
    if (selected?.id === id) setSelected(prev => prev ? { ...prev, status } : prev);
  }

  return (
    <div>
      <div className="mb-7">
        <h1 className="text-2xl font-black text-gray-900">Teklif Talepleri</h1>
        <p className="text-gray-500 text-sm mt-1">{quotes.filter(q => q.status === "yeni").length} yeni talep bekliyor.</p>
      </div>

      <div className={`grid ${selected ? "grid-cols-1 lg:grid-cols-2" : "grid-cols-1"} gap-5`}>
        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-sm overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-gray-500 font-semibold text-xs">ID</th>
                <th className="text-left py-3 px-4 text-gray-500 font-semibold text-xs">Talep Eden</th>
                <th className="text-left py-3 px-4 text-gray-500 font-semibold text-xs">Hizmet</th>
                <th className="text-left py-3 px-4 text-gray-500 font-semibold text-xs">Durum</th>
                <th className="text-left py-3 px-4 text-gray-500 font-semibold text-xs">Tarih</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => {
                const st = statusMap[q.status];
                return (
                  <tr
                    key={q.id}
                    className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${selected?.id === q.id ? "bg-red-50 border-l-2 border-l-[#8B1A1A]" : ""}`}
                  >
                    <td className="py-3.5 px-4 text-gray-400 font-mono text-xs">{q.id}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-gray-900 text-sm">{q.name}</div>
                      <div className="text-xs text-gray-400">{q.firma}</div>
                    </td>
                    <td className="py-3.5 px-4 text-gray-600 text-xs">{q.hizmet}</td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm ${st.bg} ${st.color}`}>
                        {st.label}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-gray-400 text-xs">{q.tarih}</td>
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => setSelected(selected?.id === q.id ? null : q)}
                        className="p-1.5 text-gray-400 hover:text-[#8B1A1A] hover:bg-red-50 rounded-sm transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="bg-white border border-gray-200 rounded-sm p-5">
            <div className="flex items-center justify-between mb-5">
              <div>
                <div className="text-[10px] font-bold text-gray-400 tracking-widest mb-1">{selected.id}</div>
                <h3 className="font-black text-gray-900">{selected.name}</h3>
                <p className="text-sm text-gray-500">{selected.firma}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-1.5 text-gray-400 hover:text-gray-700 rounded-sm">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 mb-5">
              {[
                { label: "Telefon", value: selected.telefon },
                { label: "E-posta", value: selected.email },
                { label: "Hizmet", value: selected.hizmet },
                { label: "Şehir", value: selected.sehir },
                { label: "Tarih", value: selected.tarih },
              ].map((row) => (
                <div key={row.label} className="flex justify-between py-2 border-b border-gray-100">
                  <span className="text-xs text-gray-400 font-medium">{row.label}</span>
                  <span className="text-sm font-semibold text-gray-800">{row.value}</span>
                </div>
              ))}
            </div>

            <div className="mb-5">
              <div className="text-xs font-semibold text-gray-400 mb-2">İş Açıklaması</div>
              <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-sm">{selected.aciklama}</p>
            </div>

            <div>
              <div className="text-xs font-semibold text-gray-400 mb-2">Durumu Güncelle</div>
              <div className="flex flex-wrap gap-2">
                {Object.entries(statusMap).map(([key, val]) => (
                  <button
                    key={key}
                    onClick={() => changeStatus(selected.id, key)}
                    className={`px-3 py-1.5 text-xs font-bold rounded-sm transition-all border ${
                      selected.status === key
                        ? "bg-[#8B1A1A] text-white border-[#8B1A1A]"
                        : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
                    }`}
                  >
                    {val.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
