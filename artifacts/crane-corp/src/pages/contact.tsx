import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const contactItems = [
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
    value: "Pzt–Cuma: 08:00–18:00\nCumartesi: 09:00–14:00\nPazar: Kapalı",
    href: undefined,
  },
];

export default function Contact() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-[#111111] text-white py-8 relative">
        <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#8B1A1A]" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B1A1A]/40" />
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-base font-bold text-white tracking-widest mb-1">BİZE ULAŞIN</div>
          <h1 className="text-2xl font-black text-white mb-1 leading-tight">İLETİŞİM</h1>
          <p className="text-gray-400 text-sm max-w-2xl">
            Sorularınız, talepleriniz ve iş birliği teklifleriniz için ekibimiz hazır.
          </p>
        </div>
      </div>
      {/* Main content: info boxes left, map right */}
      <section className="py-14">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* LEFT — contact info boxes stacked vertically */}
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
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#8B1A1A] mb-1">
                      {item.label}
                    </div>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="font-medium text-gray-700 hover:text-[#8B1A1A] transition-colors whitespace-pre-line text-[16px]"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="font-medium text-gray-700 whitespace-pre-line text-[16px] text-justify">
                        {item.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Action buttons below info boxes */}
              <div className="mt-2">
                <a
                  href="https://wa.me/905411290102?text=Merhaba%2C%20ZOMAK%27tan%20vin%C3%A7%2Fplatform%20hizmeti%20i%C3%A7in%20teklif%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button className="w-full bg-green-700 hover:bg-green-600 text-white font-bold rounded-sm border-none uppercase">
                    <MessageCircle className="mr-2 w-4 h-4" />
                    WhatsApp
                  </Button>
                </a>
              </div>
            </div>

            {/* RIGHT — map (smaller) */}
            <div className="flex flex-col">
              <div className="text-[10px] font-bold text-[#8B1A1A] tracking-widest uppercase mb-2">Harita</div>
              <h2 className="text-2xl font-black uppercase text-gray-900 mb-4">Konumumuz</h2>
              <div className="w-full rounded-sm overflow-hidden border border-gray-200 shadow-sm flex-1">
                <iframe
                  src="https://www.google.com/maps?q=Atatürk+Mahallesi+4.+Cadde+No:54+Oğlananası+Menderes+İzmir&output=embed"
                  width="100%"
                  height="320"
                  style={{ border: 0, display: "block" }}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ZOMAK Konum"
                />
              </div>
              <div className="mt-3 flex items-start gap-2 text-sm text-gray-500">
                <MapPin className="w-4 h-4 text-[#8B1A1A] flex-shrink-0 mt-0.5" />
                <span>Atatürk Mahallesi 4. Cadde No:54 Oğlananası-Menderes / İzmir</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
