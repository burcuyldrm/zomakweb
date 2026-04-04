import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, Phone, MessageCircle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import craneImg from "@assets/e8d0929a-4828-4358-80ce-dc6d91d4660f_1775312450764.jpeg";
import truckImg from "@assets/8c2a8adc-d4f4-4d87-abe2-5b692886a23b_1775312450763.jpeg";
import { products } from "@/data/products";

const references = ["Pekgöz Vinç", "Fındık Vinç", "Bergama Vinç", "Kuşadası Vinç"];

const trustPoints = [
  "2024 yılından itibaren sektörde aktif üretim",
  "Türkiye ve uluslararası pazarlara hizmet",
  "Özel tasarım ve seri üretim kapasitesi",
  "Satış sonrası teknik destek ve servis",
  "Kalite odaklı mühendislik anlayışı",
];

const galleryImages = [
  { src: craneImg, alt: "Mobil Katlanır Vinç" },
  { src: truckImg, alt: "Hidrolik Kurtarıcı" },
  { src: "https://images.unsplash.com/photo-1565008447742-97f6f38c985c?w=800&q=80", alt: "Şantiye Operasyonu" },
  { src: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80", alt: "Platform Çalışması" },
  { src: "https://images.unsplash.com/photo-1590141837800-79b87ece2f6e?w=800&q=80", alt: "Sanayi Projesi" },
  { src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80", alt: "Vinç Operasyonu" },
];

const productImages: Record<string, string> = {
  "mobil-katlanir-vinc": craneImg as unknown as string,
  "hidrolik-gozluklu-kurtarici": truckImg as unknown as string,
  "hidrolik-kurtarici": truckImg as unknown as string,
  "ozel-hidrolik-makineler": "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=800&q=80",
  "sepetli-platform": "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
};

export default function Home() {
  const [activeProduct, setActiveProduct] = useState(0);
  const product = products[activeProduct];

  return (
    <div className="flex flex-col min-h-screen">

      {/* HERO */}
      <section className="relative min-h-screen bg-[--brand-charcoal] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${craneImg})`, backgroundPosition: "center top" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[--brand-red]" />

        <div className="relative z-10 container mx-auto px-4 md:px-8 py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 border border-[--brand-red]/40 text-[--brand-red] text-xs font-bold uppercase tracking-widest px-4 py-2 mb-6 rounded-sm">
              <span className="w-1.5 h-1.5 bg-[--brand-red] rounded-full" />
              Zomak Vinç Platform ve Makina Sanayi — İzmir
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tight uppercase mb-4">
              Zirveye<br /><span className="text-[--brand-red]">Odaklan</span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg leading-relaxed font-light">
              Mobil vinç, hidrolik kurtarıcı ve sepetli platform çözümlerinde güvenilir iş ortağınız. Türkiye ve dünya geneli hizmet.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/teklif">
                <Button size="lg" className="h-12 px-8 font-bold bg-[--brand-red] hover:bg-[--brand-red-light] text-white rounded-sm border-none uppercase tracking-wide shadow-lg">
                  Teklif Al <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a
                href="https://wa.me/905411290102?text=Merhaba%2C%20ZOMAK%27tan%20vin%C3%A7%2Fplatform%20hizmeti%20i%C3%A7in%20teklif%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="h-12 px-8 font-bold rounded-sm border-white/25 text-white hover:bg-white/10 uppercase tracking-wide">
                  <MessageCircle className="mr-2 w-4 h-4 text-green-400" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[--brand-red]/40" />
      </section>

      {/* INTRO */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="text-xs font-bold text-[--brand-red] tracking-widest uppercase mb-3">Kimiz</div>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-gray-900 mb-5 leading-tight">
                Sektörün Güvenilir Üreticisi
              </h2>
              <p className="text-gray-600 leading-relaxed mb-4">
                Zomak Vinç Platform ve Makina Sanayi, 2024 yılında İzmir'de kurulmuş olup mobil katlanır vinç, hidrolik kurtarıcı ve sepetli platform ekipmanları alanında üretim ve hizmet vermektedir.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Mühendislik odaklı yaklaşımımız, kaliteli üretim süreçlerimiz ve müşteri memnuniyetine olan bağlılığımız ile Türkiye'nin önde gelen endüstriyel firmalarına güvenilir çözümler sunmaktayız.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "2024", label: "Kuruluş" },
                { num: "5+", label: "Ürün Grubu" },
                { num: "TR+", label: "Hizmet Alanı" },
                { num: "7/24", label: "Teknik Destek" },
              ].map((s, i) => (
                <div key={i} className="bg-gray-50 border border-gray-200 p-6 text-center rounded-sm">
                  <div className="text-3xl font-black text-[--brand-red] mb-1">{s.num}</div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* DYNAMIC PRODUCT SHOWCASE */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-10">
            <div className="text-xs font-bold text-[--brand-red] tracking-widest uppercase mb-2">Ürün Portföyümüz</div>
            <h2 className="text-3xl md:text-4xl font-black uppercase text-gray-900">Ürünlerimiz</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border border-gray-200 rounded-sm overflow-hidden shadow-sm">
            {/* Product selector */}
            <div className="bg-white border-r border-gray-200">
              {products.map((p, i) => (
                <button
                  key={p.slug}
                  onClick={() => setActiveProduct(i)}
                  className={cn(
                    "w-full text-left px-6 py-5 border-b border-gray-100 last:border-0 flex items-center justify-between transition-colors",
                    activeProduct === i
                      ? "bg-[--brand-charcoal] text-white"
                      : "text-gray-700 hover:bg-gray-50"
                  )}
                >
                  <span className="text-sm font-bold">{p.title}</span>
                  <ChevronRight className={cn("w-4 h-4 transition-colors flex-shrink-0", activeProduct === i ? "text-[--brand-red]" : "text-gray-300")} />
                </button>
              ))}
            </div>

            {/* Product detail */}
            <div className="lg:col-span-2 flex flex-col">
              <AnimatePresence mode="wait">
                <motion.div
                  key={product.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex flex-col h-full"
                >
                  <div className="relative h-56 bg-gray-200 overflow-hidden">
                    <img
                      src={productImages[product.slug] as string}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-6">
                      <div className="bg-[--brand-red] text-white text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wide">
                        {product.title}
                      </div>
                    </div>
                  </div>
                  <div className="p-8 flex-1">
                    <p className="text-gray-500 text-sm mb-4 font-medium italic">{product.shortDesc}</p>
                    <p className="text-gray-700 text-sm leading-relaxed mb-6">{product.description.slice(0, 200)}...</p>
                    <Link href={`/urunler/${product.slug}`}>
                      <Button size="sm" className="bg-[--brand-red] hover:bg-[--brand-red-light] text-white rounded-sm border-none font-bold uppercase">
                        Ürün Detayı <ArrowRight className="ml-2 w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="mt-6 text-right">
            <Link href="/urunler">
              <Button variant="ghost" className="text-[--brand-red] font-bold uppercase text-sm group hover:bg-transparent hover:text-[--brand-red-light]">
                Tüm Ürünleri Gör <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs font-bold text-[--brand-red] tracking-widest uppercase mb-3">Tercih Sebebimiz</div>
              <h2 className="text-3xl md:text-4xl font-black uppercase text-gray-900 leading-tight mb-8">
                Neden ZOMAK?
              </h2>
              <div className="space-y-4">
                {trustPoints.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }}
                    className="flex items-center gap-4"
                  >
                    <CheckCircle className="w-5 h-5 text-[--brand-red] flex-shrink-0" />
                    <span className="text-gray-700 font-medium text-sm">{p}</span>
                  </motion.div>
                ))}
              </div>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href="/teklif">
                  <Button className="bg-[--brand-red] hover:bg-[--brand-red-light] text-white font-bold px-7 h-11 rounded-sm border-none uppercase">
                    Teklif Al
                  </Button>
                </Link>
                <Link href="/kurumsal/hakkimizda">
                  <Button variant="outline" className="border-gray-300 text-gray-800 font-bold px-7 h-11 rounded-sm hover:bg-gray-50 uppercase">
                    Hakkımızda
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative rounded-sm overflow-hidden shadow-md">
              <img
                src={truckImg as unknown as string}
                alt="ZOMAK Ekipmanı"
                className="w-full h-[380px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* REFERENCES */}
      <section className="py-20 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <div className="text-xs font-bold text-[--brand-red] tracking-widest uppercase mb-2">Güveni Kazandık</div>
            <h2 className="text-3xl font-black uppercase text-gray-900">Referanslarımız</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {references.map((ref, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="bg-white border border-gray-200 hover:border-[--brand-red] p-8 flex items-center justify-center text-center font-bold text-gray-700 hover:text-[--brand-red] transition-colors duration-300 rounded-sm text-sm uppercase tracking-wide"
              >
                {ref}
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Link href="/referanslar">
              <Button variant="ghost" className="text-[--brand-red] font-bold uppercase text-sm group hover:bg-transparent">
                Tüm Referanslar <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* GALLERY PREVIEW */}
      <section className="py-20 bg-[--brand-charcoal]">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="text-xs font-bold text-[--brand-red] tracking-widest uppercase mb-2">Projelerimizden</div>
              <h2 className="text-3xl font-black text-white uppercase">Galeri</h2>
            </div>
            <Link href="/galeri">
              <Button variant="ghost" className="text-gray-300 font-bold uppercase text-sm group hover:bg-transparent hover:text-white">
                Tümü <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="aspect-[4/3] overflow-hidden rounded-sm group cursor-pointer"
              >
                <img
                  src={img.src as unknown as string}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <div className="text-xs font-bold text-[--brand-red] tracking-widest uppercase mb-3">Projenizi Değerlendirelim</div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase mb-4 leading-tight">
            Bizimle İletişime Geçin
          </h2>
          <p className="text-gray-500 mb-8 max-w-xl mx-auto text-sm leading-relaxed">
            Proje ihtiyaçlarınız ve teknik sorularınız için uzman ekibimiz hazır. Hemen bir teklif talep edin.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/teklif">
              <Button size="lg" className="h-12 px-8 font-bold bg-[--brand-red] hover:bg-[--brand-red-light] text-white rounded-sm border-none uppercase">
                Teklif Formu
              </Button>
            </Link>
            <a href="tel:05411290102">
              <Button size="lg" variant="outline" className="h-12 px-8 font-bold border-gray-300 text-gray-800 hover:bg-gray-50 rounded-sm uppercase">
                <Phone className="mr-2 w-4 h-4" />
                0541 129 01 02
              </Button>
            </a>
            <a
              href="https://wa.me/905411290102?text=Merhaba%2C%20ZOMAK%27tan%20vin%C3%A7%2Fplatform%20hizmeti%20i%C3%A7in%20teklif%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="h-12 px-8 font-bold border-gray-300 text-gray-800 hover:bg-gray-50 rounded-sm uppercase">
                <MessageCircle className="mr-2 w-4 h-4 text-green-600" />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
