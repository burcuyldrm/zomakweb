import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Wrench } from "lucide-react";

const zv060Specs = [
  { label: "Model", value: "ZV060" },
  { label: "Kapasite", value: "60 ton/metre" },
  { label: "Bom Uzunluğu", value: "27 metre" },
  { label: "Tip", value: "Mobil Katlanır Vinç" },
  { label: "Üretici", value: "Zomak Makina" },
  { label: "Menşei", value: "Türkiye" },
  { label: "Kullanım", value: "Şehir içi & şantiye" },
  { label: "Operasyon", value: "Uzaktan kumandalı" },
];

const features = [
  "Kompakt katlanır bom tasarımı",
  "Yüksek kaldırma kapasitesi",
  "Hızlı kurulum ve sökme",
  "Dar alanlarda manevra kabiliyeti",
  "Güçlü hidrolik sistem",
  "Uzaktan kumanda desteği",
  "CE sertifikalı güvenlik standartları",
  "Satış sonrası teknik destek",
];

export default function Filomuz() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-24 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#c00]" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-xs font-black text-[#c00] tracking-widest uppercase mb-3">Ekipmanlarımız</div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">Filomuz</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Sektörün en güvenilir ekipmanlarıyla donatılmış, her projeye hazır filomuz.
          </p>
        </div>
      </div>

      {/* ZV060 Main Card */}
      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 border-2 border-black overflow-hidden"
          >
            {/* Image */}
            <div className="bg-black min-h-[400px] relative flex items-center justify-center overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?w=1000&q=80"
                alt="ZV060 Mobil Vinç"
                className="w-full h-full object-cover opacity-60 absolute inset-0"
              />
              <div className="relative z-10 text-center">
                <div className="text-7xl font-black text-white tracking-tighter">ZV060</div>
                <div className="text-[#c00] font-black text-xl uppercase tracking-widest mt-2">Mobil Katlanır Vinç</div>
                <div className="mt-4 inline-block bg-[#c00] text-white font-black text-sm px-6 py-2 uppercase tracking-widest">
                  60 ton/metre · 27m bom
                </div>
              </div>
            </div>

            {/* Details */}
            <div className="p-10 lg:p-14 bg-white flex flex-col justify-center">
              <div className="flex items-center gap-3 mb-6">
                <Wrench className="w-6 h-6 text-[#c00]" />
                <h2 className="text-2xl font-black uppercase">Teknik Özellikler</h2>
              </div>

              <div className="divide-y divide-gray-100 mb-8">
                {zv060Specs.map((spec, i) => (
                  <div key={i} className="flex justify-between py-3 text-sm">
                    <span className="font-bold text-gray-500 uppercase tracking-wide">{spec.label}</span>
                    <span className="font-black text-black">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/teklif">
                  <Button className="bg-[#c00] hover:bg-red-700 text-white font-black rounded-none border-none uppercase px-6">
                    Teklif Al <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link href="/iletisim">
                  <Button variant="outline" className="border-black text-black hover:bg-black hover:text-white font-black rounded-none uppercase px-6">
                    İletişim
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 p-10 bg-gray-50 border border-gray-200"
          >
            <h3 className="font-black uppercase text-lg mb-6 flex items-center gap-3">
              <span className="w-8 h-0.5 bg-[#c00]" />
              ZV060 Özellikleri
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((f, i) => (
                <div key={i} className="flex items-start gap-3 text-sm">
                  <span className="w-1.5 h-1.5 bg-[#c00] rounded-full mt-1.5 flex-shrink-0" />
                  <span className="text-gray-700 font-medium">{f}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-12 bg-black">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <div className="text-xs font-black text-[#c00] tracking-widest uppercase mb-3">Geliştirme Aşamasında</div>
          <h2 className="text-3xl font-black text-white uppercase mb-4">Yeni Modeller Geliyor</h2>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            ZOMAK mühendislik ekibi yeni kapasite ve yapıda modeller üzerinde çalışmaktadır. Güncellemeler için bize ulaşın.
          </p>
          <Link href="/iletisim">
            <Button className="bg-[#c00] hover:bg-red-700 text-white font-black rounded-none border-none uppercase px-8">
              Bilgi Al
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <div className="bg-[#c00] py-14">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white uppercase mb-4">ZV060 Hakkında Teklif Alın</h2>
          <p className="text-white/80 mb-6">Projenize özel fiyat ve teknik detaylar için hemen iletişime geçin.</p>
          <Link href="/teklif">
            <Button className="bg-white text-[#c00] hover:bg-gray-100 font-black px-10 h-12 rounded-none uppercase">
              Teklif Formu
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
