import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";

const commitments = [
  "Uluslararası kalite standartlarına uygun üretim süreçleri",
  "Sürekli iyileştirme kültürü ve inovasyon odaklı yaklaşım",
  "Müşteri geri bildirimlerini değerlendirme ve hızlı aksiyon",
  "Hammadde ve bileşen tedarikinde güvenilir kaynak yönetimi",
  "Üretim süreçlerinde sistem testleri ve kalite kontrol noktaları",
  "Teknik ekibin sürekli eğitim ve gelişim programları",
  "Teslim öncesi kapsamlı ürün denetim protokolleri",
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

        {/* 1. Kalite Felsefemiz: metin sol + görsel 1 sağ (kırpılmadan) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="prose prose-gray max-w-none">
              <h2 className="text-2xl font-black text-gray-900 mb-5">KALİTE FELSEFEMİZ</h2>
              <p className="text-gray-600 leading-relaxed mb-4 text-justify">
                Zomak Vinç Platform ve Makina Sanayi olarak kalite; üretim sürecinin her aşamasında titizlikle uyguladığımız bir disiplindir. Müşteri memnuniyetini en üst düzeyde tutmak, güvenli ve uzun ömürlü ekipmanlar üretmek ve sektördeki kalite standartlarını karşılamak ya da aşmak temel hedeflerimiz arasındadır.
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                Kalite anlayışımız yalnızca nihai ürünle sınırlı değildir. Hammadde temini, tasarım aşaması, üretim süreçleri, kalite kontrol denetimleri ve satış sonrası hizmetlerin tümünü kapsayan bütünleşik bir sistem olarak değerlendirilmektedir.
              </p>
              <p className="text-gray-600 leading-relaxed text-justify">
                Sürekli iyileştirme ilkesini benimseyerek müşteri geri bildirimlerini ve sektör gelişmelerini yakından takip ediyor; bu doğrultuda ürün ve süreç kalitemizi sürekli olarak geliştiriyoruz.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <img src="/kurumsal/kalite-1.jpg" alt="ZOMAK Üretim" className="w-auto max-w-full max-h-[380px] rounded-xl shadow-md" />
          </motion.div>
        </div>

        {/* 2. Görsel 2 sol + Kalite Taahhütlerimiz listesi sağ (kırpılmadan) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center"
          >
            <img src="/kurumsal/kalite-2.jpg" alt="ZOMAK Kalite Kontrol" className="w-auto max-w-full max-h-[380px] rounded-xl shadow-md" />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-2xl font-black text-gray-900 mb-6">KALİTE TAAHHÜTLERİMİZ</h2>
            <ul className="space-y-3">
              {commitments.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                  <CheckCircle className="w-4 h-4 text-[#8B1A1A] flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* 3. Kalite Taahhüdümüz + Kalite Anlayışımız kutuları */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-8">
            <h3 className="font-black text-sm tracking-widest text-[#8B1A1A] mb-3">OPERASYONEL KALİTE YAKLAŞIMIMIZ</h3>
            <p className="text-gray-700 text-sm text-justify">
              Ürettiğimiz her ekipmanın uluslararası kalite normlarına eksiksiz uygun olmasını garanti ediyor; hammaddeden teslimata uzanan sürecin tamamında titiz kalite kontrol protokollerini uyguluyoruz.
            </p>
          </div>
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-8">
            <h3 className="font-black text-sm tracking-widest text-[#8B1A1A] mb-3">KALİTE ANLAYIŞIMIZ</h3>
            <p className="text-gray-700 text-sm text-justify">
              Kalite bizim için bir hedef değil, iş yapış biçimimizin ayrılmaz bir parçasıdır. Müşteri geri bildirimlerini sistematik biçimde değerlendiriyor; sürekli iyileştirme kültürünü tüm ekibimizle birlikte yaşatıyoruz.
            </p>
          </div>
        </div>

        {/* 4. Kalite ilkesi alıntısı */}
        <div className="bg-[#111111] text-white rounded-sm p-8 mb-10">
          <h2 className="text-lg font-black mb-3">KALİTE İLKEMİZ</h2>
          <p className="text-gray-300 leading-relaxed text-sm italic">
            "Ürünlerimizin her birini, kendi ekibimizin de güvenle kullanacağı standartlarda üretiriz. Kalite bir hedef değil; iş yapış biçimimizin ayrılmaz bir parçasıdır."
          </p>
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
