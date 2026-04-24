import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import logoImg from "@assets/WhatsApp_Image_2026-04-19_at_21.54.01_1777040973552.jpeg";

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
  { href: "/kurumsal/arge-urge", label: "AR-GE & ÜR-GE" },
];

function DropdownMenu({
  label,
  href,
  items,
  isActive,
}: {
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
          <span className={cn(
            "cursor-pointer text-sm font-bold tracking-wide transition-colors hover:text-[#8B1A1A]",
            isActive ? "text-[#8B1A1A]" : "text-gray-800",
          )}>
            {label}
          </span>
        </Link>
        <button
          aria-label="Menüyü aç"
          className={cn(
            "p-0.5 transition-colors hover:text-[#8B1A1A]",
            isActive ? "text-[#8B1A1A]" : "text-gray-500",
          )}
          onClick={() => setOpen(!open)}
        >
          <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", open && "rotate-180")} />
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 pt-2 min-w-[240px] z-50">
          <div className="bg-white border border-gray-200 shadow-xl py-1 rounded-sm">
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

function MobileAccordion({
  label,
  href,
  items,
  onClose,
}: {
  label: string;
  href?: string;
  items: { href: string; label: string }[];
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex items-center border-b border-gray-100">
        {href ? (
          <Link href={href} onClick={onClose}>
            <span className="flex-1 block px-6 py-3 text-sm font-bold text-gray-800 hover:text-[#8B1A1A]">
              {label}
            </span>
          </Link>
        ) : (
          <span className="flex-1 px-6 py-3 text-sm font-bold text-gray-800">{label}</span>
        )}
        <button className="px-4 py-3 text-gray-500 hover:text-[#8B1A1A]" onClick={() => setOpen(!open)}>
          <ChevronDown className={cn("w-4 h-4 transition-transform", open && "rotate-180")} />
        </button>
      </div>
      {open && (
        <div className="bg-gray-50">
          {items.map(({ href, label }) => (
            <Link key={href} href={href} onClick={onClose}>
              <span className="block pl-10 pr-6 py-2.5 text-sm text-gray-600 hover:text-[#8B1A1A] cursor-pointer border-b border-gray-100 last:border-0">
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
    <header className="fixed top-0 w-full z-50">
      {/* ── MAIN NAV — fixed 90px height, overflow visible for logo ── */}
      <nav
        className="bg-white border-b-2 border-[#8B1A1A] shadow-sm"
        style={{ height: "80px" }}
      >
        <div
          className="h-full px-4 md:px-10 flex items-center justify-between"
        >
          {/* Logo */}
          <Link href="/" style={{ display: "flex", alignItems: "center" }}>
            <img
              src={logoImg as unknown as string}
              alt="ZOMAK"
              style={{
                height: "60px",
                width: "auto",
                objectFit: "contain",
                display: "block",
              }}
            />
          </Link>

          {/* Desktop — centered nav links */}
          <div className="hidden md:flex items-center gap-7 text-sm font-bold tracking-wide absolute left-1/2 -translate-x-1/2">
            <Link href="/">
              <span className={cn(
                "cursor-pointer transition-colors hover:text-[#8B1A1A]",
                location === "/" ? "text-[#8B1A1A]" : "text-gray-800",
              )}>
                ANA SAYFA
              </span>
            </Link>

            <DropdownMenu label="KURUMSAL" href="/kurumsal/hakkimizda" items={kurumsal} isActive={isActive("/kurumsal")} />
            <DropdownMenu label="ÜRÜNLER" href="/urunler" items={products} isActive={isActive("/urunler")} />

            <Link href="/referanslar">
              <span className={cn(
                "cursor-pointer transition-colors hover:text-[#8B1A1A]",
                isActive("/referanslar") ? "text-[#8B1A1A]" : "text-gray-800",
              )}>
                REFERANSLAR
              </span>
            </Link>

            <Link href="/galeri">
              <span className={cn(
                "cursor-pointer transition-colors hover:text-[#8B1A1A]",
                isActive("/galeri") ? "text-[#8B1A1A]" : "text-gray-800",
              )}>
                GALERİ
              </span>
            </Link>

            <Link href="/iletisim">
              <span className={cn(
                "cursor-pointer transition-colors hover:text-[#8B1A1A]",
                isActive("/iletisim") ? "text-[#8B1A1A]" : "text-gray-800",
              )}>
                İLETİŞİM
              </span>
            </Link>
          </div>

          {/* Right side — CTA + mobile toggle */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="hidden md:flex">
              <Link href="/teklif">
                <Button
                  size="sm"
                  className="bg-[#8B1A1A] hover:bg-[#A52020] text-white font-bold px-6 rounded-sm border-none tracking-wide shadow-sm"
                >
                  TEKLİF AL
                </Button>
              </Link>
            </div>

            <button
              className="md:hidden text-gray-800 p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menüyü aç/kapat"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 flex flex-col shadow-lg">
          <Link href="/" onClick={() => setMobileOpen(false)}>
            <span className="block px-6 py-3 text-sm font-bold border-b border-gray-100 text-gray-800 hover:text-[#8B1A1A]">
              ANA SAYFA
            </span>
          </Link>
          <MobileAccordion label="KURUMSAL" href="/kurumsal/hakkimizda" items={kurumsal} onClose={() => setMobileOpen(false)} />
          <MobileAccordion label="ÜRÜNLER" href="/urunler" items={products} onClose={() => setMobileOpen(false)} />
          <Link href="/referanslar" onClick={() => setMobileOpen(false)}>
            <span className="block px-6 py-3 text-sm font-bold border-b border-gray-100 text-gray-800 hover:text-[#8B1A1A]">
              REFERANSLAR
            </span>
          </Link>
          <Link href="/galeri" onClick={() => setMobileOpen(false)}>
            <span className="block px-6 py-3 text-sm font-bold border-b border-gray-100 text-gray-800 hover:text-[#8B1A1A]">
              GALERİ
            </span>
          </Link>
          <Link href="/iletisim" onClick={() => setMobileOpen(false)}>
            <span className="block px-6 py-3 text-sm font-bold border-b border-gray-100 text-gray-800 hover:text-[#8B1A1A]">
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
