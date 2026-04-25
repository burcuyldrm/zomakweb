import { Link } from "wouter";
import { Phone, Mail, MapPin, MessageCircle, Linkedin, ExternalLink } from "lucide-react";
import logoImg from "@assets/zomak-logo-nobg.png";

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-8 border-t-2 border-[#8B1A1A]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5 inline-block bg-white rounded-sm px-3 py-2">
              <img
                src={logoImg as unknown as string}
                alt="ZOMAK"
                className="h-36 w-auto object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Zomak Vinç Platform ve Makina Sanayi, Türkiye ve dünya genelinde kaldırma, kurtarıcı ve platform ekipmanları alanında güvenilir çözümler sunar.
            </p>
          </div>

          {/* Kurumsal + Hızlı Bağlantılar */}
          <div>
            <h4 className="font-bold tracking-widest text-[10px] text-gray-400 mb-4 pb-2 border-b border-white/10">
              KURUMSAL
            </h4>
            <ul className="space-y-2 mb-6">
              {[
                { href: "/kurumsal/hakkimizda", label: "Hakkımızda" },
                { href: "/kurumsal/kalite-politikamiz", label: "Kalite Politikamız" },
                { href: "/referanslar", label: "Referanslar" },
                { href: "/galeri", label: "Galeri" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>
                    <span className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ürünler */}
          <div>
            <h4 className="font-bold tracking-widest text-[10px] text-gray-400 mb-4 pb-2 border-b border-white/10">
              ÜRÜNLER
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/urunler/mobil-katlanir-vinc", label: "Mobil Katlanır Vinç" },
                { href: "/urunler/kurtarici", label: "Kurtarıcı" },
                { href: "/urunler/kayar-kasa", label: "Kayar Kasa" },
                { href: "/urunler/ozel-hidrolik-makineler", label: "Özel Hidrolik Makineler" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>
                    <span className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm">{label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* İletişim */}
          <div>
            <h4 className="font-bold tracking-widest text-[10px] text-gray-400 mb-4 pb-2 border-b border-white/10">
              İLETİŞİM
            </h4>
            <ul className="space-y-3">
              <li className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-[#8B1A1A] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm leading-relaxed">
                  Atatürk Mahallesi 4. Cadde No:54<br />Oğlananası-Menderes / İzmir
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-[#8B1A1A] flex-shrink-0" />
                <a href="tel:05411290102" className="text-gray-400 hover:text-white text-sm transition-colors">
                  0541 129 01 02
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-[#8B1A1A] flex-shrink-0" />
                <a href="mailto:info@zomak.com.tr" className="text-gray-400 hover:text-white text-sm transition-colors">
                  info@zomak.com.tr
                </a>
              </li>
              <li className="flex gap-3 items-center pt-1">
                <Linkedin className="w-4 h-4 text-[#8B1A1A] flex-shrink-0" />
                <a
                  href="https://www.linkedin.com/company/zomak-vin%C3%A7-platform-makina/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm flex items-center gap-1 transition-colors"
                >
                  LinkedIn <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://wa.me/905411290102?text=Merhaba%2C%20ZOMAK%20Makine'den%20teklif%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-700 hover:bg-green-600 text-white text-xs font-bold px-4 py-2 rounded-sm transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Zomak Vinç Platform ve Makina Sanayi. Tüm hakları saklıdır.</p>
          <Link href="/admin">
            <span className="hover:text-gray-300 cursor-pointer transition-colors">Admin</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
