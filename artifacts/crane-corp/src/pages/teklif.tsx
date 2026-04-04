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
  adSoyad: z.string().min(2, "Ad soyad en az 2 karakter olmalıdır"),
  firma: z.string().optional(),
  telefon: z.string().min(10, "Geçerli bir telefon numarası girin"),
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  hizmetTuru: z.string().min(1, "Hizmet türü seçiniz"),
  sehir: z.string().min(2, "Şehir adı girin"),
  aciklama: z.string().min(20, "Açıklama en az 20 karakter olmalıdır"),
});

type QuoteValues = z.infer<typeof quoteSchema>;

const hizmetler = [
  "Mobil Katlanır Vinç",
  "Hidrolik Gözlüklü Kurtarıcı",
  "Hidrolik Kurtarıcı",
  "Özel Hidrolik Makine",
  "Sepetli Platform",
  "Diğer / Belirtmek İstiyorum",
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
      toast({ title: "Teklif talebiniz alındı!", description: "En kısa sürede sizinle iletişime geçeceğiz." });
    }, 600);
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-24 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#c00]" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-xs font-black text-[#c00] tracking-widest uppercase mb-3">Fiyat Talebi</div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">Teklif Al</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Projenizi bize anlatın, size en uygun çözümü ve fiyatı sunalım.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-black text-white p-12 text-center"
              >
                <CheckCircle className="w-20 h-20 text-[#c00] mx-auto mb-6" />
                <h2 className="text-3xl font-black uppercase mb-3">Talebiniz Alındı!</h2>
                <p className="text-gray-300 mb-8 max-w-md mx-auto">
                  Teklif talebiniz başarıyla iletildi. Ekibimiz en kısa sürede sizinle iletişime geçecektir.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <a href="tel:05411290102">
                    <Button className="bg-[#c00] hover:bg-red-700 font-black rounded-none uppercase border-none">
                      <Phone className="w-4 h-4 mr-2" />
                      Hemen Ara
                    </Button>
                  </a>
                  <Button
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-black font-black rounded-none uppercase"
                    onClick={() => { setSubmitted(false); form.reset(); }}
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
                        <FormLabel className="font-black text-xs uppercase tracking-widest">Ad Soyad *</FormLabel>
                        <FormControl>
                          <Input className="rounded-none border-gray-300 focus:border-[#c00]" placeholder="Ahmet Yılmaz" {...field} data-testid="input-ad-soyad" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="firma" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-black text-xs uppercase tracking-widest">Firma</FormLabel>
                        <FormControl>
                          <Input className="rounded-none border-gray-300" placeholder="Firma Adı" {...field} data-testid="input-firma" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField control={form.control} name="telefon" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-black text-xs uppercase tracking-widest">Telefon *</FormLabel>
                        <FormControl>
                          <Input className="rounded-none border-gray-300" placeholder="0541 000 00 00" {...field} data-testid="input-telefon" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-black text-xs uppercase tracking-widest">E-posta *</FormLabel>
                        <FormControl>
                          <Input className="rounded-none border-gray-300" type="email" placeholder="info@firma.com" {...field} data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField control={form.control} name="hizmetTuru" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-black text-xs uppercase tracking-widest">Hizmet Türü *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="rounded-none border-gray-300" data-testid="select-hizmet">
                              <SelectValue placeholder="Hizmet seçin..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {hizmetler.map((h) => (
                              <SelectItem key={h} value={h}>{h}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="sehir" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-black text-xs uppercase tracking-widest">Şehir *</FormLabel>
                        <FormControl>
                          <Input className="rounded-none border-gray-300" placeholder="İzmir" {...field} data-testid="input-sehir" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  <FormField control={form.control} name="aciklama" render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-black text-xs uppercase tracking-widest">Proje Açıklaması *</FormLabel>
                      <FormControl>
                        <Textarea
                          className="rounded-none border-gray-300 min-h-[140px] resize-none focus:border-[#c00]"
                          placeholder="Projenizi, ihtiyaçlarınızı ve talep ettiğiniz kapasiteyi kısaca açıklayın..."
                          {...field}
                          data-testid="textarea-aciklama"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )} />

                  {/* File Upload UI */}
                  <div>
                    <label className="block font-black text-xs uppercase tracking-widest mb-2">Dosya Ekle (İsteğe Bağlı)</label>
                    <label className="flex items-center gap-3 border-2 border-dashed border-gray-300 hover:border-[#c00] p-6 cursor-pointer transition-colors group">
                      <Upload className="w-5 h-5 text-gray-400 group-hover:text-[#c00]" />
                      <div>
                        <div className="text-sm font-bold text-gray-600 group-hover:text-black">
                          {fileName ? fileName : "Dosya seçmek için tıklayın"}
                        </div>
                        <div className="text-xs text-gray-400">PDF, JPG, PNG — Max 10MB</div>
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
                    className="w-full h-14 font-black text-base bg-[#c00] hover:bg-red-700 text-white rounded-none border-none uppercase tracking-widest"
                    disabled={form.formState.isSubmitting}
                    data-testid="button-submit"
                  >
                    {form.formState.isSubmitting ? "GÖNDERİLİYOR..." : "TEKLİF TALEP ET"}
                  </Button>
                </form>
              </Form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-black text-white p-8">
              <h3 className="font-black uppercase text-lg mb-4 text-[#c00]">Hızlı İletişim</h3>
              <div className="space-y-4">
                <a href="tel:05411290102" className="flex items-center gap-3 hover:text-[#c00] transition-colors">
                  <Phone className="w-5 h-5 text-[#c00]" />
                  <div>
                    <div className="text-xs text-gray-400 uppercase tracking-wider">Telefon</div>
                    <div className="font-black">0541 129 01 02</div>
                  </div>
                </a>
                <a
                  href="https://wa.me/905411290102?text=Merhaba%2C%20ZOMAK%27tan%20vin%C3%A7%2Fplatform%20hizmeti%20i%C3%A7in%20teklif%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 bg-green-600 hover:bg-green-500 text-white p-4 transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <div>
                    <div className="text-xs opacity-80 uppercase tracking-wider">WhatsApp</div>
                    <div className="font-black text-sm">Hemen Yaz</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="border-2 border-gray-200 p-8">
              <h3 className="font-black uppercase text-sm mb-4">Neden ZOMAK?</h3>
              <ul className="space-y-3 text-sm text-gray-600">
                {[
                  "Hızlı yanıt süresi",
                  "Rekabetçi fiyatlandırma",
                  "Teknik uzman destek",
                  "Proje bazlı çözümler",
                  "Satış sonrası servis",
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#c00] rounded-full flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#c00] text-white p-6 text-center">
              <div className="text-3xl font-black mb-1">24 Saat</div>
              <div className="text-sm text-white/80 font-bold uppercase">İçinde Yanıt Veriyoruz</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
