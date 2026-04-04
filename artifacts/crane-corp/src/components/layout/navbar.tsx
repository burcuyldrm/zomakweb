import { Link, useLocation } from "wouter";
import { useListCategories } from "@workspace/api-client-react";
import { Menu, X, ChevronDown, Phone, Mail, Globe, Search } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);

  const { data: categories } = useListCategories();

  const isDark = location === "/" || location === "/corporate";

  return (
    <header className="fixed top-0 w-full z-50 flex flex-col">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground py-1.5 px-4 text-xs font-medium flex justify-between items-center hidden md:flex">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5" />
            <span>+1 (800) 555-CRANE</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5" />
            <span>sales@cranecorp.com</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/contact" className="hover:underline">Support</Link>
          <Link href="/contact" className="hover:underline">Dealer Network</Link>
          <div className="flex items-center gap-2 border-l border-primary-foreground/30 pl-4">
            <Globe className="w-3.5 h-3.5" />
            <button className="hover:underline font-bold">EN</button>
            <span className="text-primary-foreground/50">|</span>
            <button className="hover:underline text-primary-foreground/70">TR</button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={cn(
          "transition-colors duration-300 px-4 md:px-8 py-4 flex items-center justify-between border-b",
          isDark && !mobileMenuOpen && !megaMenuOpen
            ? "bg-background/80 backdrop-blur-md border-border/50 text-foreground"
            : "bg-background border-border text-foreground"
        )}
      >
        <Link href="/">
          <div className="text-2xl font-black tracking-tighter cursor-pointer flex items-center gap-2">
            <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-sm">
              <span className="text-primary-foreground text-xl">C</span>
            </div>
            CRANE<span className="text-primary">CORP</span>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 font-medium text-sm">
          <Link href="/">
            <span className={cn("hover:text-primary transition-colors cursor-pointer", location === "/" && "text-primary")}>
              HOME
            </span>
          </Link>
          
          <div 
            className="relative h-full flex items-center group"
            onMouseEnter={() => setMegaMenuOpen(true)}
            onMouseLeave={() => setMegaMenuOpen(false)}
          >
            <Link href="/products">
              <span className={cn("hover:text-primary transition-colors cursor-pointer flex items-center gap-1", location.startsWith("/products") && "text-primary")}>
                PRODUCTS <ChevronDown className="w-4 h-4" />
              </span>
            </Link>
            
            {/* Mega Menu */}
            {megaMenuOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-screen max-w-5xl bg-card border border-border shadow-xl p-8 grid grid-cols-4 gap-8 z-50">
                <div className="col-span-1 border-r border-border pr-8">
                  <h3 className="text-lg font-bold text-primary mb-4">Categories</h3>
                  <ul className="space-y-3">
                    {categories?.map((cat) => (
                      <li key={cat.id}>
                        <Link href={`/products?category=${cat.id}`}>
                          <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer block">
                            {cat.name}
                          </span>
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link href="/products">
                        <span className="text-foreground font-bold hover:text-primary transition-colors cursor-pointer block mt-4">
                          View All Products &rarr;
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="col-span-3 grid grid-cols-3 gap-6">
                  {categories?.slice(0, 3).map((cat) => (
                    <Link key={`img-${cat.id}`} href={`/products?category=${cat.id}`}>
                      <div className="group cursor-pointer">
                        <div className="aspect-[4/3] bg-muted rounded-md overflow-hidden mb-3">
                          <img 
                            src={cat.image || "/images/mobile-crane.png"} 
                            alt={cat.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <h4 className="font-bold group-hover:text-primary transition-colors">{cat.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{cat.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/corporate">
            <span className={cn("hover:text-primary transition-colors cursor-pointer", location === "/corporate" && "text-primary")}>
              CORPORATE
            </span>
          </Link>
          <Link href="/media">
            <span className={cn("hover:text-primary transition-colors cursor-pointer", location === "/media" && "text-primary")}>
              MEDIA
            </span>
          </Link>
          <Link href="/contact">
            <span className={cn("hover:text-primary transition-colors cursor-pointer", location === "/contact" && "text-primary")}>
              CONTACT
            </span>
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="icon" className="hover:text-primary">
            <Search className="w-5 h-5" />
          </Button>
          <Button>GET A QUOTE</Button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-b border-border p-4 flex flex-col gap-4">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <span className="block py-2 font-bold border-b border-border/50">HOME</span>
          </Link>
          <Link href="/products" onClick={() => setMobileMenuOpen(false)}>
            <span className="block py-2 font-bold border-b border-border/50">PRODUCTS</span>
          </Link>
          <Link href="/corporate" onClick={() => setMobileMenuOpen(false)}>
            <span className="block py-2 font-bold border-b border-border/50">CORPORATE</span>
          </Link>
          <Link href="/media" onClick={() => setMobileMenuOpen(false)}>
            <span className="block py-2 font-bold border-b border-border/50">MEDIA</span>
          </Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
            <span className="block py-2 font-bold">CONTACT</span>
          </Link>
          <Button className="w-full mt-4">GET A QUOTE</Button>
        </div>
      )}
    </header>
  );
}
