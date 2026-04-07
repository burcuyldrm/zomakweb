import { motion } from "framer-motion";
import { Link } from "wouter";
import { FlaskConical, Cpu, Wrench, Lightbulb, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const argeAreas = [
  {
    icon: FlaskConical,
    title: "Ar-Ge Merkezi",
    desc: "Vinç ve platform sistemleri üzerinde yürütülen mühendislik araştırmaları; yeni nesil hidrolik mekanizmalar, yük kapasitesi optimizasyonu ve güvenlik donanımları üzerine odaklanmaktadır.",
  },
  {
    icon: Cpu,
    title: "Dijital Tasarım & Simülasyon",
    desc: "CAD/CAM yazılımlarıyla yürütülen 3D modelleme ve FEM analizleri sayesinde ürünler seri üretime geçmeden önce sanal ortamda kapsamlı dayanım testlerine tabi tutulmaktadır.",
  },
  {
    icon: Wrench,
    title: "Üretim Geliştirme (Ür-Ge)",
    desc: "Mevcut ürün ailesinin sürekli iyileştirilmesi; malzeme seçiminden kaynak teknolojilerine, yüzey işlemlerinden montaj süreçlerine kadar her aşamada verimlilik ve kalite artışı hedeflenmektedir.",
  },
  {
    icon: Lightbulb,
    title: "Özel Proje & İnovasyon",
    desc: "Müşterilerin özel ihtiyaçlarına yönelik mühendislik çözümleri geliştirilmekte; standart ürün gamının ötesinde, proje bazlı makina ve platform tasarımları hayata geçirilmektedir.",
  },
];

const milestones = [
  "Hidrolik katlanır vinç kolunda özgün tasarım geliştirme",
  "Özel taşıyıcı şasi yapılarında ağırlık optimizasyonu çalışmaları",
  "Çalışma güvenliği için elektronik yük kontrol sistemleri entegrasyonu",
  "Sepetli platform modellerinde erişim yüksekliği ve manevra kabiliyeti iyileştirmeleri",
  "Kurtarıcı ekipmanlarında hızlı montaj / demontaj modüler yapılar",
  "Yerli tedarikçilerle ortak prototip geliştirme süreçleri",
];

export default function ArgeUrge() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#111111] text-white py-16 relative">
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#8B1A1A]" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B1A1A]/40" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-[10px] font-bold text-[#8B1A1A] tracking-widest mb-2">KURUMSAL</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">AR-GE &amp; ÜR-GE</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-gray-700 leading-relaxed mb-5">
            ZOMAK Vinç Platform ve Makina Sanayi olarak araştırma-geliştirme faaliyetleri; tasarım aşamasından seri üretime, malzeme seçiminden sistem testlerine kadar tüm üretim sürecini kapsayan bütünleşik bir yapıda yürütülmektedir.
          </p>
          <p className="text-gray-700 leading-relaxed mb-5">
            Mühendislik ekibimiz, sektörün değişen ihtiyaçlarını ve teknolojik gelişmeleri yakından takip ederek ürün portfolyomuzu sürekli güncel tutmaktadır. Geliştirilen her yeni çözüm; saha koşullarında güvenilirlik, operatör konforu ve uzun servis ömrü kriterleri esas alınarak tasarlanmaktadır.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Ürün geliştirme (Ür-Ge) süreçlerimizde ise var olan ürün ailesi üzerinde yapılan sistematik iyileştirmeler ile müşteri geri bildirimleri etkin biçimde değerlendirilmekte; sürüm bazlı güncellemeler ile ürünlerin saha performansı artırılmaktadır.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {argeAreas.map((area, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="border border-gray-200 rounded-sm p-6 hover:border-[#8B1A1A] transition-colors duration-300 group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-sm bg-[#8B1A1A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#8B1A1A]/20 transition-colors">
                  <area.icon className="w-4 h-4 text-[#8B1A1A]" />
                </div>
                <h3 className="font-black text-gray-900 text-sm">{area.title}</h3>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">{area.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 border border-gray-200 rounded-sm p-8 mb-12"
        >
          <h2 className="text-xl font-black text-gray-900 mb-6">GELİŞTİRME ODAK ALANLARI</h2>
          <ul className="space-y-3">
            {milestones.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <ArrowRight className="w-4 h-4 text-[#8B1A1A] flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="bg-[#111111] text-white rounded-sm p-8 mb-10">
          <h2 className="text-lg font-black mb-3">MÜHENDİSLİK ANLAYIŞIMIZ</h2>
          <p className="text-gray-300 leading-relaxed text-sm italic">
            "Her ürün, saha koşullarında kanıtlanmış bir mühendislik çözümüdür. Ar-Ge yatırımlarımız; güvenliği, verimliliği ve müşteri memnuniyetini daima ön planda tutan bir anlayışla yönlendirilmektedir."
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/urunler">
            <Button className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold rounded-sm border-none">
              ÜRÜNLERİMİZ
            </Button>
          </Link>
          <Link href="/teklif">
            <Button variant="outline" className="border-gray-300 text-gray-800 font-bold rounded-sm hover:bg-gray-50">
              TEKLİF AL
            </Button>
          </Link>
          <Link href="/kurumsal/hakkimizda">
            <Button variant="outline" className="border-gray-300 text-gray-800 font-bold rounded-sm hover:bg-gray-50">
              Hakkımızda
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
