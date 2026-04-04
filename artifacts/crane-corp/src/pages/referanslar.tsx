import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Building2 } from "lucide-react";
import truckImg from "@assets/8c2a8adc-d4f4-4d87-abe2-5b692886a23b_1775312450763.jpeg";

const references = [
  {
    name: "Pekgöz Vinç",
    sector: "Vinç ve Kaldırma Hizmetleri",
    desc: "Hidrolik kurtarıcı sistemleri ve mobil vinç ekipmanları tedariki alanında uzun vadeli iş ortaklığı.",
  },
  {
    name: "Fındık Vinç",
    sector: "Kaldırma Hizmetleri",
    desc: "İnşaat ve sanayi projelerinde mobil ekipman tedariki ve teknik destek.",
  },
  {
    name: "Bergama Vinç",
    sector: "Vinç Hizmetleri",
    desc: "Bergama ve çevre bölgelerde proje bazlı kaldırma ve kurtarma çözümleri.",
  },
  {
    name: "Kuşadası Vinç",
    sector: "Liman ve Nakliye",
    desc: "Liman operasyonları ve deniz kargo kaldırma projelerinde ekipman desteği.",
  },
];

export default function Referanslar() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#111111] text-white py-16 relative">
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#8B1A1A]" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B1A1A]/40" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-[10px] font-bold text-[#8B1A1A] tracking-widest mb-2">GÜVEN DUYANLAR</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">REFERANSLARIMIZ</h1>
          <p className="text-gray-400 text-base max-w-2xl">
            Türkiye'nin önde gelen vinç ve platform operatörleriyle iş ortaklığı kuruyoruz.
          </p>
        </div>
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-gray-500 text-sm leading-relaxed mb-12 max-w-3xl">
            Zomak olarak referans müşterilerimizle yalnızca bir ticari ilişki değil, uzun vadeli ve güvene dayalı bir iş ortaklığı kurmaktayız. Teslim ettiğimiz her ekipman, bu ortaklığın somut bir yansımasıdır.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {references.map((ref, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border border-gray-200 rounded-sm p-8 hover:border-[#8B1A1A] group transition-colors duration-300"
                data-testid={`ref-card-${i}`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-14 h-14 bg-gray-100 group-hover:bg-[#8B1A1A]/10 flex items-center justify-center rounded-sm transition-colors">
                    <Building2 className="w-7 h-7 text-gray-400 group-hover:text-[#8B1A1A] transition-colors" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#8B1A1A] border border-[#8B1A1A]/30 px-3 py-1 rounded-sm">
                    {ref.sector}
                  </span>
                </div>
                <h3 className="text-xl font-black uppercase mb-2 text-gray-900 group-hover:text-[#8B1A1A] transition-colors">
                  {ref.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{ref.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Pekgöz showcase image */}
          <div className="mb-14 rounded-sm overflow-hidden shadow-md">
            <img
              src={truckImg as unknown as string}
              alt="Pekgöz Vinç — ZOMAK Ekipmanı"
              className="w-full h-64 object-cover object-center"
            />
            <div className="bg-gray-50 border-x border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div>
                <div className="text-[10px] font-bold text-[#8B1A1A] tracking-widest mb-0.5">REFERANS PROJESİ</div>
                <div className="text-sm font-bold text-gray-800">Pekgöz Vinç — Hidrolik Kurtarıcı Teslimi</div>
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gray-50 border border-dashed border-gray-300 rounded-sm p-12 text-center"
          >
            <div className="text-xs font-bold text-[#8B1A1A] tracking-widest uppercase mb-2">Büyümeye Devam Ediyoruz</div>
            <h3 className="text-2xl font-black uppercase text-gray-900 mb-3">Referans Listemiz Genişliyor</h3>
            <p className="text-gray-500 text-sm max-w-lg mx-auto mb-6">
              Yeni iş ortaklıkları ve referanslarımız yakında bu sayfaya eklenecektir. Siz de güvenilir tedarikçilerimiz arasına katılın.
            </p>
            <Link href="/teklif">
              <Button className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold rounded-sm border-none uppercase">
                Teklif Talebi
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
