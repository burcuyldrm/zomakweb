import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import arge1 from "@assets/arge1_1775570334475.png";
import arge3 from "@assets/arge3_1775570334476.png";
import { PageHero } from "@/components/layout/page-hero";

export default function ArgeUrge() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero
        label="KURUMSAL"
        title="AR-GE & ÜR-GE"
      />

      <div className="container mx-auto px-4 md:px-8 py-16 max-w-6xl">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-700 leading-relaxed text-justify">
              AR&GE ve ÜR&GE çalışmalarımız kapsamında, dünya teknolojilerini yakından takip ederek kendimizi sürekli geliştiriyoruz. Hafiflik ve yüksek mukavemeti esas alan tasarımlarımızı, üstün kalite anlayışı ve hatasız işçilikle bir araya getirerek güvenilir ve verimli sistemler ortaya koyuyoruz. Mühendislik gücümüz ve yenilikçi yaklaşımımız sayesinde, sektörün ihtiyaçlarına ileri düzey çözümler sunmaya devam edeceğiz.
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
              src={arge1 as unknown as string}
              alt="ZOMAK AR-GE Teknik Çizim"
              className="w-auto max-w-full max-h-[380px] object-contain"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-[#111111] text-white rounded-sm p-8">
              <h2 className="text-lg font-black mb-3">MÜHENDİSLİK ANLAYIŞIMIZ</h2>
              <p className="text-gray-300 leading-relaxed text-sm italic">
                "Her ürün, saha koşullarında kanıtlanmış bir mühendislik çözümüdür. Ar-Ge yatırımlarımız; güvenliği, verimliliği ve müşteri memnuniyetini daima ön planda tutan bir anlayışla yönlendirilmektedir."
              </p>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
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
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <img
              src={arge3 as unknown as string}
              alt="ZOMAK AR-GE Simülasyon"
              className="w-auto max-w-full max-h-[380px] object-contain"
            />
          </motion.div>
        </div>

      </div>
    </div>
  );
}
