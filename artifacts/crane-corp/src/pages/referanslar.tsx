import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";

interface Reference {
  id: number;
  companyName: string;
  sector: string;
  project: string;
  location: string;
  year: string;
  logoUrl: string;
}

export default function Referanslar() {
  const { data: references, isLoading } = useQuery<Reference[]>({
    queryKey: ["references"],
    queryFn: () => fetch("/api/references").then((r) => r.json()),
  });

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        label="GÜVEN DUYANLAR"
        title="REFERANSLARIMIZ"
        description="Türkiye'nin önde gelen vinç ve kurtarıcı operatörleriyle iş ortaklığı kuruyoruz."
      />

      <section className="py-20">
        <div className="container mx-auto px-4 md:px-8">
          <p className="text-gray-500 text-sm leading-relaxed mb-14">
            Zomak olarak referans müşterilerimizle yalnızca bir ticari ilişki değil, uzun vadeli ve güvene dayalı bir iş
            ortaklığı kurmaktayız. Teslim ettiğimiz her ekipman, bu ortaklığın somut bir yansımasıdır.
          </p>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-[200px] rounded-[20px]" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {(references ?? []).map((ref, i) => (
                <motion.div
                  key={ref.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="group relative flex flex-col bg-white border border-gray-200 rounded-[20px] overflow-hidden hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)] hover:border-[#8B1A1A]/30 transition-all duration-300"
                >
                  <div
                    className="absolute inset-0 bg-[#f8f8f8] transition-colors duration-300 group-hover:bg-[#fdf5f5]"
                    style={{ clipPath: "polygon(0 0, 75% 0, 100% 18%, 100% 100%, 0 100%)" }}
                  />
                  <div className="relative z-10 flex flex-col h-full p-6">
                    <div className="flex items-center justify-center h-[100px] mb-4 bg-white rounded-xl border border-gray-100 shadow-sm px-4">
                      {ref.logoUrl ? (
                        <img
                          src={ref.logoUrl}
                          alt={ref.companyName}
                          className="max-h-[64px] max-w-full w-auto object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = "none";
                            (e.target as HTMLImageElement).nextElementSibling?.classList.remove("hidden");
                          }}
                        />
                      ) : null}
                      <span
                        className={`text-[#8B1A1A] font-black text-4xl ${ref.logoUrl ? "hidden" : ""}`}
                      >
                        {ref.companyName.charAt(0)}
                      </span>
                    </div>
                    <span className="block h-[4px] w-8 rounded-full bg-[#8B1A1A] mb-3" />
                    <h3 className="text-[18px] font-black text-gray-900 group-hover:text-[#8B1A1A] transition-colors duration-300 mb-1">
                      {ref.companyName}
                    </h3>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#8B1A1A]/70 mb-2">
                      {ref.sector}
                    </p>
                    {ref.project && (
                      <p className="text-xs text-gray-400 mt-auto">
                        {ref.project} · {ref.location} · {ref.year}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-12 text-center"
          >
            <div className="text-xs font-bold text-[#8B1A1A] tracking-widest uppercase mb-2">Büyümeye Devam Ediyoruz</div>
            <h3 className="text-2xl font-black uppercase text-gray-900 mb-3">Referans Listemiz Genişliyor</h3>
            <p className="text-gray-500 text-sm max-w-lg mx-auto mb-6">
              Yeni iş ortaklıkları ve referanslarımız yakında bu sayfaya eklenecektir. Siz de güvenilir
              tedarikçilerimiz arasına katılın.
            </p>
            <Link href="/teklif">
              <Button className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold rounded-sm border-none uppercase">
                Teklif Talebi
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
