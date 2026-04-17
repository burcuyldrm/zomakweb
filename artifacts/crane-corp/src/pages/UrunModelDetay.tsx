import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface ProductModel {
  id: number;
  name: string;
  slug: string;
  categoryId: number;
  categoryName: string;
  shortDescription: string;
  description: string;
  coverImage: string;
  gallery: string[];
  specs: { key: string; value: string }[];
  capacity: string;
  usageAreas: string[];
  optionalEquipment: string[];
  status: string;
}

export default function UrunModelDetay() {
  const [, params] = useRoute("/urunler/:productSlug/:modelSlug");
  const productSlug = params?.productSlug ?? "";
  const modelSlug = params?.modelSlug ?? "";

  const [model, setModel] = useState<ProductModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!modelSlug) return;
    setLoading(true);
    setNotFound(false);

    fetch(`/api/products/${modelSlug}`)
      .then((r) => {
        if (r.status === 404) { setNotFound(true); return null; }
        return r.json();
      })
      .then((data) => { if (data) setModel(data); })
      .finally(() => setLoading(false));
  }, [modelSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="container mx-auto px-4 py-14 md:px-8">
          <div className="grid grid-cols-1 gap-14 lg:grid-cols-2">
            <Skeleton className="h-[480px] rounded-[28px]" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-12 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (notFound || !model) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-2xl font-black uppercase">Model Bulunamadı</h1>
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
      <div className="border-b border-gray-200 bg-gray-50 py-3">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/">
              <span className="cursor-pointer hover:text-[#8B1A1A]">Ana Sayfa</span>
            </Link>
            <span>/</span>
            <Link href="/urunler">
              <span className="cursor-pointer hover:text-[#8B1A1A]">Ürünler</span>
            </Link>
            <span>/</span>
            <Link href={`/urunler/${productSlug}`}>
              <span className="cursor-pointer hover:text-[#8B1A1A]">{model.categoryName}</span>
            </Link>
            <span>/</span>
            <span className="font-medium text-gray-900">{model.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14 md:px-8">
        <Link href={`/urunler/${productSlug}`}>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-2 mb-8 rounded-sm text-xs font-bold uppercase text-gray-500 hover:text-[#8B1A1A]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Model Listesine Dön
          </Button>
        </Link>

        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden rounded-[28px] bg-[#f3f3f3] p-8 shadow-sm"
          >
            <div className="flex min-h-[420px] items-center justify-center">
              {model.coverImage ? (
                <img
                  src={model.coverImage}
                  alt={model.name}
                  className="max-h-[420px] w-auto max-w-full object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.16)]"
                />
              ) : (
                <div className="flex h-[420px] w-full items-center justify-center rounded-xl bg-gray-200 text-gray-400">
                  Görsel Yok
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-2 text-[10px] font-bold tracking-widest text-[#8B1A1A]">
              MODEL DETAYI
            </div>

            <h1 className="mb-3 text-3xl font-black leading-tight text-gray-900 md:text-4xl">
              {model.name}
            </h1>

            <p className="mb-3 text-lg font-bold text-gray-800">{model.categoryName}</p>

            <p className="mb-5 border-l-2 border-[#8B1A1A] pl-4 text-sm font-medium italic text-gray-500">
              {model.shortDescription}
            </p>

            <p className="mb-7 text-sm leading-relaxed text-gray-700">{model.description}</p>

            {model.specs && model.specs.length > 0 && (
              <div className="mb-8 rounded-[20px] border border-gray-200 bg-gray-50 p-5">
                <h3 className="mb-4 text-xs font-black tracking-widest text-gray-500">
                  MODEL BİLGİLERİ
                </h3>
                <div className="divide-y divide-gray-100">
                  {model.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between py-2.5 text-sm">
                      <span className="font-medium text-gray-500">{spec.key}</span>
                      <span className="font-bold text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {model.usageAreas && model.usageAreas.length > 0 && (
              <div className="mb-8">
                <h3 className="mb-3 text-xs font-black tracking-widest text-gray-500">
                  KULLANIM ALANLARI
                </h3>
                <ul className="space-y-2">
                  {model.usageAreas.map((area, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#8B1A1A]" />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-wrap gap-3">
              <Link href="/teklif">
                <Button className="h-11 rounded-sm border-none bg-[#8B1A1A] px-7 font-bold uppercase text-white hover:bg-[#A52020]">
                  Teklif Al
                </Button>
              </Link>

              <a
                href="https://wa.me/905411290102?text=Merhaba%2C%20ZOMAK%27tan%20bu%20model%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="h-11 rounded-sm border-gray-300 px-7 font-bold uppercase text-gray-800 hover:bg-gray-50"
                >
                  <MessageCircle className="mr-2 h-4 w-4 text-green-600" />
                  WhatsApp
                </Button>
              </a>

              <a href="tel:05411290102">
                <Button
                  variant="outline"
                  className="h-11 rounded-sm border-gray-300 font-bold uppercase text-gray-800 hover:bg-gray-50"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  Ara
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        {model.gallery && model.gallery.length > 0 && (
          <div className="mt-14">
            <h2 className="mb-6 text-xl font-black text-gray-900">Ürün Galerisi</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {model.gallery.map((img, i) => (
                <div key={i} className="overflow-hidden rounded-[16px] bg-[#f3f3f3]">
                  <img
                    src={img}
                    alt={`${model.name} - ${i + 1}`}
                    className="h-[160px] w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
