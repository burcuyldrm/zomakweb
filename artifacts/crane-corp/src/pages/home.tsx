import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, Phone, MessageCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  { title: "Mobil Katlanır Vinç", desc: "Kompakt yapısı ile dar alanlarda yüksek performanslı kaldırma çözümü.", icon: "🏗️" },
  { title: "Hidrolik Gözlüklü Kurtarıcı", desc: "Araç kurtarma operasyonlarında güvenilir hidrolik çözüm.", icon: "🚛" },
  { title: "Hidrolik Kurtarıcı", desc: "Ağır taşıt kurtarma için özel tasarım hidrolik sistemler.", icon: "⚙️" },
  { title: "Özel Hidrolik Makineler", desc: "Projeye özel tasarım ve üretim imkânı.", icon: "🔧" },
  { title: "Sepetli Platform", desc: "Yüksekte çalışma için güvenli ve konforlu platform sistemleri.", icon: "🧺" },
];

const references = [
  "Pekgöz Vinç",
  "Fındık Vinç",
  "Bergama Vinç",
  "Kuşadası Vinç",
];

const trustPoints = [
  "2024 yılından itibaren sektörde aktif",
  "Türkiye ve dünya geneli hizmet ağı",
  "Özel tasarım ve seri üretim",
  "Teknik destek ve satış sonrası servis",
  "İzmir merkezli, ulusal erişim",
];

const galleryImages = [
  "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80",
  "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80",
  "https://images.unsplash.com/photo-1590141837800-79b87ece2f6e?w=800&q=80",
  "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
  "https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?w=800&q=80",
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* HERO */}
      <section className="relative min-h-screen bg-black flex items-center overflow-hidden">
        {/* Background texture */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1800&q=80')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

        {/* Red accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#c00]" />

        <div className="relative z-10 container mx-auto px-4 md:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 border border-[#c00] text-[#c00] text-xs font-black uppercase tracking-widest px-4 py-2 mb-6">
              <span className="w-2 h-2 bg-[#c00] animate-pulse rounded-full" />
              Zomak Vinç Platform Makina — İzmir
            </div>
            <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase mb-6">
              Zirveye<br /><span className="text-[#c00]">Odaklan</span>
            </h1>
            <p className="text-xl text-gray-300 mb-10 max-w-xl font-light leading-relaxed">
              Mobil vinç, hidrolik kurtarıcı ve sepetli platform çözümlerinde güvenilir iş ortağınız. Türkiye ve dünya geneli hizmet.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/teklif">
                <Button size="lg" className="h-14 px-10 text-base font-black bg-[#c00] hover:bg-red-700 rounded-none border-none uppercase tracking-wider">
                  Teklif Al <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <a
                href="https://wa.me/905411290102?text=Merhaba%2C%20ZOMAK%27tan%20vin%C3%A7%2Fplatform%20hizmeti%20i%C3%A7in%20teklif%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="h-14 px-10 text-base font-black rounded-none border-white/30 text-white hover:bg-white hover:text-black uppercase tracking-wider">
                  <MessageCircle className="mr-2 w-5 h-5 text-green-400" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Bottom red strip */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#c00]" />
      </section>

      {/* SERVICES PREVIEW */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
            <div>
              <div className="text-xs font-black text-[#c00] tracking-widest uppercase mb-2">Neler Yapıyoruz</div>
              <h2 className="text-4xl md:text-5xl font-black text-black uppercase tracking-tight leading-none">
                Hizmetlerimiz
              </h2>
            </div>
            <Link href="/hizmetler">
              <Button variant="ghost" className="font-black text-[#c00] hover:text-black uppercase group">
                Tümünü Gör <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-gray-200">
            {services.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border-b border-r border-gray-200 p-8 hover:bg-black hover:text-white group transition-colors duration-300 cursor-pointer"
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-lg font-black uppercase mb-2 group-hover:text-[#c00] transition-colors">{s.title}</h3>
                <p className="text-sm text-gray-500 group-hover:text-gray-300 leading-relaxed transition-colors">{s.desc}</p>
                <div className="mt-4 flex items-center gap-2 text-xs font-black uppercase text-[#c00] group-hover:text-[#c00]">
                  Detaylar <ChevronRight className="w-3 h-3" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FLEET HIGHLIGHT */}
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs font-black text-[#c00] tracking-widest uppercase mb-2">Amiral Gemimiz</div>
              <h2 className="text-4xl md:text-5xl font-black uppercase leading-none mb-6">
                ZV060<br /><span className="text-[#c00]">Mobil Vinç</span>
              </h2>
              <div className="flex items-center gap-4 mb-8">
                <div className="border-l-4 border-[#c00] pl-4">
                  <div className="text-4xl font-black text-[#c00]">60</div>
                  <div className="text-sm text-gray-400 font-bold">ton/metre</div>
                </div>
                <div className="border-l-4 border-white/20 pl-4">
                  <div className="text-4xl font-black text-white">27</div>
                  <div className="text-sm text-gray-400 font-bold">metre bom</div>
                </div>
              </div>
              <p className="text-gray-300 mb-8 leading-relaxed">
                ZV060, ZOMAK'ın en güçlü mobil katlanır vinç modelidir. Yüksek kapasitesi ve kompakt tasarımıyla her türlü operasyonuna uyumludur.
              </p>
              <Link href="/filomuz">
                <Button className="bg-[#c00] hover:bg-red-700 text-white font-black px-8 h-12 rounded-none border-none uppercase">
                  Teknik Detaylar
                </Button>
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gray-800 flex items-center justify-center border border-gray-700">
                <img
                  src="https://images.unsplash.com/photo-1530973428-5bf2db2e4d71?w=1000&q=80"
                  alt="ZV060 Mobil Vinç"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="bg-[#c00] text-white px-4 py-2 font-black text-sm uppercase tracking-widest">
                    ZV060 — 60 ton/metre
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs font-black text-[#c00] tracking-widest uppercase mb-2">Neden ZOMAK</div>
              <h2 className="text-4xl md:text-5xl font-black uppercase leading-none mb-8 text-black">
                Güvenilir<br />Çözüm Ortağı
              </h2>
              <div className="space-y-4">
                {trustPoints.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4"
                  >
                    <CheckCircle className="w-5 h-5 text-[#c00] flex-shrink-0" />
                    <span className="font-semibold text-gray-800">{p}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-10 flex gap-6">
                <Link href="/teklif">
                  <Button className="bg-[#c00] hover:bg-red-700 text-white font-black px-8 h-12 rounded-none border-none uppercase">
                    Teklif Al
                  </Button>
                </Link>
                <a href="tel:05411290102">
                  <Button variant="outline" className="border-black text-black font-black px-8 h-12 rounded-none hover:bg-black hover:text-white uppercase">
                    <Phone className="w-4 h-4 mr-2" />
                    Ara
                  </Button>
                </a>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { number: "2024", label: "Kuruluş Yılı" },
                { number: "5+", label: "Hizmet Türü" },
                { number: "TR+", label: "Hizmet Alanı" },
                { number: "7/24", label: "Teknik Destek" },
              ].map((s, i) => (
                <div key={i} className="bg-black text-white p-8 flex flex-col items-center justify-center text-center">
                  <div className="text-4xl font-black text-[#c00] mb-1">{s.number}</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* REFERENCES */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-14">
            <div className="text-xs font-black text-[#c00] tracking-widest uppercase mb-2">Güven Duyanlar</div>
            <h2 className="text-4xl font-black uppercase text-black">Referanslarımız</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {references.map((ref, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="border-2 border-gray-200 hover:border-[#c00] p-8 flex items-center justify-center text-center font-black text-gray-700 hover:text-[#c00] transition-colors duration-300 uppercase text-sm tracking-wide"
              >
                {ref}
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/referanslar">
              <Button variant="ghost" className="text-[#c00] font-black uppercase group">
                Tüm Referanslar <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs font-black text-[#c00] tracking-widest uppercase mb-2">Projelerimiz</div>
              <h2 className="text-4xl font-black text-white uppercase">Galeri</h2>
            </div>
            <Link href="/galeri">
              <Button variant="ghost" className="text-[#c00] font-black uppercase group">
                Tümünü Gör <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryImages.map((src, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="aspect-square overflow-hidden group cursor-pointer"
              >
                <img
                  src={src}
                  alt={`Galeri ${i + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-75 group-hover:opacity-100"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-20 bg-[#c00]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase mb-4 leading-none">
            Projenizi Konuşalım
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-xl mx-auto">
            Hizmet talebiniz veya teknik sorularınız için hemen ulaşın.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/teklif">
              <Button size="lg" className="h-14 px-10 font-black bg-white text-[#c00] hover:bg-gray-100 rounded-none border-none uppercase text-base">
                Teklif Formu
              </Button>
            </Link>
            <a
              href="https://wa.me/905411290102?text=Merhaba%2C%20ZOMAK%27tan%20vin%C3%A7%2Fplatform%20hizmeti%20i%C3%A7in%20teklif%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="h-14 px-10 font-black border-white text-white hover:bg-white hover:text-[#c00] rounded-none uppercase text-base">
                <MessageCircle className="mr-2 w-5 h-5" />
                WhatsApp
              </Button>
            </a>
            <a href="tel:05411290102">
              <Button size="lg" variant="outline" className="h-14 px-10 font-black border-white text-white hover:bg-white hover:text-[#c00] rounded-none uppercase text-base">
                <Phone className="mr-2 w-5 h-5" />
                Ara
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
