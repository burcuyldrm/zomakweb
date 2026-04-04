import { motion } from "framer-motion";
import { Link } from "wouter";
import { Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight, Linkedin, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactCards = [
  { icon: Phone, label: "Telefon", value: "0541 129 01 02", href: "tel:05411290102" },
  { icon: Mail, label: "E-posta", value: "info@zomak.com.tr", href: "mailto:info@zomak.com.tr" },
  {
    icon: MapPin,
    label: "Adres",
    value: "Atatürk Mahallesi 4. Cadde No:54\nOğlananası-Menderes / İzmir",
    href: undefined,
  },
  { icon: Clock, label: "Çalışma Saatleri", value: "Pzt–Cuma: 08:00–18:00\nCumartesi: 09:00–14:00", href: undefined },
];

const social = [
  { icon: Linkedin, label: "LinkedIn", handle: "/company/zomak", href: "https://linkedin.com/company/zomak" },
  { icon: Globe, label: "Web", handle: "zomak.com.tr", href: "https://zomak.com.tr" },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    handle: "+90 541 129 01 02",
    href: "https://wa.me/905411290102?text=Merhaba%2C%20ZOMAK%27tan%20vin%C3%A7%2Fplatform%20hizmeti%20i%C3%A7in%20teklif%20almak%20istiyorum.",
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[--brand-charcoal] text-white py-20 relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-[--brand-red]" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-xs font-bold text-[--brand-red] tracking-widest uppercase mb-2">Bize Ulaşın</div>
          <h1 className="text-4xl md:text-5xl font-black uppercase text-white mb-3">İletişim</h1>
          <p className="text-gray-400 text-base max-w-2xl">
            Sorularınız, talepleriniz ve iş birliği teklifleriniz için ekibimiz hazır.
          </p>
        </div>
      </div>

      {/* Contact info cards */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {contactCards.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white border border-gray-200 rounded-sm p-5 hover:border-[--brand-red] group transition-colors"
              >
                <div className="w-10 h-10 bg-gray-100 group-hover:bg-[--brand-red]/10 flex items-center justify-center rounded-sm mb-3 transition-colors">
                  <info.icon className="w-5 h-5 text-[--brand-red]" />
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-[--brand-red] mb-1">{info.label}</div>
                {info.href ? (
                  <a href={info.href} className="text-sm font-medium text-gray-700 hover:text-[--brand-red] transition-colors whitespace-pre-line leading-relaxed">
                    {info.value}
                  </a>
                ) : (
                  <p className="text-sm font-medium text-gray-700 whitespace-pre-line leading-relaxed">{info.value}</p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Map + sidebar */}
      <section className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Map */}
            <div className="lg:col-span-2">
              <div className="text-xs font-bold text-[--brand-red] tracking-widest uppercase mb-2">Harita</div>
              <h2 className="text-2xl font-black uppercase text-gray-900 mb-5">Konumumuz</h2>
              <div className="w-full rounded-sm overflow-hidden border border-gray-200 shadow-sm">
                <iframe
                  src="https://www.google.com/maps?q=Atatürk+Mahallesi+4.+Cadde+No:54+Oğlananası+Menderes+İzmir&output=embed"
                  width="100%"
                  height="400"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ZOMAK Konum"
                />
              </div>
              <div className="mt-3 flex items-start gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4 text-[--brand-red] flex-shrink-0 mt-0.5" />
                <span>Atatürk Mahallesi 4. Cadde No:54 Oğlananası-Menderes / İzmir</span>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              {/* WhatsApp */}
              <div className="bg-[--brand-charcoal] text-white rounded-sm p-6">
                <div className="text-[10px] font-bold text-[--brand-red] uppercase tracking-widest mb-2">Hızlı İletişim</div>
                <h3 className="text-lg font-black uppercase mb-3">WhatsApp ile Yazın</h3>
                <p className="text-gray-400 text-sm mb-5 leading-relaxed">
                  Sorularınızı veya teklif talebinizi hızlıca iletmek için WhatsApp kullanabilirsiniz.
                </p>
                <a
                  href="https://wa.me/905411290102?text=Merhaba%2C%20ZOMAK%27tan%20vin%C3%A7%2Fplatform%20hizmeti%20i%C3%A7in%20teklif%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-green-700 hover:bg-green-600 text-white font-bold rounded-sm border-none uppercase h-11">
                    <MessageCircle className="mr-2 w-4 h-4" />
                    WhatsApp'a Yaz
                  </Button>
                </a>
                <a href="tel:05411290102" className="mt-2.5 block">
                  <Button variant="outline" className="w-full border-white/15 text-white hover:bg-white/10 font-bold rounded-sm uppercase h-11">
                    <Phone className="mr-2 w-4 h-4" />
                    Hemen Ara
                  </Button>
                </a>
              </div>

              {/* Teklif */}
              <div className="border border-[--brand-red]/30 rounded-sm p-6">
                <div className="text-[10px] font-bold text-[--brand-red] uppercase tracking-widest mb-2">Fiyat Talebi</div>
                <h3 className="text-lg font-black uppercase text-gray-900 mb-2">Teklif Alın</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">
                  Projenizi ayrıntılı olarak iletmek için formu doldurun.
                </p>
                <Link href="/teklif">
                  <Button className="w-full bg-[--brand-red] hover:bg-[--brand-red-light] text-white font-bold rounded-sm border-none uppercase">
                    Teklif Formu <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {/* Social */}
              <div className="bg-gray-50 border border-gray-200 rounded-sm p-6">
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-4">Sosyal Medya ve Web</div>
                <div className="space-y-3">
                  {social.map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-600 hover:text-[--brand-red] transition-colors group"
                    >
                      <div className="w-8 h-8 bg-white border border-gray-200 group-hover:border-[--brand-red]/30 flex items-center justify-center rounded-sm transition-colors">
                        <s.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold uppercase tracking-wide">{s.label}</div>
                        <div className="text-xs text-gray-400">{s.handle}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Hours */}
              <div className="bg-white border border-gray-200 rounded-sm p-6">
                <h4 className="font-bold uppercase text-xs tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  Çalışma Saatleri
                </h4>
                <div className="space-y-2 text-sm">
                  {[
                    { day: "Pazartesi – Cuma", hours: "08:00 – 18:00" },
                    { day: "Cumartesi", hours: "09:00 – 14:00" },
                    { day: "Pazar", hours: "Kapalı" },
                  ].map((r, i) => (
                    <div key={i} className="flex justify-between">
                      <span className="text-gray-500 text-xs">{r.day}</span>
                      <span className={`font-bold text-xs ${r.hours === "Kapalı" ? "text-gray-400" : "text-gray-900"}`}>{r.hours}</span>
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
