import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getModelBySlugs } from "@/data/products";
import craneImg from "@assets/e8d0929a-4828-4358-80ce-dc6d91d4660f_1775312450764.jpeg";
import truckImg from "@assets/8c2a8adc-d4f4-4d87-abe2-5b692886a23b_1775312450763.jpeg";

const modelImages: Record<string, string> = {
  "zv-030": craneImg as unknown as string,
  "zv-060": craneImg as unknown as string,
  "zv-105": craneImg as unknown as string,
  "zv-150": craneImg as unknown as string,
  "zv-225": craneImg as unknown as string,
  "zv-300": craneImg as unknown as string,
  "zk-a25": truckImg as unknown as string,
  "zk-g100": truckImg as unknown as string,
  "zk-g300": truckImg as unknown as string,
  "zk-s15": truckImg as unknown as string,
  "zk-s25": truckImg as unknown as string,
};

export default function UrunModelDetay() {
  const [, params] = useRoute("/urunler/:productSlug/:modelSlug");
  const productSlug = params?.productSlug ?? "";
  const modelSlug = params?.modelSlug ?? "";

  const result = getModelBySlugs(productSlug, modelSlug);

  if (!result) {
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

  const { product, model } = result;

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-200 bg-gray-50 py-3">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/">
              <span className="cursor-pointer hover:text-[#8B1A1A]">
                Ana Sayfa
              </span>
            </Link>
            <span>/</span>
            <Link href="/urunler">
              <span className="cursor-pointer hover:text-[#8B1A1A]">
                Ürünler
              </span>
            </Link>
            <span>/</span>
            <Link href={`/urunler/${product.slug}`}>
              <span className="cursor-pointer hover:text-[#8B1A1A]">
                {product.title}
              </span>
            </Link>
            <span>/</span>
            <span className="font-medium text-gray-900">{model.code}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14 md:px-8">
        <Link href={`/urunler/${product.slug}`}>
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
              <img
                src={modelImages[model.slug] || craneImg}
                alt={model.title}
                className="max-h-[420px] w-auto max-w-full object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.16)]"
              />
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
              {model.code}
            </h1>

            <p className="mb-3 text-lg font-bold text-gray-800">
              {product.title}
            </p>

            <p className="mb-5 border-l-2 border-[#8B1A1A] pl-4 text-sm font-medium italic text-gray-500">
              {model.shortDesc}
            </p>

            <p className="mb-7 text-sm leading-relaxed text-gray-700">
              {model.description}
            </p>

            {model.specs && model.specs.length > 0 && (
              <div className="mb-8 rounded-[20px] border border-gray-200 bg-gray-50 p-5">
                <h3 className="mb-4 text-xs font-black tracking-widest text-gray-500">
                  MODEL BİLGİLERİ
                </h3>
                <div className="divide-y divide-gray-100">
                  {model.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="flex justify-between py-2.5 text-sm"
                    >
                      <span className="font-medium text-gray-500">
                        {spec.label}
                      </span>
                      <span className="font-bold text-gray-900">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
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
      </div>
    </div>
  );
}
