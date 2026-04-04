import { useRoute, Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getProductBySlug, products } from "@/data/products";
import craneImg from "@assets/e8d0929a-4828-4358-80ce-dc6d91d4660f_1775312450764.jpeg";
import truckImg from "@assets/8c2a8adc-d4f4-4d87-abe2-5b692886a23b_1775312450763.jpeg";

const productImages: Record<string, string> = {
  "mobil-katlanir-vinc": craneImg as unknown as string,
  "hidrolik-gozluklu-kurtarici": truckImg as unknown as string,
  "hidrolik-kurtarici": truckImg as unknown as string,
  "ozel-hidrolik-makineler": "https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=900&q=80",
  "sepetli-platform": "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80",
};

export default function UrunDetay() {
  const [, params] = useRoute("/urunler/:slug");
  const slug = params?.slug ?? "";
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-black uppercase mb-4">Ürün Bulunamadı</h1>
        <Link href="/urunler">
          <Button className="bg-[#8B1A1A] text-white rounded-sm border-none font-bold">
            Ürünlere Dön
          </Button>
        </Link>
      </div>
    );
  }

  const otherProducts = products.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 py-3">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/"><span className="hover:text-[#8B1A1A] cursor-pointer">Ana Sayfa</span></Link>
            <span>/</span>
            <Link href="/urunler"><span className="hover:text-[#8B1A1A] cursor-pointer">Ürünler</span></Link>
            <span>/</span>
            <span className="text-gray-900 font-medium">{product.title}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 md:px-8 py-14">
        <Link href="/urunler">
          <Button variant="ghost" size="sm" className="mb-8 text-gray-500 hover:text-[#8B1A1A] font-bold uppercase text-xs rounded-sm -ml-2">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Tüm Ürünler
          </Button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-sm overflow-hidden shadow-md"
          >
            <img
              src={productImages[product.slug]}
              alt={product.title}
              className="w-full h-auto object-cover"
              style={{ maxHeight: "480px", objectFit: "cover" }}
            />
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-[10px] font-bold text-[#8B1A1A] tracking-widest mb-2">ÜRÜN DETAYI</div>
            <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 leading-tight">{product.title}</h1>
            <p className="text-gray-500 font-medium text-sm italic mb-5 border-l-2 border-[#8B1A1A] pl-4">{product.shortDesc}</p>
            <p className="text-gray-700 leading-relaxed text-sm mb-7">{product.description}</p>

            {/* Usage areas */}
            <div className="mb-7">
              <h3 className="font-black text-sm tracking-wide mb-3 text-gray-900">KULLANIM ALANLARI</h3>
              <ul className="space-y-2">
                {product.usage.map((u, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <CheckCircle className="w-4 h-4 text-[#8B1A1A] flex-shrink-0 mt-0.5" />
                    {u}
                  </li>
                ))}
              </ul>
            </div>

            {/* Specs */}
            {product.specs && product.specs.length > 0 && (
              <div className="mb-8 bg-gray-50 border border-gray-200 rounded-sm p-5">
                <h3 className="font-black text-xs tracking-widest mb-4 text-gray-500">TEKNİK BİLGİLER</h3>
                <div className="divide-y divide-gray-100">
                  {product.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between py-2.5 text-sm">
                      <span className="text-gray-500 font-medium">{spec.label}</span>
                      <span className="font-bold text-gray-900">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <Link href="/teklif">
                <Button className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold rounded-sm border-none uppercase px-7 h-11">
                  Teklif Al <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <a
                href="https://wa.me/905411290102?text=Merhaba%2C%20ZOMAK%27tan%20vin%C3%A7%2Fplatform%20hizmeti%20i%C3%A7in%20teklif%20almak%20istiyorum."
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="border-gray-300 text-gray-800 hover:bg-gray-50 font-bold rounded-sm uppercase px-7 h-11">
                  <MessageCircle className="mr-2 w-4 h-4 text-green-600" />
                  WhatsApp
                </Button>
              </a>
              <a href="tel:05411290102">
                <Button variant="outline" className="border-gray-300 text-gray-800 hover:bg-gray-50 font-bold rounded-sm uppercase h-11">
                  <Phone className="mr-2 w-4 h-4" />
                  Ara
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Other products */}
        {otherProducts.length > 0 && (
          <div className="mt-20 pt-12 border-t border-gray-200">
            <h2 className="text-xl font-black text-gray-900 mb-6">DİĞER ÜRÜNLERİMİZ</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {otherProducts.map((p) => (
                <Link key={p.slug} href={`/urunler/${p.slug}`}>
                  <div className="border border-gray-200 rounded-sm p-5 hover:border-[#8B1A1A] transition-colors cursor-pointer group">
                    <h3 className="font-bold text-sm mb-1 text-gray-800 group-hover:text-[#8B1A1A] transition-colors">{p.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{p.shortDesc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
