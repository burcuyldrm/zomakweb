import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { useGetProduct, useListProducts, getGetProductQueryKey, getListProductsQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ChevronLeft, ChevronRight, Download, Phone, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [currentImg, setCurrentImg] = useState(0);

  const { data: product, isLoading } = useGetProduct(slug, {
    query: { enabled: !!slug, queryKey: getGetProductQueryKey(slug) }
  });

  const { data: related } = useListProducts(
    { status: "published" },
    { query: { queryKey: getListProductsQueryKey({ status: "published" }) } }
  );

  const similarProducts = related?.filter(p => p.slug !== slug && p.categoryId === product?.categoryId).slice(0, 3) ?? [];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <Skeleton className="aspect-[4/3]" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-12 w-2/3" />
          <Skeleton className="h-24" />
          <Skeleton className="h-48" />
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <Link href="/products"><Button>Back to Products</Button></Link>
      </div>
    );
  }

  const allImages = [product.coverImage, ...product.gallery.filter(g => g !== product.coverImage)];

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
      <div className="bg-muted/50 border-b border-border py-4">
        <div className="container mx-auto px-4 md:px-8 flex items-center gap-2 text-sm">
          <Link href="/"><span className="text-muted-foreground hover:text-primary cursor-pointer">Home</span></Link>
          <span className="text-muted-foreground">/</span>
          <Link href="/products"><span className="text-muted-foreground hover:text-primary cursor-pointer">Products</span></Link>
          <span className="text-muted-foreground">/</span>
          <span className="font-bold truncate max-w-xs">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Back Button */}
        <Link href="/products">
          <Button variant="ghost" className="mb-8 font-bold" data-testid="button-back-products">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Products
          </Button>
        </Link>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            <div className="aspect-[4/3] bg-muted overflow-hidden mb-4 relative group" data-testid="product-gallery-main">
              <img
                src={allImages[currentImg]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setCurrentImg(prev => (prev - 1 + allImages.length) % allImages.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white hover:bg-primary transition-colors flex items-center justify-center"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setCurrentImg(prev => (prev + 1) % allImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/50 text-white hover:bg-primary transition-colors flex items-center justify-center"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImg(i)}
                    className={cn(
                      "flex-shrink-0 w-20 h-16 overflow-hidden border-2 transition-colors",
                      currentImg === i ? "border-primary" : "border-transparent"
                    )}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <div className="text-xs font-bold text-primary tracking-widest mb-2">{product.categoryName}</div>
            <h1 className="text-4xl font-black tracking-tight mb-3">{product.name}</h1>
            <div className="flex items-center gap-3 mb-6">
              <Badge className="text-base px-4 py-1.5 font-bold rounded-none">{product.capacity}</Badge>
              <Badge variant="outline" className="text-sm rounded-none">
                {product.status === "published" ? "AVAILABLE" : "DRAFT"}
              </Badge>
            </div>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">{product.shortDescription}</p>
            <p className="text-foreground mb-8 leading-relaxed">{product.description}</p>

            <div className="flex flex-wrap gap-4">
              {product.pdfUrl && (
                <a href={product.pdfUrl} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="font-bold rounded-none" data-testid="button-pdf-download">
                    <Download className="w-4 h-4 mr-2" /> DOWNLOAD CATALOG
                  </Button>
                </a>
              )}
              <Link href="/contact">
                <Button className="font-bold rounded-none px-8" data-testid="button-contact-cta">
                  <Phone className="w-4 h-4 mr-2" /> GET A QUOTE
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Technical Specs */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-black uppercase mb-6 flex items-center gap-3">
              <span className="w-8 h-1 bg-primary inline-block" />
              Technical Specifications
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-border" data-testid="table-specs">
                <tbody>
                  {(product.specs as { key: string; value: string }[]).map((spec, i) => (
                    <tr key={i} className={cn("border-b border-border", i % 2 === 0 ? "bg-muted/30" : "bg-background")}>
                      <td className="px-6 py-3 font-bold text-sm w-2/5">{spec.key}</td>
                      <td className="px-6 py-3 text-muted-foreground text-sm">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-8">
            {/* Usage Areas */}
            {product.usageAreas.length > 0 && (
              <div>
                <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-3">
                  <span className="w-6 h-1 bg-primary inline-block" />
                  Usage Areas
                </h3>
                <ul className="space-y-2">
                  {product.usageAreas.map((area, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{area}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Optional Equipment */}
            {product.optionalEquipment.length > 0 && (
              <div>
                <h3 className="text-lg font-black uppercase mb-4 flex items-center gap-3">
                  <span className="w-6 h-1 bg-primary inline-block" />
                  Optional Equipment
                </h3>
                <ul className="space-y-2">
                  {product.optionalEquipment.map((eq, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-muted-foreground">{eq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-black uppercase mb-8 flex items-center gap-3">
              <span className="w-8 h-1 bg-primary inline-block" />
              Similar Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProducts.map((p) => (
                <Link key={p.id} href={`/products/${p.slug}`}>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="group bg-card border border-border overflow-hidden cursor-pointer"
                    data-testid={`card-similar-${p.id}`}
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={p.coverImage} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-4">
                      <div className="text-xs text-primary font-bold tracking-wider mb-1">{p.capacity}</div>
                      <h4 className="font-bold group-hover:text-primary transition-colors">{p.name}</h4>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Contact CTA */}
        <div className="mt-16 bg-[#0f172a] text-white p-12 text-center">
          <h2 className="text-3xl font-black uppercase mb-4">Interested in {product.name}?</h2>
          <p className="text-gray-400 mb-8 text-lg">Our sales engineers are ready to discuss project requirements and provide a detailed quotation.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="font-bold px-8 h-14">REQUEST QUOTATION</Button>
            </Link>
            {product.pdfUrl && (
              <a href={product.pdfUrl} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="font-bold px-8 h-14 border-white text-white hover:bg-white hover:text-black">
                  <Download className="w-4 h-4 mr-2" /> CATALOG PDF
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
