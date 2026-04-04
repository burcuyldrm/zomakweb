import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight, ArrowRight, ShieldCheck, Wrench, Globe2, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetFeaturedProducts, useGetStats, useListNews } from "@workspace/api-client-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function Home() {
  const { data: featuredProducts } = useGetFeaturedProducts();
  const { data: stats } = useGetStats();
  const { data: news } = useListNews({ limit: 3, status: "published" });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-[#0f172a]">
        <Carousel className="w-full h-full" opts={{ loop: true }}>
          <CarouselContent className="h-full">
            {[
              {
                image: "/images/hero-1.png",
                title: "POWERING THE FUTURE OF CONSTRUCTION",
                subtitle: "Advanced lifting solutions for the world's most demanding projects. Engineered for precision, built for strength.",
              },
              {
                image: "/images/hero-2.png",
                title: "ENGINEERED FOR EXTREMES",
                subtitle: "Our tower cranes deliver uncompromising performance in the toughest conditions.",
              }
            ].map((slide, idx) => (
              <CarouselItem key={idx} className="h-full relative">
                <div className="absolute inset-0">
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover object-center opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/50 to-transparent"></div>
                </div>
                <div className="container mx-auto px-4 h-full flex flex-col justify-center relative z-10">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="max-w-3xl"
                  >
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary text-primary mb-6">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                      <span className="text-sm font-bold tracking-wider">INDUSTRY LEADER</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight tracking-tighter">
                      {slide.title}
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl font-light">
                      {slide.subtitle}
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <Button size="lg" className="h-14 px-8 text-lg font-bold">
                        VIEW PRODUCTS
                      </Button>
                      <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-bold border-white text-white hover:bg-white hover:text-black">
                        COMPANY PROFILE
                      </Button>
                    </div>
                  </motion.div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-12 right-12 flex gap-4">
            <CarouselPrevious className="static translate-y-0 w-12 h-12 bg-white/10 hover:bg-primary border-none text-white rounded-none" />
            <CarouselNext className="static translate-y-0 w-12 h-12 bg-white/10 hover:bg-primary border-none text-white rounded-none" />
          </div>
        </Carousel>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "YEARS EXPERIENCE", value: stats?.yearsOfExperience || 45, suffix: "+" },
              { label: "PRODUCTS DELIVERED", value: stats?.productsDelivered || 12500, suffix: "+" },
              { label: "COUNTRIES SERVED", value: stats?.countriesServed || 85, suffix: "" },
              { label: "CERTIFICATIONS", value: stats?.certifications || 12, suffix: "" },
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-4xl md:text-6xl font-black text-primary mb-2 group-hover:scale-110 transition-transform">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm font-bold tracking-widest text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-sm font-bold text-primary tracking-widest mb-2">OUR FLEET</h2>
              <h3 className="text-4xl font-black uppercase tracking-tight">Featured Equipment</h3>
            </div>
            <Link href="/products">
              <Button variant="link" className="group font-bold">
                VIEW ALL <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts?.map((product) => (
              <div key={product.id} className="group bg-card border border-border overflow-hidden hover:border-primary transition-colors">
                <div className="aspect-[4/3] bg-muted relative overflow-hidden">
                  <img 
                    src={product.coverImage || "/images/mobile-crane.png"} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 font-bold text-sm">
                    {product.capacity}
                  </div>
                </div>
                <div className="p-6">
                  <div className="text-xs font-bold text-muted-foreground mb-2 uppercase tracking-wider">{product.categoryName}</div>
                  <h4 className="text-xl font-bold mb-3">{product.name}</h4>
                  <p className="text-muted-foreground text-sm line-clamp-2 mb-6">{product.shortDescription}</p>
                  <Link href={`/products/${product.slug}`}>
                    <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all">
                      VIEW DETAILS
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services/Trust Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <img src="/images/corporate.png" alt="R&D Engineering" className="w-full aspect-[4/3] object-cover rounded-sm" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-primary tracking-widest mb-2">WHY CHOOSE US</h2>
              <h3 className="text-4xl font-black uppercase tracking-tight mb-6">Uncompromising Quality & Support</h3>
              <p className="text-lg text-muted-foreground mb-10">
                We don't just sell equipment; we provide end-to-end lifting solutions. Our commitment to excellence extends far beyond the manufacturing floor.
              </p>

              <div className="space-y-6">
                {[
                  { icon: ShieldCheck, title: "Certified Manufacturing", desc: "All equipment built to exceed global safety standards (ISO 9001, CE, TUV)." },
                  { icon: Wrench, title: "24/7 Global Support", desc: "Expert technicians ready to deploy worldwide for maintenance and repair." },
                  { icon: Globe2, title: "International Dealer Network", desc: "Local presence in over 85 countries ensuring rapid parts delivery." },
                  { icon: Truck, title: "Logistics & Assembly", desc: "Complete delivery, erection, and operator training services included." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">{item.title}</h4>
                      <p className="text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* News Preview */}
      <section className="py-24 bg-[#0f172a] text-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-sm font-bold text-primary tracking-widest mb-2">LATEST UPDATES</h2>
              <h3 className="text-4xl font-black uppercase tracking-tight">Corporate News</h3>
            </div>
            <Link href="/media">
              <Button variant="link" className="group font-bold text-white hover:text-primary">
                ALL NEWS <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news?.map((item) => (
              <div key={item.id} className="group cursor-pointer">
                <div className="aspect-[16/9] overflow-hidden mb-4 rounded-sm">
                  <img 
                    src={item.image || "/images/news-1.png"} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-sm text-primary font-bold mb-2">
                  {new Date(item.date).toLocaleDateString()}
                </div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{item.title}</h4>
                <p className="text-gray-400 text-sm line-clamp-2">{item.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
