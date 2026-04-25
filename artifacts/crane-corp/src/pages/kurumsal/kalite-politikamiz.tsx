import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";

const commitments = [
  { title: "Uluslararası Standartlar", desc: "Üretimin her aşamasında uluslararası kalite normlarına tam uyum." },
  { title: "Sürekli İyileştirme", desc: "Yenilik odaklı yaklaşım ve süregelen süreç geliştirme kültürü." },
  { title: "Müşteri Geri Bildirimi", desc: "Geri bildirimleri sistematik olarak değerlendirme ve hızlı aksiyon." },
  { title: "Güvenilir Tedarik", desc: "Hammadde ve bileşen seçiminde titiz ve güvenilir kaynak yönetimi." },
  { title: "Sistem Testleri", desc: "Üretim süreçlerinde kapsamlı kalite kontrol ve test noktaları." },
  { title: "Ekip Gelişimi", desc: "Teknik personelin sürekli eğitim ve mesleki gelişim programları." },
  { title: "Teslim Öncesi Denetim", desc: "Her ürünün tesliminden önce kapsamlı kalite denetim protokolü." },
];

export default function KalitePolitikamiz() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero
        label="KURUMSAL"
        title="KALİTE POLİTİKAMIZ"
        description="Kalite, ZOMAK'ın üretim felsefesinin temel taşıdır."
      />

      <div className="container mx-auto px-4 md:px-8 py-16">

        {/* Üst bölüm: metin + görsel 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-black text-gray-900 mb-5">KALİTE FELSEFEMİZ</h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Zomak Vinç Platform ve Makina Sanayi olarak kalite; üretim sürecinin her aşamasında titizlikle uyguladığımız bir disiplindir. Müşteri memnuniyetini en üst düzeyde tutmak, güvenli ve uzun ömürlü ekipmanlar üretmek ve sektördeki kalite standartlarını karşılamak ya da aşmak temel hedeflerimiz arasındadır.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Kalite anlayışımız yalnızca nihai ürünle sınırlı değildir. Hammadde temini, tasarım aşaması, üretim süreçleri, kalite kontrol denetimleri ve satış sonrası hizmetlerin tümünü kapsayan bütünleşik bir sistem olarak değerlendirilmektedir.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Sürekli iyileştirme ilkesini benimseyerek müşteri geri bildirimlerini ve sektör gelişmelerini yakından takip ediyor; bu doğrultuda ürün ve süreç kalitemizi sürekli olarak geliştiriyoruz.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-xl overflow-hidden shadow-md h-[380px]"
          >
            <img src="/kurumsal/kalite-1.jpg" alt="ZOMAK Üretim" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Taahhüt & Anlayış — Vizyon/Misyon stili */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-8">
            <h3 className="font-black text-sm tracking-widest text-[#8B1A1A] mb-3">KALİTE TAAHHÜDÜMÜZ</h3>
            <p className="text-gray-700 leading-relaxed text-sm">
              Ürettiğimiz her ekipmanın uluslararası kalite normlarına eksiksiz uygun olmasını garanti ediyor; hammaddeden teslimata uzanan sürecin tamamında titiz kalite kontrol protokollerini uyguluyoruz.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-8">
            <h3 className="font-black text-sm tracking-widest text-[#8B1A1A] mb-3">KALİTE ANLAYIŞIMIZ</h3>
            <p className="text-gray-700 leading-relaxed text-sm">
              Kalite bizim için bir hedef değil, iş yapış biçimimizin ayrılmaz bir parçasıdır. Müşteri geri bildirimlerini sistematik biçimde değerlendiriyor; sürekli iyileştirme kültürünü tüm ekibimizle birlikte yaşatıyoruz.
            </p>
          </div>
        </div>

        {/* Kalite ilkeleri — Temel Değerler stili */}
        <div className="mb-16">
          <h2 className="text-2xl font-black text-gray-900 mb-8">KALİTE İLKELERİMİZ</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {commitments.map((v, i) => (
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

        {/* Kalite ilkesi alıntısı + görsel 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-xl overflow-hidden shadow-md mb-12">
          <div className="bg-[#111111] text-white p-10 flex flex-col justify-center">
            <h2 className="text-lg font-black mb-4 tracking-wide">KALİTE İLKEMİZ</h2>
            <p className="text-gray-300 leading-relaxed text-sm italic">
              "Ürünlerimizin her birini, kendi ekibimizin de güvenle kullanacağı standartlarda üretiriz. Kalite bir hedef değil; iş yapış biçimimizin ayrılmaz bir parçasıdır."
            </p>
          </div>
          <div className="h-[280px] lg:h-auto">
            <img src="/kurumsal/kalite-2.jpg" alt="ZOMAK Kalite Kontrol" className="w-full h-full object-cover" />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/urunler">
            <Button className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold rounded-sm border-none uppercase">
              Ürünlerimiz
            </Button>
          </Link>
          <Link href="/kurumsal/hakkimizda">
            <Button variant="outline" className="border-gray-300 text-gray-800 font-bold rounded-sm uppercase hover:bg-gray-50">
              Hakkımızda
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
