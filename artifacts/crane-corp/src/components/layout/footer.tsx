import { Link } from "wouter";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 border-t-4 border-[#c00]">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 bg-[#c00] flex items-center justify-center font-black text-2xl text-white">Z</div>
              <div>
                <div className="text-xl font-black tracking-widest">ZOMAK</div>
                <div className="text-[10px] text-[#c00] font-semibold tracking-widest uppercase">Vinç Platform Makina</div>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Zomak Vinç Platform ve Makina Sanayi olarak Türkiye ve dünya genelinde güvenilir kaldırma ve platform çözümleri sunuyoruz.
            </p>
            <div className="text-xl font-black text-[#c00] tracking-wider">Zirveye Odaklan</div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black uppercase tracking-widest text-sm mb-5 relative inline-block">
              Hızlı Bağlantılar
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#c00]" />
            </h4>
            <ul className="space-y-2 mt-2">
              {[
                { href: "/", label: "Ana Sayfa" },
                { href: "/hizmetler", label: "Hizmetler" },
                { href: "/filomuz", label: "Filomuz" },
                { href: "/referanslar", label: "Referanslar" },
                { href: "/galeri", label: "Galeri" },
                { href: "/iletisim", label: "İletişim" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href}>
                    <span className="text-gray-400 hover:text-[#c00] transition-colors cursor-pointer text-sm">
                      {label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-black uppercase tracking-widest text-sm mb-5 relative inline-block">
              Hizmetlerimiz
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#c00]" />
            </h4>
            <ul className="space-y-2 mt-2">
              {[
                "Mobil Katlanır Vinç",
                "Hidrolik Gözlüklü Kurtarıcı",
                "Hidrolik Kurtarıcı",
                "Özel Hidrolik Makineler",
                "Sepetli Platform",
              ].map((s) => (
                <li key={s}>
                  <Link href="/hizmetler">
                    <span className="text-gray-400 hover:text-[#c00] transition-colors cursor-pointer text-sm">{s}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-black uppercase tracking-widest text-sm mb-5 relative inline-block">
              İletişim
              <span className="absolute -bottom-2 left-0 w-8 h-0.5 bg-[#c00]" />
            </h4>
            <ul className="space-y-4 mt-2">
              <li className="flex gap-3 items-start">
                <MapPin className="w-4 h-4 text-[#c00] flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-sm">Atatürk Mahallesi 4. Cadde No:54 Oğlananası-Menderes / İzmir</span>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-[#c00] flex-shrink-0" />
                <a href="tel:05411290102" className="text-gray-400 hover:text-white text-sm">0541 129 01 02</a>
              </li>
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-[#c00] flex-shrink-0" />
                <a href="mailto:info@zomak.com.tr" className="text-gray-400 hover:text-white text-sm">info@zomak.com.tr</a>
              </li>
              <li>
                <a
                  href="https://wa.me/905411290102?text=Merhaba%2C%20ZOMAK%27tan%20vin%C3%A7%2Fplatform%20hizmeti%20i%C3%A7in%20teklif%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm font-bold px-4 py-2 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp ile Yaz
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Zomak Vinç Platform ve Makina Sanayi. Tüm hakları saklıdır.</p>
          <div className="flex gap-4">
            <Link href="/admin"><span className="hover:text-[#c00] cursor-pointer">Admin</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
