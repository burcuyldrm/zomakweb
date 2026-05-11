import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/layout/page-hero";

const contactItems = [
  { icon: Phone, label: "Telefon", value: "0541 129 01 02", href: "tel:05411290102" },
  { icon: Mail, label: "E-posta", value: "info@zomak.com.tr", href: "mailto:info@zomak.com.tr" },
  { icon: MapPin, label: "Adres", value: "Atatürk Mahallesi 4. Cadde No:129\nOğlananası-Menderes / İzmir", href: undefined },
  { icon: Clock, label: "Çalışma Saatleri", value: "Pzt–Cmt: 08:00–18:00\nPazar: Kapalı", href: undefined },
];

const LAT = 38.0575;
const LNG = 27.1692;
const GMAPS_URL   = `https://www.google.com/maps/search/Atatürk+Mahallesi+4.+Cadde+No:129+Oğlananası+Menderes+İzmir`;
const GMAPS_EMBED = `https://maps.google.com/maps?q=Atatürk+Mahallesi+4.+Cadde+No:129+Oğlananası+Menderes+İzmir&t=&z=16&ie=UTF8&iwloc=&output=embed`;

export default function Contact() {
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

            {/* SOL — iletişim bilgileri */}
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

              <a href="https://wa.me/905411290102?text=Merhaba%2C%20ZOMAK%20Makine'den%20teklif%20almak%20istiyorum." target="_blank" rel="noopener noreferrer">
                <Button className="w-full bg-green-700 hover:bg-green-600 text-white font-bold rounded-sm border-none uppercase mt-2">
                  <MessageCircle className="mr-2 w-4 h-4" /> WhatsApp ile Yaz
                </Button>
              </a>
            </div>

            {/* SAĞ — harita */}
            <motion.div
              initial={{ opacity: 0, x: 15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="w-full rounded-sm overflow-hidden border border-gray-200 shadow-sm flex flex-col"
            >
              <iframe
                src={GMAPS_EMBED}
                width="100%"
                height="420"
                style={{ border: 0, display: "block" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="ZOMAK Makine Konum"
              />
              <a
                href={GMAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-center text-xs text-gray-400 hover:text-[#8B1A1A] py-1.5 bg-gray-50 border-t border-gray-200 transition-colors"
              >
                Google Maps'te görüntüle →
              </a>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
}
