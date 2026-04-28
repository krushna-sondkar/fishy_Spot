import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "../cart-context";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const { totalItems } = useCart();

  const closeMenu = () => setIsMobileMenuOpen(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/20 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link href="/" onClick={closeMenu} className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🐟</span>
            <span className="font-serif text-2xl font-bold text-primary">Fishy Spot</span>
          </div>
          <span className="text-[10px] text-muted-foreground uppercase tracking-widest pl-10 -mt-1">From the Sea to Your Plate</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === link.path ? "text-primary" : "text-muted-foreground"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-4">
          <Link href="/cart" className="relative p-2 text-foreground hover:text-primary transition-colors">
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
          <Link
            href="/shop"
            className="hidden sm:inline-flex h-10 items-center justify-center rounded-md bg-[#ff6b35] px-6 text-sm font-medium text-white transition-colors hover:bg-[#ff6b35]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Order Now
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border/20 bg-background absolute top-20 left-0 w-full p-4 flex flex-col gap-4 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={closeMenu}
              className={`text-lg font-medium p-2 rounded-md ${
                location === link.path ? "bg-primary/10 text-primary" : "text-foreground hover:bg-muted"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/shop"
            onClick={closeMenu}
            className="inline-flex h-12 items-center justify-center rounded-md bg-[#ff6b35] px-6 text-base font-medium text-white transition-colors hover:bg-[#ff6b35]/90 w-full mt-2"
          >
            Order Now
          </Link>
        </div>
      )}
    </header>
  );
}