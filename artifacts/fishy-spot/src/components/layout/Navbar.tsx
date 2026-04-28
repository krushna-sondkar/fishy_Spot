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
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container mx-auto px-4 h-24 flex items-center justify-between">
        <Link href="/" onClick={closeMenu} className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="font-serif text-3xl font-medium tracking-tighter text-primary">Fishy Spot</span>
          </div>
          <span className="text-[9px] text-muted-foreground uppercase tracking-[0.2em] mt-1">From the Sea to Your Plate</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              className={`text-sm tracking-wide uppercase transition-colors hover:text-primary ${
                location === link.path ? "text-primary font-semibold" : "text-muted-foreground font-medium"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <Link href="/cart" className="relative p-2 text-foreground hover:text-primary transition-colors flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" strokeWidth={1.5} />
            <span className="text-sm font-medium uppercase tracking-wide hidden sm:block">Cart</span>
            {totalItems > 0 && (
              <span className="absolute top-0 left-4 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>
          <Link
            href="/shop"
            className="hidden sm:inline-flex h-11 items-center justify-center bg-primary px-8 text-xs uppercase tracking-widest font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Order Now
          </Link>
          
          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background absolute top-24 left-0 w-full p-6 flex flex-col gap-6 shadow-xl">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              href={link.path}
              onClick={closeMenu}
              className={`text-2xl font-serif p-2 ${
                location === link.path ? "text-primary" : "text-muted-foreground hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <Link
            href="/shop"
            onClick={closeMenu}
            className="inline-flex h-14 items-center justify-center bg-primary px-6 text-sm uppercase tracking-widest font-bold text-primary-foreground transition-colors hover:bg-primary/90 w-full mt-4"
          >
            Order Now
          </Link>
        </div>
      )}
    </header>
  );
}