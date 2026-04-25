import { useState } from "react";
import { Save, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const tabs = ["Hakkımızda", "Vizyon & Misyon", "Kalite Politikası", "Çevre Politikası"] as const;
type Tab = typeof tabs[number];

const defaultContent: Record<Tab, Record<string, string>> = {
  "Hakkımızda": {
    "Şirket Tanıtımı": "Zomak Vinç Platform ve Makina Sanayi, İzmir'de kurulmuş olup vinç, kurtarıcı ve platform ekipmanları tasarımı ile üretimi konusunda hizmet vermektedir.",
    "Ek Bilgi": "Teknik bilgi birikimimiz ve deneyimli mühendislik kadromuz ile her ölçekteki projeye uygun ekipman sunabilme kapasitesine sahibiz.",
  },
  "Vizyon & Misyon": {
    "Vizyon": "Türkiye'nin en güvenilir vinç ve platform ekipmanları üreticisi olarak uluslararası standartlarda mühendislik çözümleri sunmak.",
    "Misyon": "Müşterilerimizin operasyonel verimliliğini artıracak, güvenli ve uzun ömürlü ekipmanlar tasarlamak.",
  },
  "Kalite Politikası": {
    "Kalite Açıklaması": "Kalite, ZOMAK'ın üretim felsefesinin temel taşıdır. Üretim sürecinin her aşamasında titizlikle uyguladığımız bir disiplindir.",
    "İlkemiz": "Ürünlerimizin her birini, kendi ekibimizin de güvenle kullanacağı standartlarda üretiriz.",
  },
  "Çevre Politikası": {
    "Çevre Açıklaması": "Faaliyetlerimizin çevre üzerindeki etkisini en aza indirmeyi ve sürdürülebilir bir üretim anlayışı benimsemeyi temel ilke olarak kabul ediyoruz.",
    "İlkemiz": "Ürettiğimiz her ekipman, hem insanlara hem de çevreye karşı sorumluluğumuzu yansıtır.",
  },
};

export default function KurumsalAdmin() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<Tab>("Hakkımızda");
  const [content, setContent] = useState(defaultContent);

  function handleSave() {
    toast({ title: "Kaydedildi", description: "Kurumsal içerik güncellendi. (Demo)" });
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <div>
          <h1 className="text-2xl font-black text-gray-900">Kurumsal</h1>
          <p className="text-gray-500 text-sm mt-1">Kurumsal sayfa içeriklerini düzenleyin.</p>
        </div>
        <Button onClick={handleSave} className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold rounded-sm border-none">
          <Save className="w-4 h-4 mr-2" /> Kaydet
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 mb-6 bg-gray-100 p-1 rounded-sm w-fit">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-semibold rounded-sm transition-all ${
              activeTab === tab
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content fields */}
      <div className="space-y-5">
        {Object.entries(content[activeTab]).map(([key, value]) => (
          <div key={key} className="bg-white border border-gray-200 rounded-sm p-5">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-4 h-4 text-[#8B1A1A]" />
              <label className="text-sm font-bold text-gray-700">{key}</label>
            </div>
            <Textarea
              value={value}
              onChange={(e) =>
                setContent((prev) => ({
                  ...prev,
                  [activeTab]: { ...prev[activeTab], [key]: e.target.value },
                }))
              }
              rows={5}
              className="resize-none rounded-sm border-gray-200 text-sm text-gray-700 focus:border-[#8B1A1A]"
            />
            <div className="mt-1.5 text-right text-xs text-gray-400">{value.length} karakter</div>
          </div>
        ))}
      </div>
    </div>
  );
}
