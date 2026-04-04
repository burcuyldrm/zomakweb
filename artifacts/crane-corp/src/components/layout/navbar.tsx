import { Link, useLocation } from "wouter";
import { Menu, X, Phone } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/filomuz", label: "Filomuz" },
  { href: "/referanslar", label: "Referanslar" },
  { href: "/galeri", label: "Galeri" },
  { href: "/teklif", label: "Teklif Al" },
  { href: "/iletisim", label: "İletişim" },
];

export function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  return (
    <header className="fixed top-0 w-full z-50 flex flex-col">
      {/* Top strip */}
      <div className="bg-[#c00] text-white py-2 px-4 hidden md:flex items-center justify-between text-xs font-semibold tracking-wide">
        <span className="flex items-center gap-2">
          <Phone className="w-3.5 h-3.5" />
          0541 129 01 02
        </span>
        <span>info@zomak.com.tr &nbsp;|&nbsp; İzmir, Türkiye</span>
      </div>

      {/* Main nav */}
      <nav className="bg-black text-white px-4 md:px-8 py-4 flex items-center justify-between border-b border-white/10">
        {/* Logo */}
        <Link href="/">
          <div className="cursor-pointer flex items-center gap-3">
            <div className="w-9 h-9 bg-[#c00] flex items-center justify-center font-black text-xl text-white">
              Z
            </div>
            <div className="leading-none">
              <div className="text-xl font-black tracking-widest text-white">ZOMAK</div>
              <div className="text-[10px] font-semibold tracking-[0.2em] text-[#c00] uppercase">Vinç Platform Makina</div>
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-bold tracking-wide">
          {navLinks.filter(l => l.href !== "/teklif").map(({ href, label }) => (
            <Link key={href} href={href}>
              <span className={cn(
                "cursor-pointer uppercase transition-colors hover:text-[#c00]",
                isActive(href) ? "text-[#c00]" : "text-white/80"
              )}>
                {label}
              </span>
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/teklif">
            <Button className="bg-[#c00] hover:bg-red-700 text-white font-black px-6 rounded-none border-none">
              TEKLİF AL
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-white/10 flex flex-col py-2">
          {navLinks.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMobileOpen(false)}>
              <span className={cn(
                "block px-6 py-3 text-sm font-bold uppercase border-b border-white/5 cursor-pointer transition-colors",
                isActive(href) ? "text-[#c00]" : "text-white/80 hover:text-white"
              )}>
                {label}
              </span>
            </Link>
          ))}
          <div className="px-6 py-4">
            <a href="https://wa.me/905411290102" target="_blank" rel="noopener noreferrer">
              <Button className="w-full bg-[#c00] hover:bg-red-700 text-white font-black rounded-none">
                WhatsApp ile Yaz
              </Button>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
