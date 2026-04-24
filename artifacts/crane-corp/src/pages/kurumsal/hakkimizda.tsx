import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import craneImg from "@assets/hakkımızda.png";
import { PageHero } from "@/components/layout/page-hero";

const values = [
  { title: "Güvenilirlik", desc: "Her projede söz verilen kalite ve zamanlamaya bağlılık." },
  { title: "Mühendislik", desc: "Teknik uzmanlık ve inovatif tasarım yaklaşımı." },
  { title: "Müşteri Odaklılık", desc: "İhtiyaca özel çözümler ve süregelen destek." },
  { title: "Kalite Standartları", desc: "Uluslararası kalite normlarına uygun üretim süreçleri." },
];

export default function Hakkimizda() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero
        label="KURUMSAL"
        title="HAKKIMIZDA"
        description="Zomak Vinç Platform ve Makina Sanayi'nin kuruluş hikâyesi, vizyonu ve değerleri."
      />
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-black text-gray-900 mb-5">ŞİRKET KİMLİĞİMİZ</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Zomak Vinç Platform ve Makina Sanayi, 2024 yılında İzmir'de kurulmuş olup vinç, kurtarıcı ve platform ekipmanları tasarımı ile üretimi konusunda hizmet vermektedir. Şirketimiz, endüstriyel ihtiyaçlara yönelik güvenilir, dayanıklı ve yüksek performanslı ekipmanlar üretmekte; Türkiye'nin önde gelen iş makineleri ve ağır araç operatörlerine çözüm ortağı olmaktadır.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Teknik bilgi birikimimiz ve deneyimli mühendislik kadromuz ile her ölçekteki projeye uygun ekipman sunabilme kapasitesine sahibiz. Standart ürün portföyümüzün yanı sıra projeye özel tasarım ve üretim hizmetleri de sunmaktayız.
              </p>
              <p className="text-gray-600 leading-relaxed">
                ZOMAK olarak yurt içi pazardaki hızlı büyümemizin yanı sıra uluslararası arenada da güvenilir bir tedarikçi konumuna ulaşmayı hedefliyoruz.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-sm overflow-hidden shadow-md"
          >
            <img src={craneImg as unknown as string} alt="ZOMAK Vinç" className="w-full max-h-[420px] object-contain" />
          </motion.div>
        </div>

        {/* Vision & Mission */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-8">
            <h3 className="font-black text-sm tracking-widest text-[#8B1A1A] mb-3">VİZYONUMUZ</h3>
            <p className="text-gray-700 leading-relaxed text-sm">Türkiye'nin en güvenilir vinç ve kurtarıcı ekipmanları üreticisi olarak uluslararası standartlarda mühendislik çözümleri sunmak; ihracat ağımızı genişleterek küresel ölçekte tanınan bir marka olmak.</p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-8">
            <h3 className="font-black text-sm tracking-widest text-[#8B1A1A] mb-3">MİSYONUMUZ</h3>
            <p className="text-gray-700 leading-relaxed text-sm">
              Müşterilerimizin operasyonel verimliliğini artıracak, güvenli ve uzun ömürlü ekipmanlar tasarlamak; satış öncesinden satış sonrasına kadar kesintisiz teknik destek ile iş ortaklarımızın güvenini kazanmak.
            </p>
          </div>
        </div>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-gray-900 mb-8">TEMEL DEĞERLERİMİZ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-gray-200 rounded-sm p-6 hover:border-[#8B1A1A] transition-colors"
              >
                <div className="w-6 h-0.5 bg-[#8B1A1A] mb-4" />
                <h4 className="font-black text-sm text-gray-900 mb-2 uppercase">{v.title}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/urunler">
            <Button className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold rounded-sm border-none">
              ÜRÜNLERİMİZ
            </Button>
          </Link>
          <Link href="/iletisim">
            <Button variant="outline" className="border-gray-300 text-gray-800 font-bold rounded-sm hover:bg-gray-50">
              İLETİŞİM
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
