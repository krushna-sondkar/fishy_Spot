import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-card border-t border-border/20 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link href="/" className="flex flex-col mb-4 inline-block">
              <div className="flex items-center gap-2">
                <span className="text-3xl">🐟</span>
                <span className="font-serif text-2xl font-bold text-primary">Fishy Spot</span>
              </div>
              <span className="text-[10px] text-muted-foreground uppercase tracking-widest pl-10 -mt-1">From the Sea to Your Plate</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Sourced fresh daily. Delivered with love. 🐟
            </p>
          </div>
          
          <div>
            <h3 className="font-serif font-semibold mb-4 text-foreground text-lg">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">Home</Link></li>
              <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors text-sm">Shop</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-serif font-semibold mb-4 text-foreground text-lg">Contact Us</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span>📱</span>
                <a href="https://wa.me/919011295599" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  +91 90112 95599
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>📸</span>
                <a href="https://www.instagram.com/the_fishy_spot/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                  @the_fishy_spot
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span>🕐</span>
                Mon–Sat, 7 AM – 12 PM
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-serif font-semibold mb-4 text-foreground text-lg">Delivery Areas</h3>
            <p className="text-sm text-muted-foreground mb-2">
              <strong>Mumbai:</strong> Andheri, Bandra, Kurla, Chembur, Dadar, Worli, Powai, Mulund, Ghatkopar, Sion, Matunga, Vikhroli
            </p>
            <p className="text-sm text-muted-foreground">
              <strong>Navi Mumbai:</strong> Vashi, Kharghar, Belapur, Panvel, Airoli, Nerul, Turbhe, Sanpada, Koparkhairane, Ghansoli
            </p>
          </div>
        </div>
        
        <div className="border-t border-border/20 mt-12 pt-8 text-center text-sm text-muted-foreground flex flex-col items-center">
          <p>© 2025 Fishy Spot. Fresh Fish Home Delivery — Mumbai & Navi Mumbai.</p>
        </div>
      </div>
    </footer>
  );
}