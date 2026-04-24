import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight,
  Phone,
  MessageCircle,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useListCategories } from "@workspace/api-client-react";

const references = [
  "Pekgöz Vinç",
  "Fındık Vinç",
  "Bergama Vinç",
  "Kuşadası Vinç",
];

const heroSlides = [
  {
    id: 1,
    eyebrow: "ZOMAK VİNÇ PLATFORM VE MAKİNA SANAYİ",
    title: "ZİRVEYE\nODAKLAN",
    desc: "Mobil vinç, kurtarıcı ve özel hidrolik sistem çözümlerinde güvenilir üretim ve mühendislik desteği sunuyoruz.",
    image: "/images/products/zv-300-1.jpeg",
    cta: "/urunler",
  },
  {
    id: 2,
    eyebrow: "ENDÜSTRİYEL GÜÇ",
    title: "SAHADA\nYÜKSEK PERFORMANS",
    desc: "Ağır hizmet koşullarına uygun, güvenilir ve dayanıklı ürün gruplarımız ile projelerinize değer katıyoruz.",
    image: "/images/products/zk-g300-1.jpeg",
    cta: "/urunler",
  },
];

export default function Home() {
  const [activeSlide, setActiveSlide] = useState(0);
  const { data: categories } = useListCategories();

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => {
    setActiveSlide(
      (prev) => (prev - 1 + heroSlides.length) % heroSlides.length,
    );
  };

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % heroSlides.length);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      {/* ── HERO SLIDER ─────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-black">
        <div className="relative h-[78vh] min-h-[620px] w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={heroSlides[activeSlide].id}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <img
                src={heroSlides[activeSlide].image}
                alt={heroSlides[activeSlide].title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/20" />
            </motion.div>
          </AnimatePresence>

          <div className="relative z-10 container mx-auto flex h-full items-center px-4 md:px-8">
            <div className="max-w-2xl">
              <motion.div
                key={`eyebrow-${heroSlides[activeSlide].id}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
                className="mb-6 inline-flex items-center gap-2 rounded-sm border border-[#8B1A1A]/60 bg-[#8B1A1A]/20 px-4 py-2 text-xs font-bold tracking-widest text-white"
              >
                <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8B1A1A]" />
                {heroSlides[activeSlide].eyebrow}
              </motion.div>

              <motion.h1
                key={`title-${heroSlides[activeSlide].id}`}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55 }}
                className="mb-5 whitespace-pre-line text-5xl font-black leading-none tracking-tight text-white md:text-7xl"
              >
                {heroSlides[activeSlide].title}
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.05 }}
                className="mb-5 h-[4px] w-16 rounded-full bg-[#8B1A1A]"
              />

              <motion.p
                key={`desc-${heroSlides[activeSlide].id}`}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8 max-w-xl text-base leading-relaxed text-gray-300 md:text-lg"
              >
                {heroSlides[activeSlide].desc}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.15 }}
                className="flex flex-wrap gap-3"
              >
                <Link href="/urunler">
                  <Button
                    size="lg"
                    className="h-12 rounded-sm border-none bg-[#8B1A1A] px-8 font-bold tracking-wide text-white shadow-lg hover:bg-[#A52020]"
                  >
                    İNCELE <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>

                <Link href="/teklif">
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 rounded-sm border-white/30 bg-white/5 px-8 font-bold tracking-wide text-white hover:bg-white/15"
                  >
                    TEKLİF AL
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/40"
            aria-label="Önceki slayt"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/20 text-white backdrop-blur-sm transition hover:bg-black/40"
            aria-label="Sonraki slayt"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div className="absolute bottom-20 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setActiveSlide(index)}
                className={`h-2.5 rounded-full transition-all ${
                  activeSlide === index ? "w-8 bg-white" : "w-2.5 bg-white/45"
                }`}
                aria-label={`Slayt ${index + 1}`}
              />
            ))}
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10 h-24 md:h-32">
            <svg
              viewBox="0 0 1440 180"
              className="h-full w-full"
              preserveAspectRatio="none"
            >
              <path
                d="M0,30 C280,170 520,180 720,165 C950,145 1170,90 1440,20 L1440,180 L0,180 Z"
                fill="white"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* ── PRODUCT CARDS ─────────────────────────── */}
      <section className="relative z-20 -mt-10 bg-white pb-20 pt-6 md:-mt-14 md:pt-10">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-8 text-center">
            <div className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8B1A1A]">
              Ürün Gruplarımız
            </div>
            <h2 className="text-3xl font-black text-gray-900 md:text-4xl">
              ÜRÜNLERİMİZ
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-500 md:text-base">
              İhtiyacınıza uygun vinç, kurtarıcı, kayar kasa ve özel hidrolik
              sistem çözümlerimizi inceleyin.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-4">
            {(categories ?? []).map((cat, i) => (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="h-full"
              >
                <Link href={`/urunler/${cat.slug}`} className="block h-full">
                  <article className="group relative h-full min-h-[430px] cursor-pointer overflow-hidden rounded-[28px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
                    <div
                      className="absolute inset-0 bg-[#f3f3f3] transition-colors duration-300 group-hover:bg-[#ececec]"
                      style={{ clipPath: "polygon(0 0, 72% 0, 100% 22%, 100% 100%, 0 100%)" }}
                    />
                    <div className="relative z-10 flex h-full flex-col px-6 pt-7 pb-6">
                      <div className="mb-5">
                        <h3 className="max-w-[220px] text-[24px] leading-[1.08] font-black text-[#1f1f1f] transition-colors duration-300 group-hover:text-[#8B1A1A]">
                          {cat.name}
                        </h3>
                        <span className="mt-4 block h-[5px] w-10 rounded-full bg-[#B3201D]" />
                      </div>
                      <div className="flex min-h-[180px] items-center justify-center">
                        {cat.image ? (
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="max-h-[170px] w-auto max-w-full object-contain drop-shadow-[0_12px_16px_rgba(0,0,0,0.14)] transition-transform duration-500 group-hover:scale-[1.04]"
                          />
                        ) : (
                          <div className="h-[170px] w-full rounded-xl bg-gray-200" />
                        )}
                      </div>
                      <p className="mt-5 text-sm leading-relaxed text-gray-500">
                        {cat.description}
                      </p>
                      <div className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-extrabold uppercase tracking-[0.12em] text-[#8B1A1A] transition-all duration-300 group-hover:gap-3">
                        İncele
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTRO ───────────────────────────────── */}
      <section className="border-b border-gray-100 bg-white py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-block rounded-full border border-[#8B1A1A]/20 bg-[#8B1A1A]/5 px-4 py-1.5 text-xs font-bold tracking-widest text-[#8B1A1A]">
              BİZ KİMİZ
            </div>
            <h2 className="mb-6 text-4xl font-black leading-tight text-gray-900 md:text-5xl">
              Sektörün{" "}
              <span className="text-[#8B1A1A]">Güvenilir</span>{" "}
              Üreticisi
            </h2>
            <div className="mx-auto mb-6 h-1 w-16 bg-[#8B1A1A]" />
            <p className="mb-4 text-base leading-relaxed text-gray-600">
              Zomak Vinç Platform ve Makina Sanayi, 2024 yılında İzmir'de
              kurulmuş olup mobil katlanır vinç, hidrolik kurtarıcı ve sepetli
              platform ekipmanları alanında üretim ve hizmet vermektedir.
            </p>
            <p className="text-base leading-relaxed text-gray-600">
              Mühendislik odaklı yaklaşımımız, kaliteli üretim süreçlerimiz ve
              müşteri memnuniyetine olan bağlılığımız ile Türkiye'nin önde
              gelen endüstriyel firmalarına güvenilir çözümler sunmaktayız.
            </p>
          </div>
        </div>
      </section>

      {/* ── REFERENCES ───────────────────────────────── */}
      <section className="border-b border-gray-200 bg-gray-50 py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-12 text-center">
            <div className="mb-2 text-xs font-bold tracking-widest text-[#8B1A1A]">
              GÜVENİ KAZANDIK
            </div>
            <h2 className="text-3xl font-black text-gray-900">
              Referanslarımız
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {references.map((ref, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="flex items-center justify-center rounded-sm border border-gray-200 bg-white p-8 text-center text-sm font-bold text-gray-700 transition-colors duration-300 hover:border-[#8B1A1A] hover:text-[#8B1A1A]"
              >
                {ref}
              </motion.div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link href="/referanslar">
              <Button
                variant="ghost"
                className="group text-sm font-bold text-[#8B1A1A] hover:bg-transparent"
              >
                Tüm Referanslar
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ──────────────────────────────── */}
      <section className="border-t border-gray-200 bg-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-3 text-xs font-bold tracking-widest text-[#8B1A1A]">
            PROJENİZİ DEĞERLENDİRELİM
          </div>

          <h2 className="mb-4 text-3xl font-black leading-tight text-gray-900 md:text-4xl">
            Bizimle İletişime Geçin
          </h2>

          <p className="mx-auto mb-8 max-w-xl text-sm leading-relaxed text-gray-500">
            Proje ihtiyaçlarınız ve teknik sorularınız için uzman ekibimiz
            hazır. Hemen bir teklif talep edin.
          </p>

          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/teklif">
              <Button
                size="lg"
                className="h-12 rounded-sm border-none bg-[#8B1A1A] px-8 font-bold text-white hover:bg-[#A52020]"
              >
                TEKLİF FORMU
              </Button>
            </Link>

            <a href="tel:05411290102">
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-sm border-gray-300 px-8 font-bold text-gray-800 hover:bg-gray-50"
              >
                <Phone className="mr-2 h-4 w-4" />
                0541 129 01 02
              </Button>
            </a>

            <a
              href="https://wa.me/905411290102?text=Merhaba%2C%20ZOMAK%27tan%20vin%C3%A7%2Fplatform%20hizmeti%20i%C3%A7in%20teklif%20almak%20istiyorum."
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                variant="outline"
                className="h-12 rounded-sm border-gray-300 px-8 font-bold text-gray-800 hover:bg-gray-50"
              >
                <MessageCircle className="mr-2 h-4 w-4 text-green-600" />
                WhatsApp
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
