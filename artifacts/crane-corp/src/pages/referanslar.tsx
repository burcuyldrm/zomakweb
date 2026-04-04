import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";

const references = [
  {
    name: "Pekgöz Vinç",
    sector: "Vinç & Kaldırma",
    desc: "Mobilizasyon ve vinç operasyonları için uzun vadeli iş birliği.",
  },
  {
    name: "Fındık Vinç",
    sector: "Kaldırma Hizmetleri",
    desc: "İnşaat ve sanayi projelerinde ekipman tedariki ve destek.",
  },
  {
    name: "Bergama Vinç",
    sector: "Vinç Hizmetleri",
    desc: "Bergama bölgesinde proje bazlı kaldırma çözümleri.",
  },
  {
    name: "Kuşadası Vinç",
    sector: "Liman & Nakliye",
    desc: "Liman operasyonları ve deniz kargo kaldırma projeleri.",
  },
];

export default function Referanslar() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-24 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#c00]" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-xs font-black text-[#c00] tracking-widest uppercase mb-3">Bize Güvenenler</div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">Referanslar</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Türkiye'nin önde gelen vinç ve platform operatörleriyle iş ortaklığı yapıyoruz.
          </p>
        </div>
      </div>

      {/* Reference Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {references.map((ref, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="border-2 border-gray-200 hover:border-[#c00] p-10 group transition-colors duration-300"
                data-testid={`ref-card-${i}`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 bg-gray-100 group-hover:bg-[#c00] flex items-center justify-center transition-colors duration-300">
                    <Building2 className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-xs font-black uppercase tracking-widest text-[#c00] border border-[#c00] px-3 py-1">
                    {ref.sector}
                  </div>
                </div>
                <h3 className="text-2xl font-black uppercase mb-3 group-hover:text-[#c00] transition-colors">
                  {ref.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{ref.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Future */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 bg-gray-50 border-2 border-dashed border-gray-300 p-12 text-center"
          >
            <div className="text-xs font-black text-[#c00] tracking-widest uppercase mb-2">Logo Alanı</div>
            <h3 className="text-2xl font-black uppercase mb-3">Referanslarımız Büyüyor</h3>
            <p className="text-gray-500 text-sm max-w-lg mx-auto mb-6">
              Yeni referanslarımız ve iş ortaklarımız yakında bu sayfaya eklenecektir. Siz de iş ortaklarımız arasına katılın.
            </p>
            <Link href="/teklif">
              <Button className="bg-[#c00] hover:bg-red-700 text-white font-black rounded-none border-none uppercase">
                Bizimle Çalışın
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Trust CTA */}
      <div className="bg-black py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white uppercase mb-4">Referanslar Listemize Katılın</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            Projelerinizde güvenilir ekipman ve teknik destek için ZOMAK'ı tercih eden işletmelerin bir parçası olun.
          </p>
          <Link href="/iletisim">
            <Button className="bg-[#c00] hover:bg-red-700 text-white font-black px-10 h-12 rounded-none border-none uppercase">
              Görüşme Talep Et
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
