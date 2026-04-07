import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import arge1 from "@assets/arge1_1775570334475.png";
import arge2 from "@assets/arge2_1775570334476.png";
import arge3 from "@assets/arge3_1775570334476.png";
import { PageHero } from "@/components/layout/page-hero";

export default function ArgeUrge() {
  return (
    <div className="min-h-screen bg-white">
      <PageHero
        label="KURUMSAL"
        title="AR-GE & ÜR-GE"
      />
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-gray-700 leading-relaxed mb-5 text-justify">AR&GE ve ÜR&GE çalışmalarımız kapsamında, dünya teknolojilerini yakından takip ederek kendimizi sürekli geliştiriyoruz. Hafiflik ve yüksek mukavemeti esas alan tasarımlarımızı, üstün kalite anlayışı ve hatasız işçilikle bir araya getirerek güvenilir ve verimli sistemler ortaya koyuyoruz. Mühendislik gücümüz ve yenilikçi yaklaşımımız sayesinde, sektörün ihtiyaçlarına ileri düzey çözümler sunmaya devam edeceğiz.</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 mb-12">
          {[
            { src: arge1, alt: "ZOMAK AR-GE Teknik Çizim" },
            { src: arge2, alt: "ZOMAK AR-GE 3D Model" },
            { src: arge3, alt: "ZOMAK AR-GE Simülasyon" },
          ].map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-sm overflow-hidden border border-gray-200 bg-gray-50"
            >
              <img
                src={img.src as unknown as string}
                alt={img.alt}
                className="w-full h-auto object-contain"
              />
            </motion.div>
          ))}
        </div>

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
