import { Link, useLocation } from "wouter";
import {
  LayoutDashboard, Package, Building2, Image, Star,
  FileText, Settings, LogOut, Menu, X, Globe, ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import logoImg from "@assets/zomak-logo-nobg.png";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/urunler", label: "Ürünler", icon: Package },
  { href: "/admin/kurumsal", label: "Kurumsal", icon: Building2 },
  { href: "/admin/galeri", label: "Galeri", icon: Image },
  { href: "/admin/referanslar", label: "Referanslar", icon: Star },
  { href: "/admin/teklifler", label: "Teklifler", icon: FileText },
  { href: "/admin/ayarlar", label: "Ayarlar", icon: Settings },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (href: string) =>
    location === href || location.startsWith(href + "/");

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* ── Sidebar ─── */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-60 bg-white border-r border-gray-200 flex flex-col shadow-sm transform transition-transform duration-200 ease-in-out",
        "md:relative md:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Brand */}
        <div className="px-5 py-4 border-b border-gray-100">
          <Link href="/" onClick={() => setSidebarOpen(false)}>
            <div className="flex items-center gap-3 cursor-pointer group">
              <img
                src={logoImg as unknown as string}
                alt="ZOMAK"
                className="h-8 w-auto object-contain"
              />
              <div className="border-l border-gray-200 pl-3">
                <div className="text-[9px] font-bold text-gray-400 tracking-widest">YÖNETİM</div>
                <div className="text-xs font-black text-[#8B1A1A] tracking-wide">Admin Paneli</div>
              </div>
            </div>
          </Link>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center justify-between px-3 py-2.5 rounded-sm text-sm font-semibold transition-all cursor-pointer group",
                  isActive(item.href)
                    ? "bg-[#8B1A1A] text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <div className="flex items-center gap-2.5">
                  <item.icon className={cn(
                    "w-4 h-4 flex-shrink-0",
                    isActive(item.href) ? "text-white/80" : "text-gray-400 group-hover:text-gray-600"
                  )} />
                  {item.label}
                </div>
                {isActive(item.href) && (
                  <ChevronRight className="w-3.5 h-3.5 text-white/50" />
                )}
              </div>
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-3 border-t border-gray-100 space-y-0.5">
          <Link href="/" target="_blank">
            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-sm font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">
              <Globe className="w-4 h-4" />
              Siteyi Görüntüle
            </div>
          </Link>
          <Link href="/admin">
            <div className="flex items-center gap-2.5 px-3 py-2.5 rounded-sm text-sm font-semibold text-gray-500 hover:bg-red-50 hover:text-[#8B1A1A] cursor-pointer">
              <LogOut className="w-4 h-4" />
              Çıkış
            </div>
          </Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/30 md:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200 px-6 py-3.5 flex items-center gap-4">
          <button
            className="md:hidden text-gray-400 hover:text-gray-800"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex-1">
            <span className="text-gray-500 text-sm">
              ZOMAK Vinç Platform ve Makina Sanayi — İçerik Yönetim Sistemi
            </span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#8B1A1A] flex items-center justify-center">
              <span className="text-white text-xs font-black">A</span>
            </div>
            <span className="text-sm font-semibold text-gray-700 hidden sm:block">Admin</span>
          </div>
        </header>

        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
