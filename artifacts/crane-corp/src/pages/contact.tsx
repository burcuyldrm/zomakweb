import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { PageHero } from "@/components/layout/page-hero";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().min(3, "Ad soyad en az 3 karakter olmalıdır"),
  email: z.string().email("Geçerli bir e-posta adresi giriniz"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(2, "Konu giriniz"),
  message: z.string().min(20, "Mesaj en az 20 karakter olmalıdır"),
});
type ContactValues = z.infer<typeof contactSchema>;

const contactItems = [
  { icon: Phone, label: "Telefon", value: "0541 129 01 02", href: "tel:05411290102" },
  { icon: Mail, label: "E-posta", value: "info@zomak.com.tr", href: "mailto:info@zomak.com.tr" },
  { icon: MapPin, label: "Adres", value: "Atatürk Mahallesi 4. Cadde No:54\nOğlananası-Menderes / İzmir", href: undefined },
  { icon: Clock, label: "Çalışma Saatleri", value: "Pzt–Cuma: 08:00–18:00\nCumartesi: 09:00–14:00\nPazar: Kapalı", href: undefined },
];

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", phone: "", company: "", subject: "", message: "" },
  });

  async function onSubmit(values: ContactValues) {
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (res.ok) {
      setSubmitted(true);
      toast({ title: "Mesajınız alındı", description: "En kısa sürede geri döneceğiz." });
    } else {
      toast({ title: "Hata", description: "Gönderim başarısız. Lütfen tekrar deneyin.", variant: "destructive" });
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <PageHero
        label="İLETİŞİM"
        title="BİZE ULAŞIN"
        description="Sorularınız, talepleriniz ve iş birliği teklifleriniz için ekibimiz hazır."
      />

      <section className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* SOL — iletişim bilgileri + harita */}
            <div className="flex flex-col gap-4">
              {contactItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white border border-gray-200 rounded-sm p-5 flex items-start gap-4 hover:border-[#8B1A1A] group transition-colors"
                >
                  <div className="w-11 h-11 bg-gray-100 group-hover:bg-[#8B1A1A]/10 flex items-center justify-center rounded-sm flex-shrink-0 transition-colors">
                    <item.icon className="w-5 h-5 text-[#8B1A1A]" />
                  </div>
                  <div>
                    <div className="font-bold uppercase tracking-widest text-[#8B1A1A] mb-1 text-[15px]">{item.label}</div>
                    {item.href ? (
                      <a href={item.href} className="font-medium text-gray-700 hover:text-[#8B1A1A] transition-colors whitespace-pre-line text-[15px]">{item.value}</a>
                    ) : (
                      <p className="font-medium text-gray-700 whitespace-pre-line text-[15px]">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}

              <a href="https://wa.me/905411290102?text=Merhaba%2C%20ZOMAK%27tan%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-green-700 hover:bg-green-600 text-white font-bold rounded-sm border-none uppercase mt-2">
                  <MessageCircle className="mr-2 w-4 h-4" /> WhatsApp ile Yaz
                </Button>
              </a>

              <div className="w-full rounded-sm overflow-hidden border border-gray-200 shadow-sm mt-2">
                <iframe
                  src="https://www.google.com/maps?q=Atatürk+Mahallesi+4.+Cadde+No:54+Oğlananası+Menderes+İzmir&output=embed"
                  width="100%" height="260"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ZOMAK Konum"
                />
              </div>
            </div>

            {/* SAĞ — iletişim formu */}
            <div>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gray-50 border border-gray-200 rounded-sm p-12 text-center flex flex-col items-center"
                >
                  <CheckCircle className="w-16 h-16 text-[#8B1A1A] mb-5" />
                  <h2 className="text-2xl font-black uppercase text-gray-900 mb-3">Mesajınız Alındı</h2>
                  <p className="text-gray-500 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
                    Talebiniz ekibimize iletildi. En kısa sürede sizinle iletişime geçeceğiz.
                  </p>
                  <Button
                    className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold rounded-sm border-none"
                    onClick={() => { setSubmitted(false); form.reset(); }}
                  >
                    Yeni Mesaj Gönder
                  </Button>
                </motion.div>
              ) : (
                <div>
                  <h2 className="text-xl font-black uppercase text-gray-900 mb-1">Mesaj Gönderin</h2>
                  <p className="text-gray-500 text-sm mb-6">Formу doldurun, size en kısa sürede geri dönelim.</p>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField control={form.control} name="name" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-xs uppercase tracking-widest text-gray-600">Ad Soyad *</FormLabel>
                            <FormControl><Input className="rounded-sm border-gray-300 h-11" placeholder="Ahmet Yılmaz" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="email" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-xs uppercase tracking-widest text-gray-600">E-posta *</FormLabel>
                            <FormControl><Input className="rounded-sm border-gray-300 h-11" type="email" placeholder="info@firma.com" {...field} /></FormControl>
                            <FormMessage />
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="phone" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-xs uppercase tracking-widest text-gray-600">Telefon</FormLabel>
                            <FormControl><Input className="rounded-sm border-gray-300 h-11" placeholder="0541 000 00 00" {...field} /></FormControl>
                          </FormItem>
                        )} />
                        <FormField control={form.control} name="company" render={({ field }) => (
                          <FormItem>
                            <FormLabel className="font-bold text-xs uppercase tracking-widest text-gray-600">Firma</FormLabel>
                            <FormControl><Input className="rounded-sm border-gray-300 h-11" placeholder="Firma Adı" {...field} /></FormControl>
                          </FormItem>
                        )} />
                      </div>
                      <FormField control={form.control} name="subject" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-xs uppercase tracking-widest text-gray-600">Konu *</FormLabel>
                          <FormControl><Input className="rounded-sm border-gray-300 h-11" placeholder="Mesajınızın konusu" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="message" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-bold text-xs uppercase tracking-widest text-gray-600">Mesaj *</FormLabel>
                          <FormControl>
                            <Textarea className="rounded-sm border-gray-300 min-h-[140px] resize-none" placeholder="Mesajınızı buraya yazın..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <Button
                        type="submit"
                        className="w-full h-12 font-bold bg-[#8B1A1A] hover:bg-[#A52020] text-white rounded-sm border-none uppercase tracking-widest"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? "Gönderiliyor..." : "Mesajı Gönder"}
                      </Button>
                    </form>
                  </Form>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
