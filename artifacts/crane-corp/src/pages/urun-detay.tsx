import { useEffect, useMemo, useState } from "react";
import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

interface ProductModel {
  id: number;
  name: string;
  slug: string;
  categoryId: number;
  shortDescription: string;
  description: string;
  coverImage: string;
  specs: { key: string; value: string }[];
  status: string;
}

export default function UrunDetay() {
  const [, params] = useRoute("/urunler/:slug");
  const slug = params?.slug ?? "";

  const [category, setCategory] = useState<Category | null>(null);
  const [models, setModels] = useState<ProductModel[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [search, setSearch] = useState("");
  const [selectedPrefix, setSelectedPrefix] = useState("tum");

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    setNotFound(false);

    Promise.all([
      fetch(`/api/categories/${slug}`).then((r) => {
        if (r.status === 404) { setNotFound(true); return null; }
        return r.json();
      }),
      fetch(`/api/categories/${slug}/models`).then((r) => r.ok ? r.json() : []),
    ])
      .then(([cat, mods]) => {
        if (cat) setCategory(cat);
        setModels(mods ?? []);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const prefixes = useMemo(
    () =>
      Array.from(
        new Set(
          models.map((m) => {
            if (m.name.startsWith("ZV")) return "ZV";
            if (m.name.startsWith("ZGK")) return "ZGK";
            if (m.name.startsWith("ZK")) return "ZK";
            if (m.name.startsWith("ZP")) return "ZP";
            return "Diğer";
          }),
        ),
      ),
    [models],
  );

  const filteredModels = useMemo(() => {
    return models.filter((m) => {
      const matchSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.shortDescription.toLowerCase().includes(search.toLowerCase());
      if (!matchSearch) return false;
      if (selectedPrefix === "tum") return true;
      return m.name.startsWith(selectedPrefix);
    });
  }, [models, search, selectedPrefix]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Skeleton className="h-[280px] w-full" />
        <div className="container mx-auto px-4 py-12 md:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 mt-16">
            {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-[250px] rounded-[26px]" />)}
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !category) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-2xl font-black uppercase">Kategori Bulunamadı</h1>
        <Link href="/urunler">
          <Button className="rounded-sm border-none bg-[#8B1A1A] font-bold text-white">
            Ürünlere Dön
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="relative overflow-hidden border-b border-gray-200 bg-[#111111]">
        {category.image && (
          <div className="absolute inset-0">
            <img src={category.image} alt={category.name} className="h-full w-full object-cover opacity-25" />
            <div className="absolute inset-0 bg-black/55" />
          </div>
        )}

        <div className="relative z-10 container mx-auto px-4 md:px-8 py-20 md:py-24 flex flex-col justify-center">
          <h1 className="text-4xl font-black text-white md:text-5xl">
            {category.name}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
            {category.description}
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
          <aside className="w-full lg:w-[320px] lg:min-w-[320px]">
            <div className="rounded-[24px] border border-gray-200 bg-[#f3f3f3] p-6 lg:sticky lg:top-6">
              <div className="mb-6">
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8B1A1A]">
                  Filtreler
                </div>
                <h2 className="mt-2 text-2xl font-black text-gray-900">Model Seç</h2>
              </div>

              <div className="mb-6">
                <label className="mb-2 block text-xs font-bold uppercase tracking-[0.14em] text-gray-500">
                  Kategori
                </label>
                <div className="rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm font-semibold text-gray-700">
                  {category.name}
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
                  <div className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-gray-500">Seri</div>
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
                      <span>{models.length}</span>
                    </button>
                    {prefixes.map((prefix) => {
                      const count = models.filter((m) => m.name.startsWith(prefix)).length;
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

          <section className="min-w-0 flex-1">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#8B1A1A]">
                  Model Listesi
                </div>
                <h2 className="mt-2 text-3xl font-black text-gray-900">
                  {category.name} Modelleri
                </h2>
              </div>
              <div className="text-sm font-medium text-gray-500">
                Toplam{" "}
                <span className="font-bold text-gray-900">{filteredModels.length}</span> model
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
                    {category.slug === "ozel-hidrolik-makineler" ? (
                      <article className="group relative min-h-[250px] overflow-hidden rounded-[26px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
                        <div
                          className="absolute inset-0 bg-[#f3f3f3] transition-colors duration-300 group-hover:bg-[#ececec]"
                          style={{ clipPath: "polygon(0 0, 72% 0, 100% 22%, 100% 100%, 0 100%)" }}
                        />
                        <div className="relative z-10 flex h-full flex-col px-6 py-6">
                          {model.coverImage && (
                            <div className="mb-5 flex h-[160px] items-center justify-center">
                              <img
                                src={model.coverImage}
                                alt="Özel Hidrolik Makine"
                                className="max-h-[150px] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                          )}
                          <div className="mt-1 h-[5px] w-10 rounded-full bg-[#B3201D]" />
                          <p className="mt-4 text-sm leading-relaxed text-gray-600">
                            {model.shortDescription}
                          </p>
                        </div>
                      </article>
                    ) : (
                    <Link href={`/urunler/${category.slug}/${model.slug}`}>
                      <article className="group relative min-h-[250px] cursor-pointer overflow-hidden rounded-[26px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_40px_rgba(0,0,0,0.08)]">
                        <div
                          className="absolute inset-0 bg-[#f3f3f3] transition-colors duration-300 group-hover:bg-[#ececec]"
                          style={{ clipPath: "polygon(0 0, 72% 0, 100% 22%, 100% 100%, 0 100%)" }}
                        />
                        <div className="relative z-10 flex h-full flex-col px-6 py-6">
                          {model.coverImage && (
                            <div className="mb-4 flex h-[120px] items-center justify-center">
                              <img
                                src={model.coverImage}
                                alt={model.name}
                                className="max-h-[110px] w-auto max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                          )}
                          <div className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-gray-400">
                            Model
                          </div>
                          <h3 className="text-3xl font-black text-[#1f1f1f] transition-colors duration-300 group-hover:text-[#8B1A1A]">
                            {model.name}
                          </h3>
                          <div className="mt-3 h-[5px] w-10 rounded-full bg-[#B3201D]" />
                          <p className="mt-4 text-sm leading-relaxed text-gray-500">
                            {model.shortDescription}
                          </p>
                          <div className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-extrabold uppercase tracking-[0.12em] text-[#8B1A1A] transition-all duration-300 group-hover:gap-3">
                            Detayı Aç
                            <ArrowRight className="h-4 w-4" />
                          </div>
                        </div>
                      </article>
                    </Link>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="rounded-[24px] border border-dashed border-gray-300 bg-gray-50 px-6 py-12 text-center">
                <h3 className="text-lg font-bold text-gray-800">Sonuç bulunamadı</h3>
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
