import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";

export default function OzelHidrolik() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero
        label="ÜRÜNLER"
        title="ÖZEL HİDROLİK MAKİNELER"
        description="Müşteri ihtiyaçlarına özel, proje bazlı mühendislik çözümleri."
      />

      <div className="container mx-auto px-4 md:px-8 py-16 max-w-6xl">

        {/* Bölüm 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8B1A1A] mb-3">
              PROJE BAZLI ÇÖZÜMLER
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-5">
              STANDART ÖTESI KAPASİTE
            </h2>
            <p className="text-gray-600 leading-relaxed text-justify">
              ZOMAK, standart ürünlerinin ötesinde; müşteri ihtiyaçlarına özel, proje bazlı hidrolik makine çözümleri geliştirme kabiliyetine sahiptir.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <img
              src="/products/zhm-1/zhm_1_1.jpg"
              alt="ZOMAK Özel Hidrolik Makine"
              className="w-full max-h-[400px] object-cover rounded-xl shadow-md"
            />
          </motion.div>
        </div>

        {/* Bölüm 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-[#111111] text-white rounded-sm p-8 mb-8">
              <h2 className="text-lg font-black mb-3">MÜHENDİSLİK GÜVENCESI</h2>
              <p className="text-gray-300 leading-relaxed text-sm text-justify">
                Her proje; saha koşulları, operasyonel gereksinimler ve performans beklentileri dikkate alınarak mühendislik bakış açısıyla ele alınır. Tasarım, üretim ve uygulama süreçlerinin tamamı ZOMAK güvencesiyle yürütülür. İhtiyacınızı anlar, tasarlar ve gerçeğe dönüştürür.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link href="/teklif">
                <Button className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold rounded-sm border-none">
                  TEKLİF AL
                </Button>
              </Link>
              <a
                href="https://wa.me/905411290102?text=Merhaba%2C%20ZOMAK%20%C3%96zel%20Hidrolik%20Makine%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="border-gray-300 text-gray-800 font-bold rounded-sm hover:bg-gray-50">
                  <MessageCircle className="mr-2 h-4 w-4 text-green-600" /> WhatsApp
                </Button>
              </a>
              <Link href="/kurumsal/hakkimizda">
                <Button variant="outline" className="border-gray-300 text-gray-800 font-bold rounded-sm hover:bg-gray-50">
                  Hakkımızda
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <img
              src="/products/zhm-2/zhm_2_1.jpg"
              alt="ZOMAK Özel Hidrolik Makine Üretim"
              className="w-full max-h-[400px] object-cover rounded-xl shadow-md"
            />
          </motion.div>
        </div>

      </div>
    </div>
  );
}
