import { useEffect, useState, useCallback } from "react";
import { Link, useRoute } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, MessageCircle, Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

interface ProductModel {
  id: number;
  name: string;
  slug: string;
  categoryId: number;
  categoryName: string;
  coverImage: string;
  gallery: string[];
  specs: { key: string; value: string }[];
  description: string;
  usageAreas: string[];
  pdfUrl: string | null;
  capacity: string;
  status: string;
}

function parseGeneralSpecs(description: string): { key: string; value: string }[] {
  try {
    const parsed = JSON.parse(description);
    if (Array.isArray(parsed) && parsed.every(p => "key" in p)) return parsed;
  } catch { /* ignore */ }
  return [];
}

function isImageUrl(s: string) {
  return /\.(png|jpg|jpeg|gif|webp|svg)(\?|$)/i.test(s);
}

export default function UrunModelDetay() {
  const [, params] = useRoute("/urunler/:productSlug/:modelSlug");
  const productSlug = params?.productSlug ?? "";
  const modelSlug = params?.modelSlug ?? "";

  const [model, setModel] = useState<ProductModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [activeImg, setActiveImg] = useState<string | null>(null);

  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
  }, []);

  useEffect(() => {
    if (!modelSlug) return;
    setLoading(true);
    setNotFound(false);
    fetch(`/api/products/${modelSlug}`)
      .then(r => { if (r.status === 404) { setNotFound(true); return null; } return r.json(); })
      .then(data => { if (data) { setModel(data); setActiveImg(data.coverImage || null); } })
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
          <Button className="rounded-sm border-none bg-[#8B1A1A] font-bold text-white">Ürünlere Dön</Button>
        </Link>
      </div>
    );
  }

  const generalSpecs = parseGeneralSpecs(model.description);
  const diagrams = (model.usageAreas ?? []).filter(isImageUrl);
  const allImages = [model.coverImage, ...model.gallery].filter(Boolean);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="border-b border-gray-200 bg-gray-50 py-3">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/"><span className="cursor-pointer hover:text-[#8B1A1A]">Ana Sayfa</span></Link>
            <span>/</span>
            <Link href="/urunler"><span className="cursor-pointer hover:text-[#8B1A1A]">Ürünler</span></Link>
            <span>/</span>
            <Link href={`/urunler/${productSlug}`}><span className="cursor-pointer hover:text-[#8B1A1A]">{model.categoryName}</span></Link>
            <span>/</span>
            <span className="font-medium text-gray-900">{model.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14 md:px-8">
        <Link href={`/urunler/${productSlug}`}>
          <Button variant="ghost" size="sm" className="-ml-2 mb-8 rounded-sm text-xs font-bold uppercase text-gray-500 hover:text-[#8B1A1A]">
            <ArrowLeft className="mr-2 h-4 w-4" /> Model Listesine Dön
          </Button>
        </Link>

        {/* Ana bölüm: görsel + başlık/özellikler */}
        <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-2">

          {/* Sol: fotoğraf + thumbnail strip */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="overflow-hidden rounded-[28px] bg-[#f3f3f3] p-8 shadow-sm">
              <div className="flex min-h-[380px] items-center justify-center">
                {(activeImg || model.coverImage) ? (
                  <img
                    src={activeImg || model.coverImage}
                    alt={model.name}
                    className="max-h-[380px] w-auto max-w-full object-contain drop-shadow-[0_14px_18px_rgba(0,0,0,0.16)]"
                  />
                ) : (
                  <div className="flex h-[380px] w-full items-center justify-center rounded-xl bg-gray-200 text-gray-400">Görsel Yok</div>
                )}
              </div>
            </div>

            {/* Thumbnail strip */}
            {allImages.length > 1 && (
              <div className="mt-3 flex gap-2 flex-wrap">
                {allImages.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImg === img ? "border-[#8B1A1A]" : "border-transparent hover:border-gray-300"}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover bg-gray-100" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          {/* Sağ: başlık + özellik tabloları */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-2 text-[10px] font-bold tracking-widest text-[#8B1A1A]">MODEL DETAYI</div>
            <h1 className="mb-2 text-3xl font-black leading-tight text-gray-900 md:text-4xl">{model.name}</h1>
            <p className="mb-6 text-base font-semibold text-gray-500">{model.categoryName}</p>

            {/* Teknik Özellikler */}
            {model.specs && model.specs.length > 0 && (
              <div className="mb-7">
                <h3 className="mb-3 text-[11px] font-black tracking-widest text-gray-400 uppercase">Teknik Özellikler</h3>
                <div className="rounded-[16px] border border-gray-200 bg-gray-50 divide-y divide-gray-100 overflow-hidden">
                  {model.specs.map((spec, i) => (
                    <div key={i} className="flex justify-between px-5 py-3 text-sm">
                      <span className="font-medium text-gray-500">{spec.key}</span>
                      <span className="font-bold text-gray-900 text-right ml-4">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Genel Özellikler */}
            {generalSpecs.length > 0 && (
              <div className="mb-7">
                <h3 className="mb-3 text-[11px] font-black tracking-widest text-gray-400 uppercase">Genel Özellikler</h3>
                <div className="rounded-[16px] border border-gray-200 bg-gray-50 divide-y divide-gray-100 overflow-hidden">
                  {generalSpecs.map((spec, i) => (
                    <div key={i} className="flex justify-between px-5 py-3 text-sm">
                      <span className="font-medium text-gray-500">{spec.key}</span>
                      <span className="font-bold text-gray-900 text-right ml-4">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* İletişim butonları */}
            <div className="flex flex-wrap gap-3 mt-6">
              <Link href="/teklif">
                <Button className="h-11 rounded-sm border-none bg-[#8B1A1A] px-7 font-bold uppercase text-white hover:bg-[#A52020]">
                  Teklif Al
                </Button>
              </Link>
              <a href="https://wa.me/905411290102?text=Merhaba%2C%20ZOMAK%20Makine'den%20teklif%20almak%20istiyorum." target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="h-11 rounded-sm border-gray-300 px-7 font-bold uppercase text-gray-800 hover:bg-gray-50">
                  <MessageCircle className="mr-2 h-4 w-4 text-green-600" /> WhatsApp
                </Button>
              </a>
              <a href="tel:05411290102">
                <Button variant="outline" className="h-11 rounded-sm border-gray-300 font-bold uppercase text-gray-800 hover:bg-gray-50">
                  <Phone className="mr-2 h-4 w-4" /> Ara
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        {/* ── Diyagram + Galeri yan yana ── */}
        {(diagrams.length > 0 || model.pdfUrl || (model.gallery && model.gallery.length > 0)) && (
          <div className="mt-16 border-t border-gray-100 pt-12">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

              {/* Sol: Teknik Diyagram */}
              {(model.pdfUrl || diagrams.length > 0) && (
                <div>
                  <h2 className="mb-6 text-xl font-black text-gray-900">Teknik Diyagram</h2>

                  {model.pdfUrl && (
                    <div className="rounded-[20px] border border-gray-200 bg-[#f3f3f3] overflow-hidden flex flex-col items-center p-4">
                      <Document
                        file={model.pdfUrl}
                        onLoadSuccess={onDocumentLoadSuccess}
                        loading={<div className="py-12 text-sm text-gray-400">PDF yükleniyor...</div>}
                        error={<div className="py-12 text-sm text-red-500">PDF yüklenemedi.</div>}
                      >
                        <Page
                          pageNumber={pageNumber}
                          width={Math.min(440, window.innerWidth / 2 - 80)}
                          renderAnnotationLayer={false}
                          renderTextLayer={false}
                          className="shadow-md rounded"
                        />
                      </Document>

                      {numPages > 1 && (
                        <div className="flex items-center gap-4 mt-4">
                          <button
                            disabled={pageNumber <= 1}
                            onClick={() => setPageNumber(p => p - 1)}
                            className="p-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-30 transition"
                          >
                            <ChevronLeft className="w-4 h-4 text-gray-700" />
                          </button>
                          <span className="text-sm text-gray-600 font-medium">
                            {pageNumber} / {numPages}
                          </span>
                          <button
                            disabled={pageNumber >= numPages}
                            onClick={() => setPageNumber(p => p + 1)}
                            className="p-1.5 rounded-full border border-gray-300 bg-white hover:bg-gray-100 disabled:opacity-30 transition"
                          >
                            <ChevronRight className="w-4 h-4 text-gray-700" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {diagrams.length > 0 && (
                    <div className="mt-4 flex flex-col gap-4">
                      {diagrams.map((img, i) => (
                        <div key={i} className="rounded-[20px] border border-gray-200 bg-[#f3f3f3] p-4 flex items-center justify-center">
                          <img src={img} alt={`Diyagram ${i + 1}`} className="max-h-[340px] w-auto max-w-full object-contain" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Sağ: Ürün Galerisi */}
              {model.gallery && model.gallery.length > 0 && (
                <div>
                  <h2 className="mb-6 text-xl font-black text-gray-900">Ürün Galerisi</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {model.gallery.map((img, i) => (
                      <div key={i} className="overflow-hidden rounded-[16px] bg-[#f3f3f3] cursor-pointer" onClick={() => setActiveImg(img)}>
                        <img src={img} alt={`${model.name} - ${i + 1}`} className="h-[150px] w-full object-cover transition-transform duration-300 hover:scale-105" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
