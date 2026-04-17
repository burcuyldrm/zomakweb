import { useMemo, useState } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/data/products";
import craneImg from "@assets/e8d0929a-4828-4358-80ce-dc6d91d4660f_1775312450764.jpeg";
import truckImg from "@assets/8c2a8adc-d4f4-4d87-abe2-5b692886a23b_1775312450763.jpeg";

const productImages: Record<string, string> = {
  "mobil-katlanir-vinc": craneImg as unknown as string,
  "hidrolik-gozluklu-kurtarici": truckImg as unknown as string,
  "hidrolik-kurtarici": truckImg as unknown as string,
  "ozel-hidrolik-makineler":
    "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=900&q=80",
  "sepetli-platform":
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80",
};

export default function UrunDetay() {
  const [, params] = useRoute("/urunler/:slug");
  const slug = params?.slug ?? "";
  const product = getProductBySlug(slug);

  const [search, setSearch] = useState("");
  const [selectedPrefix, setSelectedPrefix] = useState("tum");

  if (!product) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-2xl font-black uppercase">
          Kategori Bulunamadı
        </h1>
        <Link href="/urunler">
          <Button className="rounded-sm border-none bg-[#8B1A1A] font-bold text-white">
            Ürünlere Dön
          </Button>
        </Link>
      </div>
    );
  }

  const prefixes = Array.from(
    new Set(
      product.models.map((model) => {
        if (model.code.startsWith("ZV")) return "ZV";
        if (model.code.startsWith("ZGK")) return "ZGK";
        if (model.code.startsWith("ZK")) return "ZK";
        if (model.code.startsWith("ZP")) return "ZP";
        return "Diger";
      }),
    ),
  );

  const filteredModels = useMemo(() => {
    return product.models.filter((model) => {
      const matchSearch =
        model.code.toLowerCase().includes(search.toLowerCase()) ||
        model.title.toLowerCase().includes(search.toLowerCase()) ||
        model.shortDesc.toLowerCase().includes(search.toLowerCase());

      const modelPrefix = model.code.startsWith("ZV")
        ? "ZV"
        : model.code.startsWith("ZGK")
          ? "ZGK"
          : model.code.startsWith("ZK")
            ? "ZK"
            : model.code.startsWith("ZP")
              ? "ZP"
              : "Diger";

      const matchPrefix =
        selectedPrefix === "tum" ? true : modelPrefix === selectedPrefix;

      return matchSearch && matchPrefix;
    });
  }, [product.models, search, selectedPrefix]);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden border-b border-gray-200 bg-[#111111]">
        <div className="absolute inset-0">
          <img
            src={productImages[product.slug]}
            alt={product.title}
            className="h-full w-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 container mx-auto px-4 py-14 md:px-8 md:py-16">
          <div className="mb-3 flex items-center gap-2 text-xs text-white/70">
            <Link href="/">
              <span className="cursor-pointer hover:text-white">Ana Sayfa</span>
            </Link>
            <span>/</span>
            <Link href="/urunler">
              <span className="cursor-pointer hover:text-white">Ürünler</span>
            </Link>
            <span>/</span>
            <span className="font-medium text-white">{product.title}</span>
          </div>

          <h1 className="text-4xl font-black text-white md:text-5xl">
            {product.title}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
            {product.description}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:px-8">
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

        <div className="flex flex-col gap-8 lg:flex-row">
          {/* SOL FİLTRE */}
          <aside className="w-full lg:w-[320px] lg:min-w-[320px]">
            <div className="rounded-[24px] border border-gray-200 bg-[#f3f3f3] p-6 lg:sticky lg:top-6">
              <div className="mb-6">
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8B1A1A]">
                  Filtreler
                </div>
                <h2 className="mt-2 text-2xl font-black text-gray-900">
                  Model Seç
                </h2>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                  Kategori
                </label>
                <div className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700">
                  {product.title}
                </div>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                  Model Ara
                </label>
                <div className="flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-3">
                  <Search className="h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Örn. ZV-060"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-transparent text-sm text-gray-700 outline-none"
                  />
                </div>
              </div>

              {prefixes.length > 0 && (
                <div className="mb-2">
                  <div className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                    Seri
                  </div>

                  <div className="space-y-2">
                    <button
                      onClick={() => setSelectedPrefix("tum")}
                      className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                        selectedPrefix === "tum"
                          ? "border-[#8B1A1A] bg-[#8B1A1A] text-white"
                          : "border-gray-300 bg-white text-gray-700 hover:border-[#8B1A1A]"
                      }`}
                    >
                      <span>Tümü</span>
                      <span>{product.models.length}</span>
                    </button>

                    {prefixes.map((prefix) => {
                      const count = product.models.filter((model) => {
                        if (prefix === "ZV") return model.code.startsWith("ZV");
                        if (prefix === "ZGK")
                          return model.code.startsWith("ZGK");
                        if (prefix === "ZK") return model.code.startsWith("ZK");
                        if (prefix === "ZP") return model.code.startsWith("ZP");
                        return false;
                      }).length;

                      return (
                        <button
                          key={prefix}
                          onClick={() => setSelectedPrefix(prefix)}
                          className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                            selectedPrefix === prefix
                              ? "border-[#8B1A1A] bg-[#8B1A1A] text-white"
                              : "border-gray-300 bg-white text-gray-700 hover:border-[#8B1A1A]"
                          }`}
                        >
                          <span>{prefix}</span>
                          <span>{count}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* SAĞ ÜRÜNLER */}
          <section className="min-w-0 flex-1">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8B1A1A]">
                  Model Listesi
                </div>
                <h2 className="mt-2 text-3xl font-black text-gray-900">
                  {product.title} Modelleri
                </h2>
              </div>

              <div className="text-sm font-medium text-gray-500">
                Toplam{" "}
                <span className="font-bold text-gray-900">
                  {filteredModels.length}
                </span>{" "}
                model
              </div>
            </div>

            {filteredModels.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {filteredModels.map((model, i) => (
                  <motion.div
                    key={model.slug}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                  >
                    <Link href={`/urunler/${product.slug}/${model.slug}`}>
                      <article className="group relative min-h-[250px] cursor-pointer overflow-hidden rounded-[26px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
                        <div
                          className="absolute inset-0 bg-[#f3f3f3] transition-colors duration-300 group-hover:bg-[#ececec]"
                          style={{
                            clipPath:
                              "polygon(0 0, 72% 0, 100% 22%, 100% 100%, 0 100%)",
                          }}
                        />

                        <div className="relative z-10 flex h-full flex-col px-6 py-6">
                          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400">
                            Model
                          </div>

                          <h3 className="text-3xl font-black text-[#1f1f1f] transition-colors duration-300 group-hover:text-[#8B1A1A]">
                            {model.code}
                          </h3>

                          <div className="mt-3 h-[5px] w-10 rounded-full bg-[#B3201D]" />

                          <p className="mt-4 text-sm leading-relaxed text-gray-500">
                            {model.shortDesc}
                          </p>

                          <div className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-extrabold uppercase tracking-[0.12em] text-[#8B1A1A] transition-all duration-300 group-hover:gap-3">
                            Detayı Aç
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="rounded-[24px] border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
                <h3 className="text-lg font-bold text-gray-800">
                  Sonuç bulunamadı
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  Arama veya filtre seçimini değiştirerek tekrar deneyin.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
