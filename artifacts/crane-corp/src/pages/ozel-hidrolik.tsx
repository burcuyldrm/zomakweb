import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";

export default function OzelHidrolik() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero
        label="ÜRÜNLER"
        title="ÖZEL HİDROLİK MAKİNELER"
        description="Müşteri ihtiyaçlarına özel, proje bazlı mühendislik çözümleri."
      />
      <div className="container mx-auto px-4 md:px-8 pt-8 pb-16 max-w-6xl">

        <Link href="/urunler">
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2 mb-8 rounded-sm text-xs font-bold uppercase text-gray-500 hover:text-[#8B1A1A]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Tüm Ürünler
          </Button>
        </Link>

        {/* Bölüm 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-black text-gray-900 mb-5">
              STANDART ÖTESI KAPASİTE
            </h2>
            <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#8B1A1A] mb-3">
              PROJE BAZLI ÇÖZÜMLER
            </div>
            <p className="text-gray-600 leading-relaxed text-justify mb-4">
              ZOMAK, standart ürünlerinin ötesinde; müşteri ihtiyaçlarına özel, proje bazlı hidrolik makine çözümleri geliştirme kabiliyetine sahiptir.
            </p>
            <p className="text-gray-600 leading-relaxed text-justify">
              Her proje; saha koşulları, operasyonel gereksinimler ve performans beklentileri dikkate alınarak mühendislik bakış açısıyla ele alınır. Tasarım, üretim ve uygulama süreçlerinin tamamı ZOMAK güvencesiyle yürütülür. İhtiyacınızı anlar, tasarlar ve gerçeğe dönüştürür.
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
            <p className="text-gray-600 leading-relaxed text-justify">
              Her proje; saha koşulları, operasyonel gereksinimler ve performans beklentileri dikkate alınarak mühendislik bakış açısıyla ele alınır. Tasarım, üretim ve uygulama süreçlerinin tamamı ZOMAK güvencesiyle yürütülür. İhtiyacınızı anlar, tasarlar ve gerçeğe dönüştürür.
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
