import { motion } from "framer-motion";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const principles = [
  "Üretim süreçlerinde atık minimizasyonu ve verimli kaynak kullanımı",
  "Enerji tüketiminin azaltılması ve yenilenebilir enerji kullanımına yönelik çalışmalar",
  "Çevresel mevzuat ve yasal düzenlemelere eksiksiz uyum",
  "Tedarikçi seçiminde çevresel sorumluluk kriterlerinin gözetilmesi",
  "Çalışanlara yönelik çevre bilinci eğitim programları",
  "Karbon ayak izinin azaltılmasına yönelik sürekli iyileştirme",
  "Toplum ve paydaşlarla çevre konusunda şeffaf iletişim",
];

export default function CevrePolitikamiz() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[--brand-charcoal] text-white py-20 relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[--brand-red]" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-xs font-bold text-[--brand-red] tracking-widest uppercase mb-2">Kurumsal</div>
          <h1 className="text-4xl md:text-5xl font-black uppercase text-white mb-3">Çevre Politikamız</h1>
          <p className="text-gray-400 text-base max-w-2xl">
            Çevresel sorumluluk, iş yapış biçimimizin temel bir boyutudur.
          </p>
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
            Zomak Vinç Platform ve Makina Sanayi olarak faaliyetlerimizin çevre üzerindeki etkisini en aza indirmeyi ve sürdürülebilir bir üretim anlayışı benimsemeyi temel ilke olarak kabul ediyoruz. Çevresel sorumluluk bilincini kurumsal kültürümüzün ayrılmaz bir parçası haline getirmeye çalışıyoruz.
          </p>
          <p className="text-gray-700 leading-relaxed mb-5">
            Üretim tesislerimizden tedarik süreçlerimize, ürünlerimizin tasarımından kullanım ömrü sonrasına kadar her aşamada çevresel etkiyi değerlendiriyor; olumsuz etkileri azaltmak için proaktif adımlar atıyoruz.
          </p>
          <p className="text-gray-700 leading-relaxed">
            Çevre mevzuatına ve ülkemizin taraf olduğu uluslararası çevre anlaşmalarına uyumu bir zorunluluk değil, kurumsal bir sorumluluk olarak benimsiyoruz.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-50 border border-gray-200 rounded-sm p-8 mb-12"
        >
          <h2 className="text-xl font-black uppercase text-gray-900 mb-6">Çevre Taahhütlerimiz</h2>
          <ul className="space-y-3">
            {principles.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-gray-700">
                <CheckCircle className="w-4 h-4 text-[--brand-red] flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="bg-[--brand-charcoal] text-white rounded-sm p-8 mb-10">
          <h2 className="text-lg font-black uppercase mb-3">Çevre İlkemiz</h2>
          <p className="text-gray-300 leading-relaxed text-sm italic">
            "Ürettiğimiz her ekipman, hem insanlara hem de çevreye karşı sorumluluğumuzu yansıtır. Doğayla uyumlu üretim anlayışını nesiller boyu sürdürülebilir bir miras olarak görüyoruz."
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link href="/kurumsal/kalite-politikamiz">
            <Button className="bg-[--brand-red] hover:bg-[--brand-red-light] text-white font-bold rounded-sm border-none uppercase">
              Kalite Politikamız
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
