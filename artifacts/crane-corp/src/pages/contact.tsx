import { motion } from "framer-motion";
import { Link } from "wouter";
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactInfo = [
  {
    icon: Phone,
    label: "Telefon",
    value: "0541 129 01 02",
    href: "tel:05411290102",
  },
  {
    icon: Mail,
    label: "E-posta",
    value: "info@zomak.com.tr",
    href: "mailto:info@zomak.com.tr",
  },
  {
    icon: MapPin,
    label: "Adres",
    value: "Atatürk Mahallesi 4. Cadde No:54\nOğlananası-Menderes / İzmir",
    href: undefined,
  },
  {
    icon: Clock,
    label: "Çalışma Saatleri",
    value: "Hafta içi: 08:00 – 18:00\nCumartesi: 09:00 – 14:00",
    href: undefined,
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-black text-white py-24 relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#c00]" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-xs font-black text-[#c00] tracking-widest uppercase mb-3">Bize Ulaşın</div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight text-white mb-4">İletişim</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Sorularınız ve talepleriniz için her zaman yanınızdayız.
          </p>
        </div>
      </div>

      {/* Contact Cards */}
      <section className="py-16 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactInfo.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-200 hover:border-[#c00] p-6 group transition-colors duration-300"
              >
                <div className="w-12 h-12 bg-[#c00]/10 group-hover:bg-[#c00] flex items-center justify-center mb-4 transition-colors">
                  <info.icon className="w-6 h-6 text-[#c00] group-hover:text-white transition-colors" />
                </div>
                <div className="text-xs font-black uppercase tracking-widest text-[#c00] mb-1">{info.label}</div>
                {info.href ? (
                  <a href={info.href} className="font-bold text-sm text-gray-700 hover:text-[#c00] transition-colors whitespace-pre-line">
                    {info.value}
                  </a>
                ) : (
                  <p className="font-bold text-sm text-gray-700 whitespace-pre-line">{info.value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map + WhatsApp */}
      <section className="py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Map */}
            <div className="lg:col-span-2">
              <div className="text-xs font-black text-[#c00] tracking-widest uppercase mb-3">Bizi Haritada Bulun</div>
              <h2 className="text-3xl font-black uppercase mb-6">Konumumuz</h2>
              <div className="w-full overflow-hidden border-2 border-gray-200" style={{ height: "420px" }}>
                <iframe
                  src="https://www.google.com/maps?q=Atatürk+Mahallesi+4.+Cadde+No:54+Oğlananası+Menderes+İzmir&output=embed"
                  width="100%"
                  height="420"
                  style={{ border: 0 }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ZOMAK Konum"
                />
              </div>
              <div className="mt-4 flex items-start gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4 text-[#c00] flex-shrink-0 mt-0.5" />
                <span>Atatürk Mahallesi 4. Cadde No:54 Oğlananası-Menderes / İzmir</span>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* WhatsApp CTA */}
              <div className="bg-black text-white p-8">
                <div className="text-xs font-black text-[#c00] uppercase tracking-widest mb-3">Hızlı İletişim</div>
                <h3 className="text-xl font-black uppercase mb-4">WhatsApp ile Yaz</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  Hızlı yanıt için WhatsApp üzerinden bize ulaşabilirsiniz. Mesajınızı anında iletebilirsiniz.
                </p>
                <a
                  href="https://wa.me/905411290102?text=Merhaba%2C%20ZOMAK%27tan%20vin%C3%A7%2Fplatform%20hizmeti%20i%C3%A7in%20teklif%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-green-600 hover:bg-green-500 text-white font-black rounded-none border-none uppercase h-12">
                    <MessageCircle className="mr-2 w-5 h-5" />
                    WhatsApp'a Yaz
                  </Button>
                </a>
                <a href="tel:05411290102" className="mt-3 block">
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10 font-black rounded-none uppercase h-12">
                    <Phone className="mr-2 w-4 h-4" />
                    Hemen Ara
                  </Button>
                </a>
              </div>

              {/* Teklif CTA */}
              <div className="border-2 border-[#c00] p-8">
                <div className="text-xs font-black text-[#c00] uppercase tracking-widest mb-2">Fiyat Talebi</div>
                <h3 className="text-xl font-black uppercase mb-3">Teklif Alın</h3>
                <p className="text-gray-600 text-sm mb-5">
                  Projenizi detaylı şekilde iletmek için teklif formunu doldurun.
                </p>
                <Link href="/teklif">
                  <Button className="w-full bg-[#c00] hover:bg-red-700 text-white font-black rounded-none border-none uppercase">
                    Teklif Formu <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* Hours */}
              <div className="bg-gray-50 border border-gray-200 p-6">
                <h4 className="font-black uppercase text-sm mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#c00]" />
                  Çalışma Saatleri
                </h4>
                <div className="space-y-2 text-sm">
                  {[
                    { day: "Pazartesi – Cuma", hours: "08:00 – 18:00" },
                    { day: "Cumartesi", hours: "09:00 – 14:00" },
                    { day: "Pazar", hours: "Kapalı" },
                  ].map((r, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-gray-500">{r.day}</span>
                      <span className={`font-bold ${r.hours === "Kapalı" ? "text-gray-400" : "text-black"}`}>{r.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
