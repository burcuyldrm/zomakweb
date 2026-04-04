import { Link, useLocation } from "wouter";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/7def00d3-5c30-412a-b6e3-ac4fa24678f5_1775312460306.jpeg";

const products = [
  { href: "/urunler/mobil-katlanir-vinc", label: "Mobil Katlanır Vinç" },
  { href: "/urunler/hidrolik-gozluklu-kurtarici", label: "Hidrolik Gözlüklü Kurtarıcı" },
  { href: "/urunler/hidrolik-kurtarici", label: "Hidrolik Kurtarıcı" },
  { href: "/urunler/ozel-hidrolik-makineler", label: "Özel Hidrolik Makineler" },
  { href: "/urunler/sepetli-platform", label: "Sepetli Platform" },
];

const kurumsal = [
  { href: "/kurumsal/hakkimizda", label: "Hakkımızda" },
  { href: "/kurumsal/kalite-politikamiz", label: "Kalite Politikamız" },
  { href: "/kurumsal/cevre-politikamiz", label: "Çevre Politikamız" },
];

function DropdownMenu({ label, items, isActive }: {
  label: string;
  items: { href: string; label: string }[];
  isActive: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={cn(
          "flex items-center gap-1 uppercase text-sm font-bold tracking-wide transition-colors hover:text-[#8B1A1A]",
          isActive ? "text-[#8B1A1A]" : "text-white/80"
        )}
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute top-full left-0 pt-2 min-w-[240px] z-50">
          <div className="bg-white border border-gray-200 shadow-lg py-1 rounded-sm">
            {items.map(({ href, label }) => (
              <Link key={href} href={href} onClick={() => setOpen(false)}>
                <span className="block px-5 py-2.5 text-sm text-gray-700 hover:text-[#8B1A1A] hover:bg-gray-50 transition-colors cursor-pointer border-b border-gray-100 last:border-0">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileAccordion({ label, items, onClose }: {
  label: string;
  items: { href: string; label: string }[];
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="w-full flex items-center justify-between px-6 py-3 text-sm font-bold uppercase border-b border-white/5 text-white/80 hover:text-white"
        onClick={() => setOpen(!open)}
      >
        {label}
        <ChevronDown className={cn("w-4 h-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="bg-white/5">
          {items.map(({ href, label }) => (
            <Link key={href} href={href} onClick={onClose}>
              <span className="block pl-10 pr-6 py-2.5 text-sm text-white/60 hover:text-[#8B1A1A] cursor-pointer border-b border-white/5 last:border-0">
                {label}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (prefix: string) => location.startsWith(prefix);

  return (
    <header className="fixed top-0 w-full z-50 flex flex-col">
      {/* Top contact strip */}
      <div className="bg-[#111111] text-white/60 py-1.5 px-4 hidden md:flex items-center justify-between text-xs border-b border-white/10">
        <span className="flex items-center gap-2">
          <Phone className="w-3 h-3 text-[#8B1A1A]" />
          <a href="tel:05411290102" className="hover:text-white transition-colors">0541 129 01 02</a>
        </span>
        <span>
          <a href="mailto:info@zomak.com.tr" className="hover:text-white transition-colors">info@zomak.com.tr</a>
          &nbsp;&nbsp;|&nbsp;&nbsp;İzmir, Türkiye
        </span>
      </div>

      {/* Main nav */}
      <nav className="bg-[#111111] px-4 md:px-8 py-4 flex items-center justify-between border-b-2 border-[#8B1A1A]/50 shadow-lg">
        {/* Logo */}
        <Link href="/">
          <div className="cursor-pointer flex items-center">
            <div className="bg-white px-4 py-2 rounded-sm shadow-sm">
              <img src={logoImg} alt="ZOMAK" className="h-11 w-auto object-contain" />
            </div>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7 text-sm font-bold tracking-wide">
          <Link href="/">
            <span className={cn("cursor-pointer uppercase transition-colors hover:text-[#8B1A1A]", location === "/" ? "text-[#8B1A1A]" : "text-white/80")}>
              Ana Sayfa
            </span>
          </Link>

          <DropdownMenu
            label="Kurumsal"
            items={kurumsal}
            isActive={isActive("/kurumsal")}
          />

          <DropdownMenu
            label="Ürünler"
            items={products}
            isActive={isActive("/urunler")}
          />

          <Link href="/referanslar">
            <span className={cn("cursor-pointer uppercase transition-colors hover:text-[#8B1A1A]", isActive("/referanslar") ? "text-[#8B1A1A]" : "text-white/80")}>
              Referanslar
            </span>
          </Link>

          <Link href="/galeri">
            <span className={cn("cursor-pointer uppercase transition-colors hover:text-[#8B1A1A]", isActive("/galeri") ? "text-[#8B1A1A]" : "text-white/80")}>
              Galeri
            </span>
          </Link>

          <Link href="/iletisim">
            <span className={cn("cursor-pointer uppercase transition-colors hover:text-[#8B1A1A]", isActive("/iletisim") ? "text-[#8B1A1A]" : "text-white/80")}>
              İletişim
            </span>
          </Link>
        </div>

        <div className="hidden md:flex">
          <Link href="/teklif">
            <Button size="sm" className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold px-6 rounded-sm border-none uppercase tracking-wide shadow-sm">
              Teklif Al
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-1"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menüyü aç/kapat"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#111111] border-t border-white/10 flex flex-col">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <span className="block px-6 py-3 text-sm font-bold uppercase border-b border-white/5 text-white/80 hover:text-white">
              Ana Sayfa
            </span>
          </Link>
          <MobileAccordion label="Kurumsal" items={kurumsal} onClose={() => setMobileOpen(false)} />
          <MobileAccordion label="Ürünler" items={products} onClose={() => setMobileOpen(false)} />
          <Link href="/referanslar" onClick={() => setMobileOpen(false)}>
            <span className="block px-6 py-3 text-sm font-bold uppercase border-b border-white/5 text-white/80 hover:text-white">
              Referanslar
            </span>
          </Link>
          <Link href="/galeri" onClick={() => setMobileOpen(false)}>
            <span className="block px-6 py-3 text-sm font-bold uppercase border-b border-white/5 text-white/80 hover:text-white">
              Galeri
            </span>
          </Link>
          <Link href="/iletisim" onClick={() => setMobileOpen(false)}>
            <span className="block px-6 py-3 text-sm font-bold uppercase border-b border-white/5 text-white/80 hover:text-white">
              İletişim
            </span>
          </Link>
          <div className="px-6 py-4">
            <Link href="/teklif" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold rounded-sm border-none uppercase">
                Teklif Al
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
