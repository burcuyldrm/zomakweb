import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CheckCircle, Upload, Phone, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const quoteSchema = z.object({
  adSoyad: z.string().min(3, "Ad soyad en az 3 karakter olmalıdır"),
  firma: z.string().optional(),
  telefon: z.string().min(10, "Geçerli bir telefon numarası giriniz"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  hizmetTuru: z.string().min(1, "Lütfen hizmet türü seçiniz"),
  sehir: z.string().min(2, "Şehir bilgisi giriniz"),
  aciklama: z.string().min(20, "Açıklama en az 20 karakter olmalıdır"),
});

type QuoteValues = z.infer<typeof quoteSchema>;

const hizmetler = [
  "Mobil Katlanır Vinç",
  "Hidrolik Gözlüklü Kurtarıcı",
  "Hidrolik Kurtarıcı",
  "Özel Hidrolik Makine",
  "Sepetli Platform",
  "Diğer / Bilgi Almak İstiyorum",
];

export default function Teklif() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  const form = useForm<QuoteValues>({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      adSoyad: "", firma: "", telefon: "", email: "",
      hizmetTuru: "", sehir: "", aciklama: "",
    },
  });

  function onSubmit(_values: QuoteValues) {
    setTimeout(() => {
      setSubmitted(true);
      toast({ title: "Talebiniz alındı", description: "Ekibimiz en kısa sürede sizinle iletişime geçecektir." });
    }, 600);
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#111111] text-white py-16 relative">
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#8B1A1A]" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B1A1A]/40" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-[10px] font-bold text-[#8B1A1A] tracking-widest mb-2">FİYAT TALEBİ</div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3 leading-tight">TEKLİF AL</h1>
          <p className="text-gray-400 text-base max-w-2xl">
            Projenizi bize aktarın, size en uygun çözümü ve fiyatı sunalım.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-50 border border-gray-200 rounded-sm p-12 text-center"
              >
                <CheckCircle className="w-16 h-16 text-[#8B1A1A] mx-auto mb-5" />
                <h2 className="text-2xl font-black uppercase text-gray-900 mb-3">Talebiniz Alındı</h2>
                <p className="text-gray-500 text-sm mb-8 max-w-md mx-auto leading-relaxed">
                  Teklif talebiniz başarıyla iletildi. Uzman ekibimiz en kısa sürede sizinle iletişime geçecektir.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <a href="tel:05411290102">
                    <Button className="bg-[#8B1A1A] hover:bg-[#A52020] font-bold rounded-sm uppercase border-none">
                      <Phone className="w-4 h-4 mr-2" />
                      Hemen Ara
                    </Button>
                  </a>
                  <Button
                    variant="outline"
                    className="border-gray-300 text-gray-700 font-bold rounded-sm uppercase hover:bg-gray-50"
                    onClick={() => { setSubmitted(false); form.reset(); setFileName(null); }}
                  >
                    Yeni Teklif Talebi
                  </Button>
                </div>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5" data-testid="form-teklif">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField control={form.control} name="adSoyad" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-xs uppercase tracking-widest text-gray-600">Ad Soyad *</FormLabel>
                        <FormControl>
                          <Input className="rounded-sm border-gray-300 focus:border-[#8B1A1A] h-11" placeholder="Ahmet Yılmaz" {...field} data-testid="input-ad-soyad" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="firma" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-xs uppercase tracking-widest text-gray-600">Firma</FormLabel>
                        <FormControl>
                          <Input className="rounded-sm border-gray-300 h-11" placeholder="Firma Adı" {...field} data-testid="input-firma" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField control={form.control} name="telefon" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-xs uppercase tracking-widest text-gray-600">Telefon *</FormLabel>
                        <FormControl>
                          <Input className="rounded-sm border-gray-300 h-11" placeholder="0541 000 00 00" {...field} data-testid="input-telefon" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-xs uppercase tracking-widest text-gray-600">E-posta *</FormLabel>
                        <FormControl>
                          <Input className="rounded-sm border-gray-300 h-11" type="email" placeholder="info@firma.com" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField control={form.control} name="hizmetTuru" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-xs uppercase tracking-widest text-gray-600">Ürün / Hizmet Türü *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-sm border-gray-300 h-11" data-testid="select-hizmet">
                              <SelectValue placeholder="Seçiniz..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {hizmetler.map((h) => <SelectItem key={h} value={h}>{h}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="sehir" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-xs uppercase tracking-widest text-gray-600">Şehir / Lokasyon *</FormLabel>
                        <FormControl>
                          <Input className="rounded-sm border-gray-300 h-11" placeholder="İzmir" {...field} data-testid="input-sehir" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="aciklama" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold text-xs uppercase tracking-widest text-gray-600">İş Açıklaması *</FormLabel>
                      <FormControl>
                        <Textarea
                          className="rounded-sm border-gray-300 min-h-[130px] resize-none focus:border-[#8B1A1A]"
                          placeholder="Projenizi, ihtiyaçlarınızı ve talep ettiğiniz kapasiteyi kısaca aktarın..."
                          {...field}
                          data-testid="textarea-aciklama"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* File Upload */}
                  <div>
                    <label className="block font-bold text-xs uppercase tracking-widest text-gray-600 mb-2">Dosya / Görsel Yükleme</label>
                    <label className="flex items-center gap-3 border border-dashed border-gray-300 hover:border-[#8B1A1A] rounded-sm p-5 cursor-pointer transition-colors group">
                      <Upload className="w-4 h-4 text-gray-400 group-hover:text-[#8B1A1A] flex-shrink-0" />
                      <div>
                        <div className="text-sm font-medium text-gray-600">
                          {fileName ? fileName : "Dosya seçmek için tıklayın"}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5">PDF, JPG, PNG — Maks. 10 MB</div>
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                      />
                    </label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 font-bold bg-[#8B1A1A] hover:bg-[#A52020] text-white rounded-sm border-none uppercase tracking-widest"
                    disabled={form.formState.isSubmitting}
                    data-testid="button-submit"
                  >
                    {form.formState.isSubmitting ? "Gönderiliyor..." : "Teklif Talep Et"}
                  </Button>
                </form>
              </Form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            <div className="bg-[#111111] text-white rounded-sm p-7">
              <div className="text-[10px] font-bold text-[#8B1A1A] uppercase tracking-widest mb-2">İletişim</div>
              <h3 className="font-black uppercase mb-5">Hızlı Ulaşın</h3>
              <div className="space-y-4">
                <a href="tel:05411290102" className="flex items-center gap-3 hover:text-[#8B1A1A] transition-colors">
                  <Phone className="w-4 h-4 text-[#8B1A1A]" />
                  <div>
                    <div className="text-[10px] text-gray-400 uppercase">Telefon</div>
                    <div className="font-bold text-sm">0541 129 01 02</div>
                  </div>
                </a>
                <a
                  href="https://wa.me/905411290102?text=Merhaba%2C%20ZOMAK%27tan%20vin%C3%A7%2Fplatform%20hizmeti%20i%C3%A7in%20teklif%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-green-700 hover:bg-green-600 text-white p-3 rounded-sm transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <div>
                    <div className="text-[10px] text-green-200 uppercase">WhatsApp</div>
                    <div className="font-bold text-sm">Hemen Yaz</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="border border-gray-200 rounded-sm p-6">
              <h3 className="font-black uppercase text-xs tracking-widest text-gray-500 mb-4">Neden ZOMAK?</h3>
              <ul className="space-y-2.5 text-sm text-gray-600">
                {[
                  "Hızlı geri dönüş süresi",
                  "Rekabetçi fiyatlandırma",
                  "Teknik uzman destek",
                  "Proje odaklı çözümler",
                  "Satış sonrası servis",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2.5">
                    <span className="w-1 h-1 bg-[#8B1A1A] rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-sm p-6 text-center">
              <div className="text-3xl font-black text-[#8B1A1A] mb-1">24 Saat</div>
              <div className="text-xs font-bold uppercase tracking-widest text-gray-500">İçinde Yanıt Veriyoruz</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
