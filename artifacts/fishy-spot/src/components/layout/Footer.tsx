import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-auto pt-20 pb-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <Link href="/" className="flex flex-col mb-6 inline-block">
              <span className="font-serif text-3xl font-medium tracking-tighter text-primary">Fishy Spot</span>
              <span className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] mt-2 block">From the Sea to Your Plate</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Mumbai's finest catch, sourced daily from local docks. Cleaned, prepped, and delivered with uncompromising quality.
            </p>
          </div>
          
          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-widest mb-6 text-primary">Navigation</h3>
            <ul className="space-y-4">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors text-sm">Home</Link></li>
              <li><Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors text-sm">Shop</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors text-sm">About</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-widest mb-6 text-primary">Contact</h3>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li>
                <a href="https://wa.me/919011295599" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors block mb-1">
                  +91 90112 95599
                </a>
                <span className="text-xs">WhatsApp support available</span>
              </li>
              <li>
                <a href="https://www.instagram.com/the_fishy_spot/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors block mb-1">
                  @the_fishy_spot
                </a>
                <span className="text-xs">Follow our daily catch</span>
              </li>
              <li>
                <span className="block mb-1 text-foreground">Mon–Sat, 7 AM – 12 PM</span>
                <span className="text-xs">Order cutoff times</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-xs font-semibold uppercase tracking-widest mb-6 text-primary">Delivery Network</h3>
            <div className="space-y-4">
              <div>
                <strong className="block text-sm font-medium text-foreground mb-1">Mumbai</strong>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Andheri, Bandra, Kurla, Chembur, Dadar, Worli, Powai, Mulund, Ghatkopar, Sion, Matunga, Vikhroli
                </p>
              </div>
              <div>
                <strong className="block text-sm font-medium text-foreground mb-1">Navi Mumbai</strong>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Vashi, Kharghar, Belapur, Panvel, Airoli, Nerul, Turbhe, Sanpada, Koparkhairane, Ghansoli
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Fishy Spot. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="uppercase tracking-wider">Fresh Fish Home Delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}