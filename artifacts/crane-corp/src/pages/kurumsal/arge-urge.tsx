import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function ArgeUrge() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#111111] text-white py-16 relative">
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#8B1A1A]" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B1A1A]/40" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-[10px] font-bold text-[#8B1A1A] tracking-widest mb-2">KURUMSAL</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight text-center">AR-GE &amp; ÜR-GE</h1>
        </div>
      </div>
      <div className="container mx-auto px-4 md:px-8 py-16 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <p className="text-gray-700 leading-relaxed mb-5 text-justify">AR&GE ve ÜR&GE çalışmalarımız kapsamında, dünya teknolojilerini yakından takip ederek kendimizi sürekli geliştiriyoruz. Hafiflik ve yüksek mukavemeti esas alan tasarımlarımızı, üstün kalite anlayışı ve hatasız işçilikle bir araya getirerek güvenilir ve verimli sistemler ortaya koyuyoruz. Mühendislik gücümüz ve yenilikçi yaklaşımımız sayesinde, sektörün ihtiyaçlarına ileri düzey çözümler sunmaya devam edeceğiz.</p>
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
