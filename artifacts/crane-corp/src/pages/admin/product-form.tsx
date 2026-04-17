import { useParams, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRef, useState } from "react";
import {
  useGetProduct,
  useCreateProduct,
  useUpdateProduct,
  useListCategories,
  getGetProductQueryKey,
  getListProductsQueryKey,
} from "@workspace/api-client-react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, X } from "lucide-react";
import { Link } from "wouter";
import { useEffect } from "react";

const productSchema = z.object({
  name: z.string().min(1, "Ürün adı zorunludur"),
  slug: z
    .string()
    .min(1, "Slug zorunludur")
    .regex(/^[a-z0-9-]+$/, "Sadece küçük harf, rakam ve tire kullanın"),
  categoryId: z.coerce.number().min(1, "Kategori seçiniz"),
  shortDescription: z.string().min(5, "Kısa açıklama en az 5 karakter olmalıdır"),
  description: z.string().min(10, "Açıklama en az 10 karakter olmalıdır"),
  capacity: z.string().default(""),
  coverImage: z.string().default(""),
  status: z.enum(["published", "draft"]),
  featured: z.boolean(),
  sortOrder: z.coerce.number().default(0),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  baseRoute?: string;
}

export default function ProductForm({ baseRoute = "/admin/urunler" }: ProductFormProps) {
  const { slug } = useParams<{ slug?: string }>();
  const isEdit = !!slug;
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string>("");

  const { data: categories } = useListCategories();
  const { data: product } = useGetProduct(slug ?? "", {
    query: { enabled: isEdit, queryKey: getGetProductQueryKey(slug ?? "") },
  });

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      slug: "",
      categoryId: 0,
      shortDescription: "",
      description: "",
      capacity: "",
      coverImage: "",
      status: "published",
      featured: false,
      sortOrder: 0,
    },
  });

  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        slug: product.slug,
        categoryId: product.categoryId,
        shortDescription: product.shortDescription,
        description: product.description,
        capacity: product.capacity,
        coverImage: product.coverImage,
        status: product.status as "published" | "draft",
        featured: product.featured,
        sortOrder: product.sortOrder,
      });
      setImagePreview(product.coverImage);
    }
  }, [product, form]);

  async function handleImageUpload(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Yükleme başarısız");
      const data = await res.json();
      const path = data.url as string;
      form.setValue("coverImage", path);
      setImagePreview(path);
      toast({ title: "Resim yüklendi" });
    } catch {
      toast({ title: "Hata", description: "Resim yüklenemedi.", variant: "destructive" });
    } finally {
      setUploading(false);
    }
  }

  function autoSlug(name: string) {
    return name
      .toLowerCase()
      .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
      .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function onSubmit(values: ProductFormValues) {
    const payload = {
      ...values,
      specs: [],
      gallery: [],
      usageAreas: [],
      optionalEquipment: [],
      pdfUrl: null,
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
          onError: () =>
            toast({ title: "Hata", description: "Güncelleme başarısız.", variant: "destructive" }),
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
          onError: () =>
            toast({ title: "Hata", description: "Oluşturma başarısız.", variant: "destructive" }),
        }
      );
    }
  }

  const isPending = createProduct.isPending || updateProduct.isPending;

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

          {/* Temel Bilgiler */}
          <div className="bg-white border border-gray-200 rounded-sm p-6 space-y-5">
            <h2 className="font-black text-gray-900 text-sm uppercase tracking-wider">
              Temel Bilgiler
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 font-semibold text-xs tracking-wider">ÜRÜN ADI *</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-sm border-gray-200"
                        placeholder="örn. ZV-030"
                        {...field}
                        onChange={(e) => {
                          field.onChange(e);
                          if (!isEdit) form.setValue("slug", autoSlug(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 font-semibold text-xs tracking-wider">SLUG (URL) *</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-sm border-gray-200"
                        placeholder="zv-030"
                        {...field}
                        readOnly={isEdit}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 font-semibold text-xs tracking-wider">KATEGORİ *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value?.toString()}>
                      <FormControl>
                        <SelectTrigger className="rounded-sm border-gray-200">
                          <SelectValue placeholder="Kategori seçin" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories?.map((cat) => (
                          <SelectItem key={cat.id} value={cat.id.toString()}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="capacity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 font-semibold text-xs tracking-wider">KAPASİTE</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-sm border-gray-200"
                        placeholder="örn. 30 ton, 60 ton/metre"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="shortDescription"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 font-semibold text-xs tracking-wider">KISA AÇIKLAMA *</FormLabel>
                  <FormControl>
                    <Textarea
                      className="rounded-sm border-gray-200 min-h-[80px] resize-none"
                      placeholder="Ürünü kısaca tanımlayan bir veya iki cümle..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-600 font-semibold text-xs tracking-wider">DETAYLI AÇIKLAMA *</FormLabel>
                  <FormControl>
                    <Textarea
                      className="rounded-sm border-gray-200 min-h-[140px] resize-none"
                      placeholder="Ürün hakkında kapsamlı bilgi..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Kapak Görseli */}
          <div className="bg-white border border-gray-200 rounded-sm p-6 space-y-4">
            <h2 className="font-black text-gray-900 text-sm uppercase tracking-wider">
              Kapak Görseli
            </h2>

            <div className="flex gap-4 items-start">
              {imagePreview && (
                <div className="relative flex-shrink-0">
                  <img
                    src={imagePreview}
                    alt="Önizleme"
                    className="w-28 h-28 object-contain rounded border border-gray-200 bg-gray-50"
                  />
                  <button
                    type="button"
                    className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white"
                    onClick={() => { setImagePreview(""); form.setValue("coverImage", ""); }}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              )}

              <div className="flex-1 space-y-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) handleImageUpload(file);
                  }}
                />
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-sm border-gray-300 text-gray-700"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  {uploading ? "Yükleniyor..." : "Bilgisayardan Yükle"}
                </Button>

                <FormField
                  control={form.control}
                  name="coverImage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-500 font-semibold text-xs">
                        veya görsel yolu girin
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="rounded-sm border-gray-200 text-sm"
                          placeholder="/images/products/zv-030.png"
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setImagePreview(e.target.value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Yayın Ayarları */}
          <div className="bg-white border border-gray-200 rounded-sm p-6 space-y-5">
            <h2 className="font-black text-gray-900 text-sm uppercase tracking-wider">
              Yayın Ayarları
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 font-semibold text-xs tracking-wider">DURUM</FormLabel>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sortOrder"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 font-semibold text-xs tracking-wider">SIRA NO</FormLabel>
                    <FormControl>
                      <Input type="number" className="rounded-sm border-gray-200" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-600 font-semibold text-xs tracking-wider">ÖNE ÇIKAN</FormLabel>
                    <div className="flex items-center gap-3 mt-2">
                      <FormControl>
                        <Switch checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <span className="text-gray-600 text-sm">{field.value ? "Evet" : "Hayır"}</span>
                    </div>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              type="submit"
              className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold px-8 rounded-sm"
              disabled={isPending}
            >
              {isPending ? "Kaydediliyor..." : isEdit ? "Güncelle" : "Ürünü Kaydet"}
            </Button>
            <Link href={baseRoute}>
              <Button type="button" variant="outline" className="font-bold rounded-sm border-gray-300 text-gray-600">
                İptal
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
}
