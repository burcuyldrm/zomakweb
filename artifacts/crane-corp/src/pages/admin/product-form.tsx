import { useParams, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRef, useState, useEffect } from "react";
import {
  useGetProduct,
  useCreateProduct,
  useUpdateProduct,
  useListCategories,
  getGetProductQueryKey,
  getListProductsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, X, Plus, FileText, ExternalLink } from "lucide-react";
import { Link } from "wouter";

const productSchema = z.object({
  name: z.string().min(1, "Ürün adı zorunludur"),
  slug: z.string().min(1).regex(/^[a-z0-9-]+$/, "Sadece küçük harf, rakam ve tire"),
  categoryId: z.coerce.number().min(1, "Kategori seçiniz"),
  capacity: z.string().default(""),
  shortDescription: z.string().default(""),
  coverImage: z.string().default(""),
  status: z.enum(["published", "draft"]),
  featured: z.boolean(),
  sortOrder: z.coerce.number().default(0),
});

type ProductFormValues = z.infer<typeof productSchema>;
type KV = { key: string; value: string };

interface ProductFormProps {
  baseRoute?: string;
}

export default function ProductForm({ baseRoute = "/admin/urunler" }: ProductFormProps) {
  const { slug } = useParams<{ slug?: string }>();
  const isEdit = !!slug;
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories } = useListCategories();
  const { data: product } = useGetProduct(slug ?? "", {
    query: { enabled: isEdit, queryKey: getGetProductQueryKey(slug ?? "") },
  });

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  // Fotoğraflar
  const [gallery, setGallery] = useState<string[]>([]);
  const [coverPreview, setCoverPreview] = useState("");
  const coverRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);

  // Teknik Özellikler
  const [teknikSpecs, setTeknikSpecs] = useState<KV[]>([]);
  // Genel Özellikler
  const [genelSpecs, setGenelSpecs] = useState<KV[]>([]);
  // Diyagram görselleri (resimler) ve PDF dosyaları
  const [diagrams, setDiagrams] = useState<string[]>([]);
  const [pdfUrl, setPdfUrl] = useState<string>("");
  const diagramRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: { name: "", slug: "", categoryId: 0, capacity: "", shortDescription: "", coverImage: "", status: "published", featured: false, sortOrder: 0 },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        slug: product.slug,
        categoryId: product.categoryId,
        capacity: product.capacity,
        shortDescription: product.shortDescription ?? "",
        coverImage: product.coverImage,
        status: product.status as "published" | "draft",
        featured: product.featured,
        sortOrder: product.sortOrder,
      });
      setCoverPreview(product.coverImage);
      setGallery(product.gallery ?? []);
      setTeknikSpecs((product.specs as KV[]) ?? []);
      setDiagrams(product.usageAreas ?? []);
      setPdfUrl(product.pdfUrl ?? "");

      // Genel özellikler description'dan JSON olarak okunuyor
      try {
        const parsed = JSON.parse(product.description);
        if (Array.isArray(parsed)) setGenelSpecs(parsed);
      } catch {
        setGenelSpecs([]);
      }
    }
  }, [product, form]);

  async function uploadFile(file: File): Promise<string> {
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Yükleme başarısız");
    const data = await res.json();
    return data.url as string;
  }

  async function handleCoverUpload(file: File) {
    setUploading(true);
    try {
      const url = await uploadFile(file);
      form.setValue("coverImage", url);
      setCoverPreview(url);
      toast({ title: "Kapak görseli yüklendi" });
    } catch { toast({ title: "Hata", description: "Yükleme başarısız.", variant: "destructive" }); }
    finally { setUploading(false); }
  }

  async function handleGalleryUpload(files: FileList | null) {
    if (!files) return;
    setUploading(true);
    try {
      const urls = await Promise.all(Array.from(files).map(uploadFile));
      setGallery(prev => [...prev, ...urls]);
      toast({ title: `${urls.length} fotoğraf eklendi` });
    } catch { toast({ title: "Hata", description: "Yükleme başarısız.", variant: "destructive" }); }
    finally { setUploading(false); }
  }

  async function handleDiagramUpload(files: FileList | null) {
    if (!files) return;
    setUploading(true);
    try {
      for (const file of Array.from(files)) {
        const url = await uploadFile(file);
        if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
          setPdfUrl(url);
          toast({ title: "PDF yüklendi", description: file.name });
        } else {
          setDiagrams(prev => [...prev, url]);
          toast({ title: "Diyagram eklendi", description: file.name });
        }
      }
    } catch { toast({ title: "Hata", description: "Yükleme başarısız.", variant: "destructive" }); }
    finally { setUploading(false); }
  }

  function autoSlug(name: string) {
    return name.toLowerCase()
      .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
      .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  }

  function addKV(list: KV[], setList: (v: KV[]) => void) {
    setList([...list, { key: "", value: "" }]);
  }

  function updateKV(list: KV[], setList: (v: KV[]) => void, i: number, field: "key" | "value", val: string) {
    const copy = [...list];
    copy[i] = { ...copy[i], [field]: val };
    setList(copy);
  }

  function removeKV(list: KV[], setList: (v: KV[]) => void, i: number) {
    setList(list.filter((_, idx) => idx !== i));
  }

  function onSubmit(values: ProductFormValues) {
    const payload = {
      ...values,
      description: JSON.stringify(genelSpecs.filter(s => s.key)),
      specs: teknikSpecs.filter(s => s.key),
      gallery,
      usageAreas: diagrams,
      optionalEquipment: [],
      pdfUrl: pdfUrl || null,
    };

    if (isEdit) {
      updateProduct.mutate(
        { slug: slug!, data: payload },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListProductsQueryKey({}) });
            toast({ title: "Ürün güncellendi" });
            setLocation(baseRoute);
          },
          onError: () => toast({ title: "Hata", description: "Güncelleme başarısız.", variant: "destructive" }),
        }
      );
    } else {
      createProduct.mutate(
        { data: payload },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: getListProductsQueryKey({}) });
            toast({ title: "Ürün oluşturuldu" });
            setLocation(baseRoute);
          },
          onError: () => toast({ title: "Hata", description: "Oluşturma başarısız.", variant: "destructive" }),
        }
      );
    }
  }

  const isPending = createProduct.isPending || updateProduct.isPending;

  const sectionClass = "bg-white border border-gray-200 rounded-sm p-6";
  const sectionTitle = "font-black text-gray-900 text-sm uppercase tracking-wider mb-5";
  const labelClass = "text-gray-600 font-semibold text-xs tracking-wider";

  return (
    <div>
      <div className="flex items-center gap-4 mb-8">
        <Link href={baseRoute}>
          <Button variant="ghost" size="icon" className="text-gray-500 hover:text-gray-900">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-black text-gray-900">
            {isEdit ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {isEdit ? `Düzenleniyor: ${product?.name ?? slug}` : "Yeni ürün oluştur"}
          </p>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

          {/* ── TEMEL BİLGİLER ── */}
          <div className={sectionClass}>
            <h2 className={sectionTitle}>Temel Bilgiler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField control={form.control} name="name" render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>ÜRÜN ADI *</FormLabel>
                  <FormControl>
                    <Input className="rounded-sm border-gray-200" placeholder="örn. ZV-030" {...field}
                      onChange={e => { field.onChange(e); if (!isEdit) form.setValue("slug", autoSlug(e.target.value)); }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="slug" render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>SLUG (URL) *</FormLabel>
                  <FormControl>
                    <Input className="rounded-sm border-gray-200" placeholder="zv-030" {...field} readOnly={isEdit} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="categoryId" render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>KATEGORİ *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value?.toString()}>
                    <FormControl>
                      <SelectTrigger className="rounded-sm border-gray-200">
                        <SelectValue placeholder="Kategori seçin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories?.map(cat => (
                        <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="capacity" render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>KAPASİTE</FormLabel>
                  <FormControl>
                    <Input className="rounded-sm border-gray-200" placeholder="örn. 30 ton" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <div className="mt-5">
              <FormField control={form.control} name="shortDescription" render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>KISA AÇIKLAMA</FormLabel>
                  <FormControl>
                    <Textarea
                      className="rounded-sm border-gray-200 text-sm resize-none"
                      placeholder="Ürün hakkında kısa bir açıklama (opsiyonel)"
                      rows={3}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
          </div>

          {/* ── KAPAK GÖRSELİ ── */}
          <div className={sectionClass}>
            <h2 className={sectionTitle}>Kapak Görseli</h2>
            <input ref={coverRef} type="file" accept="image/*" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) handleCoverUpload(f); }} />
            <div className="flex gap-5 items-start">
              <div
                className="w-36 h-36 border-2 border-dashed border-gray-200 rounded-sm flex items-center justify-center cursor-pointer hover:border-[#8B1A1A] hover:bg-red-50 transition-all flex-shrink-0 overflow-hidden bg-gray-50"
                onClick={() => coverRef.current?.click()}
              >
                {coverPreview ? (
                  <img src={coverPreview} alt="" className="w-full h-full object-contain" />
                ) : (
                  <div className="text-center">
                    <Upload className="w-6 h-6 text-gray-300 mx-auto mb-1" />
                    <span className="text-xs text-gray-400">Yükle</span>
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-2">
                <Button type="button" variant="outline" className="rounded-sm border-gray-300 text-gray-700 text-sm" onClick={() => coverRef.current?.click()} disabled={uploading}>
                  <Upload className="w-4 h-4 mr-2" /> Bilgisayardan Seç
                </Button>
                <FormField control={form.control} name="coverImage" render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-500 font-semibold text-xs">veya görsel yolu girin</FormLabel>
                    <FormControl>
                      <Input className="rounded-sm border-gray-200 text-sm" placeholder="/images/products/zv-030.png" {...field}
                        onChange={e => { field.onChange(e); setCoverPreview(e.target.value); }}
                      />
                    </FormControl>
                  </FormItem>
                )} />
                {coverPreview && (
                  <button type="button" className="text-xs text-red-500 hover:underline" onClick={() => { form.setValue("coverImage", ""); setCoverPreview(""); }}>
                    Görseli kaldır
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── FOTOĞRAF GALERİSİ ── */}
          <div className={sectionClass}>
            <h2 className={sectionTitle}>Fotoğraf Galerisi</h2>
            <input ref={galleryRef} type="file" accept="image/*" multiple className="hidden" onChange={e => handleGalleryUpload(e.target.files)} />
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mb-3">
              {gallery.map((img, i) => (
                <div key={i} className="relative group aspect-square">
                  <img src={img} alt="" className="w-full h-full object-cover rounded-sm bg-gray-100" />
                  <button type="button" className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => setGallery(g => g.filter((_, idx) => idx !== i))}>
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              <button type="button" className="aspect-square border-2 border-dashed border-gray-200 rounded-sm flex flex-col items-center justify-center hover:border-[#8B1A1A] hover:bg-red-50 transition-all"
                onClick={() => galleryRef.current?.click()} disabled={uploading}>
                <Plus className="w-5 h-5 text-gray-300" />
                <span className="text-[10px] text-gray-400 mt-1">Ekle</span>
              </button>
            </div>
            <p className="text-xs text-gray-400">Birden fazla fotoğraf seçebilirsiniz</p>
          </div>

          {/* ── TEKNİK ÖZELLİKLER ── */}
          <div className={sectionClass}>
            <h2 className={sectionTitle}>Teknik Özellikler Tablosu</h2>
            <div className="space-y-2">
              {teknikSpecs.map((spec, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    className="rounded-sm border-gray-200 text-sm flex-1"
                    placeholder="Özellik adı (örn. Kaldırma Kapasitesi)"
                    value={spec.key}
                    onChange={e => updateKV(teknikSpecs, setTeknikSpecs, i, "key", e.target.value)}
                  />
                  <Input
                    className="rounded-sm border-gray-200 text-sm flex-1"
                    placeholder="Değer (örn. 3.000 kg)"
                    value={spec.value}
                    onChange={e => updateKV(teknikSpecs, setTeknikSpecs, i, "value", e.target.value)}
                  />
                  <button type="button" className="text-gray-400 hover:text-red-500 flex-shrink-0"
                    onClick={() => removeKV(teknikSpecs, setTeknikSpecs, i)}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" size="sm" className="mt-3 rounded-sm border-gray-300 text-gray-600"
              onClick={() => addKV(teknikSpecs, setTeknikSpecs)}>
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Satır Ekle
            </Button>
          </div>

          {/* ── GENEL ÖZELLİKLER ── */}
          <div className={sectionClass}>
            <h2 className={sectionTitle}>Genel Özellikler Tablosu</h2>
            <div className="space-y-2">
              {genelSpecs.map((spec, i) => (
                <div key={i} className="flex gap-2 items-center">
                  <Input
                    className="rounded-sm border-gray-200 text-sm flex-1"
                    placeholder="Özellik (örn. Montaj Tipi)"
                    value={spec.key}
                    onChange={e => updateKV(genelSpecs, setGenelSpecs, i, "key", e.target.value)}
                  />
                  <Input
                    className="rounded-sm border-gray-200 text-sm flex-1"
                    placeholder="Değer (örn. Çerçeve üstü)"
                    value={spec.value}
                    onChange={e => updateKV(genelSpecs, setGenelSpecs, i, "value", e.target.value)}
                  />
                  <button type="button" className="text-gray-400 hover:text-red-500 flex-shrink-0"
                    onClick={() => removeKV(genelSpecs, setGenelSpecs, i)}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <Button type="button" variant="outline" size="sm" className="mt-3 rounded-sm border-gray-300 text-gray-600"
              onClick={() => addKV(genelSpecs, setGenelSpecs)}>
              <Plus className="w-3.5 h-3.5 mr-1.5" /> Satır Ekle
            </Button>
          </div>

          {/* ── DİYAGRAM ── */}
          <div className={sectionClass}>
            <h2 className={sectionTitle}>Diyagram / Teknik Çizim</h2>
            <input ref={diagramRef} type="file" accept="image/*,.pdf" multiple className="hidden" onChange={e => handleDiagramUpload(e.target.files)} />

            {/* PDF Bölümü */}
            <div className="mb-5">
              <p className="text-xs font-semibold text-gray-500 mb-2">PDF DOSYASI (TEKNİK KATALOG)</p>
              {pdfUrl ? (
                <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-100 rounded-sm">
                  <div className="w-10 h-10 bg-[#8B1A1A] rounded flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">
                      {pdfUrl.split("/").pop() || "PDF Dosyası"}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{pdfUrl}</p>
                  </div>
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <a href={pdfUrl} target="_blank" rel="noopener noreferrer"
                      className="p-1.5 text-gray-500 hover:text-[#8B1A1A] transition-colors rounded">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button type="button" className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded"
                      onClick={() => setPdfUrl("")}>
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <button type="button"
                  className="flex items-center gap-2 px-4 py-2.5 border-2 border-dashed border-gray-200 rounded-sm text-gray-400 hover:border-[#8B1A1A] hover:text-[#8B1A1A] hover:bg-red-50 transition-all text-sm"
                  onClick={() => diagramRef.current?.click()} disabled={uploading}>
                  <FileText className="w-4 h-4" />
                  PDF Yükle
                </button>
              )}
            </div>

            {/* Görsel Diyagramlar */}
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">DİYAGRAM GÖRSELLERİ</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-3">
                {diagrams.map((img, i) => (
                  <div key={i} className="relative group aspect-video">
                    <img src={img} alt="" className="w-full h-full object-contain rounded-sm bg-gray-100 border border-gray-200" />
                    <button type="button" className="absolute top-1 right-1 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => setDiagrams(d => d.filter((_, idx) => idx !== i))}>
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button type="button" className="aspect-video border-2 border-dashed border-gray-200 rounded-sm flex flex-col items-center justify-center hover:border-[#8B1A1A] hover:bg-red-50 transition-all"
                  onClick={() => diagramRef.current?.click()} disabled={uploading}>
                  <Plus className="w-5 h-5 text-gray-300" />
                  <span className="text-[10px] text-gray-400 mt-1">Görsel Ekle</span>
                </button>
              </div>
            </div>
            <p className="text-xs text-gray-400">Görsel için PNG/JPG, katalog için PDF yükleyebilirsiniz</p>
          </div>

          {/* ── YAYIN AYARLARI ── */}
          <div className={sectionClass}>
            <h2 className={sectionTitle}>Yayın Ayarları</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormField control={form.control} name="status" render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>DURUM</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-sm border-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="published">Yayında</SelectItem>
                      <SelectItem value="draft">Taslak</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )} />
              <FormField control={form.control} name="sortOrder" render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>SIRA NO</FormLabel>
                  <FormControl>
                    <Input type="number" className="rounded-sm border-gray-200" {...field} />
                  </FormControl>
                </FormItem>
              )} />
              <FormField control={form.control} name="featured" render={({ field }) => (
                <FormItem>
                  <FormLabel className={labelClass}>ÖNE ÇIKAN</FormLabel>
                  <div className="flex items-center gap-3 mt-2">
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <span className="text-gray-600 text-sm">{field.value ? "Evet" : "Hayır"}</span>
                  </div>
                </FormItem>
              )} />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button type="submit" className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold px-8 rounded-sm" disabled={isPending || uploading}>
              {isPending ? "Kaydediliyor..." : isEdit ? "Güncelle" : "Ürünü Kaydet"}
            </Button>
            <Link href={baseRoute}>
              <Button type="button" variant="outline" className="font-bold rounded-sm border-gray-300 text-gray-600">İptal</Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
