import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    title: "Mobil Katlanır Vinç",
    short: "Kompakt ve güçlü kaldırma çözümü",
    desc: "Katlanır kollu vinçlerimiz dar alanlarda ve sınırlı manevra alanı olan projelerde mükemmel performans sunar. Hızlı montaj ve sökme özellikleri sayesinde şantiye verimliliğini artırır.",
    usage: ["İnşaat şantiyeleri", "Sanayi tesisleri", "Liman operasyonları", "Enerji projeleri", "Maden işletmeleri"],
    icon: "🏗️",
  },
  {
    title: "Hidrolik Gözlüklü Kurtarıcı",
    short: "Araç kurtarmada güvenilir çözüm",
    desc: "Gözlüklü hidrolik kurtarıcı sistemlerimiz, ağır taşıtların ve araçların güvenli şekilde kurtarılmasını sağlar. Uzun kollu tasarımı sayesinde kritik açılarda bile yüksek kaldırma kapasitesi sunar.",
    usage: ["Yol kurtarma", "Ağır taşıt kurtarma", "Araç park yeri kaldırma", "Kaza kurtarma operasyonları"],
    icon: "🚛",
  },
  {
    title: "Hidrolik Kurtarıcı",
    short: "Ağır taşıt kurtarma uzmanı",
    desc: "Standart hidrolik kurtarıcılarımız; TIR, otobüs ve ağır iş makinelerinin zorlu koşullarda kurtarılması için özel olarak tasarlanmıştır. Sağlam yapısı ve yüksek kapasitesiyle operasyonelliği maksimuma taşır.",
    usage: ["Ağır nakliye kurtarma", "Otoyol kurtarma", "Dağlık arazi operasyonları", "Off-road kurtarma"],
    icon: "⚙️",
  },
  {
    title: "Özel Hidrolik Makineler",
    short: "Projenize özel tasarım ve üretim",
    desc: "Standart çözümlerin yetersiz kaldığı durumlarda, müşteri ihtiyaçlarına göre özel hidrolik makine tasarımı ve üretimi yapıyoruz. Mühendislik ekibimiz her projeyi sıfırdan değerlendirerek optimum çözüm üretir.",
    usage: ["Özel sanayi projeleri", "Enerji sektörü", "Maden makineleri", "Liman ekipmanları", "Savunma sanayi"],
    icon: "🔧",
  },
  {
    title: "Sepetli Platform",
    short: "Yüksekte güvenli ve konforlu çalışma",
    desc: "İzoleli ve izoleli olmayan sepetli platformlarımız, yüksekte çalışma gerektiren tüm operasyonlara uyumludur. Elektrik şebekeleri, ağaç budama, bina bakımı gibi alanlarda etkin ve güvenli çalışma imkânı sunar.",
    usage: ["Elektrik şebekesi bakımı", "Ağaç budama", "Bina cephe bakımı", "Aydınlatma kurulumu", "Sinyal tesisi"],
    icon: "🧺",
  },
];

export default function Hizmetler() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-24 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#c00]" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-xs font-black text-[#c00] tracking-widest uppercase mb-3">Ne Sunuyoruz</div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">Hizmetler</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Endüstriyel kaldırma ve platform çözümlerinde kapsamlı hizmet yelpazesi.
          </p>
        </div>
      </div>

      {/* Services */}
      <div className="container mx-auto px-4 md:px-8 py-20">
        <div className="space-y-0">
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`grid grid-cols-1 lg:grid-cols-2 border border-gray-200 ${i % 2 !== 0 ? "lg:grid-flow-col-dense" : ""}`}
            >
              {/* Text side */}
              <div className={`p-10 lg:p-16 flex flex-col justify-center ${i % 2 !== 0 ? "lg:col-start-2" : ""}`}>
                <div className="text-4xl mb-4">{s.icon}</div>
                <div className="text-xs font-black text-[#c00] tracking-widest uppercase mb-2">{s.short}</div>
                <h2 className="text-3xl font-black uppercase mb-4">{s.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{s.desc}</p>
                <div className="mb-8">
                  <h3 className="font-black uppercase text-sm tracking-wider mb-3">Kullanım Alanları</h3>
                  <ul className="space-y-2">
                    {s.usage.map((u, j) => (
                      <li key={j} className="flex items-center gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-[#c00] flex-shrink-0" />
                        {u}
                      </li>
                    ))}
                  </ul>
                </div>
                <Link href="/teklif">
                  <Button className="w-fit bg-[#c00] hover:bg-red-700 text-white font-black rounded-none border-none uppercase">
                    Teklif Al <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* Visual side */}
              <div className={`bg-black min-h-[300px] flex items-center justify-center ${i % 2 !== 0 ? "lg:col-start-1" : ""}`}>
                <div className="text-center text-gray-600">
                  <div className="text-8xl mb-4">{s.icon}</div>
                  <div className="text-white/30 text-xs uppercase tracking-widest font-black">{s.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#c00] py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white uppercase mb-4">Hizmete İhtiyacınız mı Var?</h2>
          <p className="text-white/80 mb-8">Taleplerinizi iletmek için hemen formu doldurun veya bizi arayın.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/teklif">
              <Button className="bg-white text-[#c00] hover:bg-gray-100 font-black px-8 h-12 rounded-none uppercase">Teklif Al</Button>
            </Link>
            <Link href="/iletisim">
              <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#c00] font-black px-8 h-12 rounded-none uppercase">İletişim</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
