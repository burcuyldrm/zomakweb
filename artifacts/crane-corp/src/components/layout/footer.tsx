import { Link } from "wouter";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white pt-20 pb-10 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <div className="text-2xl font-black tracking-tighter mb-6 flex items-center gap-2">
              <div className="w-8 h-8 bg-primary flex items-center justify-center rounded-sm">
                <span className="text-primary-foreground text-xl">C</span>
              </div>
              CRANE<span className="text-primary">CORP</span>
            </div>
            <p className="text-gray-400 mb-6">
              Engineering lifting solutions for decades. We build the machinery that builds the world.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary"></span>
            </h4>
            <ul className="space-y-3">
              <li><Link href="/"><span className="text-gray-400 hover:text-primary transition-colors cursor-pointer">Home</span></Link></li>
              <li><Link href="/corporate"><span className="text-gray-400 hover:text-primary transition-colors cursor-pointer">Corporate</span></Link></li>
              <li><Link href="/products"><span className="text-gray-400 hover:text-primary transition-colors cursor-pointer">Products</span></Link></li>
              <li><Link href="/media"><span className="text-gray-400 hover:text-primary transition-colors cursor-pointer">Media & News</span></Link></li>
              <li><Link href="/contact"><span className="text-gray-400 hover:text-primary transition-colors cursor-pointer">Contact Us</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider relative inline-block">
              Products
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary"></span>
            </h4>
            <ul className="space-y-3">
              <li><Link href="/products?category=mobile-cranes"><span className="text-gray-400 hover:text-primary transition-colors cursor-pointer">Mobile Cranes</span></Link></li>
              <li><Link href="/products?category=tower-cranes"><span className="text-gray-400 hover:text-primary transition-colors cursor-pointer">Tower Cranes</span></Link></li>
              <li><Link href="/products?category=crawler-cranes"><span className="text-gray-400 hover:text-primary transition-colors cursor-pointer">Crawler Cranes</span></Link></li>
              <li><Link href="/products?category=truck-mounted"><span className="text-gray-400 hover:text-primary transition-colors cursor-pointer">Truck Mounted</span></Link></li>
              <li><Link href="/products?category=special-equipment"><span className="text-gray-400 hover:text-primary transition-colors cursor-pointer">Special Equipment</span></Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6 uppercase tracking-wider relative inline-block">
              Contact
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary"></span>
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span className="text-gray-400">123 Industrial Way, Heavy Machinery District, NY 10001</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span className="text-gray-400">+1 (800) 555-CRANE</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span className="text-gray-400">sales@cranecorp.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} CraneCorp Heavy Industries. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <Link href="/admin"><span className="hover:text-primary transition-colors cursor-pointer">Admin Portal</span></Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
