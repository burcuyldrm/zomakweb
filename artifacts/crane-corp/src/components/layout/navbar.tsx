import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/zomaklogo_1775318960943.png";

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

/* A dropdown that:
   – navigates to `href` when its label is clicked
   – shows submenu on hover or chevron-click
*/
function DropdownMenu({ label, href, items, isActive }: {
  label: string;
  href: string;
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
      <div className="flex items-center gap-0.5">
        <Link href={href}>
          <span
            className={cn(
              "cursor-pointer text-sm font-bold tracking-wide transition-colors hover:text-[#8B1A1A]",
              isActive ? "text-[#8B1A1A]" : "text-white/80"
            )}
          >
            {label}
          </span>
        </Link>
        <button
          aria-label="Menüyü aç"
          className={cn(
            "p-0.5 transition-colors hover:text-[#8B1A1A]",
            isActive ? "text-[#8B1A1A]" : "text-white/60"
          )}
          onClick={() => setOpen(!open)}
        >
          <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", open && "rotate-180")} />
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 pt-2 min-w-[240px] z-50">
          <div className="bg-white border border-gray-200 shadow-xl py-1 rounded-sm">
            <Link href={href} onClick={() => setOpen(false)}>
              <span className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-[#8B1A1A] border-b border-gray-100 uppercase tracking-widest cursor-pointer hover:bg-gray-50">
                Tümünü Gör
              </span>
            </Link>
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

function MobileAccordion({ label, href, items, onClose }: {
  label: string;
  href?: string;
  items: { href: string; label: string }[];
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center border-b border-white/5">
        {href ? (
          <Link href={href} onClick={onClose}>
            <span className="flex-1 block px-6 py-3 text-sm font-bold text-white/80 hover:text-white">
              {label}
            </span>
          </Link>
        ) : (
          <span className="flex-1 px-6 py-3 text-sm font-bold text-white/80">{label}</span>
        )}
        <button
          className="px-4 py-3 text-white/60 hover:text-white"
          onClick={() => setOpen(!open)}
        >
          <ChevronDown className={cn("w-4 h-4 transition-transform", open && "rotate-180")} />
        </button>
      </div>
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
      <div className="bg-[#0D0D0D] text-white/60 py-1.5 px-4 hidden md:flex items-center justify-between text-xs border-b border-white/10">
        <span className="flex items-center gap-2">
          <svg className="w-3 h-3 text-[#8B1A1A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
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
            <img
                src={logoImg as unknown as string}
                alt="ZOMAK"
                className="h-12 w-auto object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7 text-sm font-bold tracking-wide">
          <Link href="/">
            {/* Write uppercase explicitly to avoid Turkish i → I browser issue */}
            <span className={cn("cursor-pointer transition-colors hover:text-[#8B1A1A]", location === "/" ? "text-[#8B1A1A]" : "text-white/80")}>
              ANA SAYFA
            </span>
          </Link>

          <DropdownMenu
            label="KURUMSAL"
            href="/kurumsal/hakkimizda"
            items={kurumsal}
            isActive={isActive("/kurumsal")}
          />

          <DropdownMenu
            label="ÜRÜNLER"
            href="/urunler"
            items={products}
            isActive={isActive("/urunler")}
          />

          <Link href="/referanslar">
            <span className={cn("cursor-pointer transition-colors hover:text-[#8B1A1A]", isActive("/referanslar") ? "text-[#8B1A1A]" : "text-white/80")}>
              REFERANSLAR
            </span>
          </Link>

          <Link href="/galeri">
            {/* GALERİ — explicit Turkish uppercase (İ not I) */}
            <span className={cn("cursor-pointer transition-colors hover:text-[#8B1A1A]", isActive("/galeri") ? "text-[#8B1A1A]" : "text-white/80")}>
              GALERİ
            </span>
          </Link>

          <Link href="/iletisim">
            {/* İLETİŞİM — explicit Turkish uppercase */}
            <span className={cn("cursor-pointer transition-colors hover:text-[#8B1A1A]", isActive("/iletisim") ? "text-[#8B1A1A]" : "text-white/80")}>
              İLETİŞİM
            </span>
          </Link>
        </div>

        <div className="hidden md:flex">
          <Link href="/teklif">
            <Button size="sm" className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold px-6 rounded-sm border-none tracking-wide shadow-sm">
              TEKLİF AL
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
            <span className="block px-6 py-3 text-sm font-bold border-b border-white/5 text-white/80 hover:text-white">
              ANA SAYFA
            </span>
          </Link>
          <MobileAccordion label="KURUMSAL" href="/kurumsal/hakkimizda" items={kurumsal} onClose={() => setMobileOpen(false)} />
          <MobileAccordion label="ÜRÜNLER" href="/urunler" items={products} onClose={() => setMobileOpen(false)} />
          <Link href="/referanslar" onClick={() => setMobileOpen(false)}>
            <span className="block px-6 py-3 text-sm font-bold border-b border-white/5 text-white/80 hover:text-white">
              REFERANSLAR
            </span>
          </Link>
          <Link href="/galeri" onClick={() => setMobileOpen(false)}>
            <span className="block px-6 py-3 text-sm font-bold border-b border-white/5 text-white/80 hover:text-white">
              GALERİ
            </span>
          </Link>
          <Link href="/iletisim" onClick={() => setMobileOpen(false)}>
            <span className="block px-6 py-3 text-sm font-bold border-b border-white/5 text-white/80 hover:text-white">
              İLETİŞİM
            </span>
          </Link>
          <div className="px-6 py-4">
            <Link href="/teklif" onClick={() => setMobileOpen(false)}>
              <Button className="w-full bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold rounded-sm border-none">
                TEKLİF AL
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
