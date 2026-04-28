import { useEffect } from "react";
import { Link } from "wouter";
import { useListFish } from "@workspace/api-client-react";

export default function Home() {
  useEffect(() => {
    document.title = "Fishy Spot | From the Sea to Your Plate";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Mumbai's freshest fish, sourced every morning from the docks and delivered to your home.");
  }, []);

  const { data: fishData, isLoading } = useListFish();
  const previewFish = fishData?.slice(0, 4) || [];

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-primary">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img 
            src="/hero.png" 
            alt="Mumbai dock fish counter" 
            className="w-full h-full object-cover animate-ken-burns opacity-60"
          />
          <div className="absolute inset-0 bg-primary/40 mix-blend-multiply"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center text-center text-primary-foreground">
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-medium mb-6 max-w-4xl tracking-tighter leading-[1.1]">
            The ocean's finest, <br className="hidden md:block"/> delivered daily.
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mb-12 font-light tracking-wide">
            Mumbai's freshest catch, sourced at dawn from local docks. 
            Prepared to your exact preference, never frozen.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto">
            <Link 
              href="/shop" 
              className="inline-flex h-14 items-center justify-center bg-background px-10 text-sm uppercase tracking-widest font-bold text-foreground transition-colors hover:bg-background/90 w-full sm:w-auto"
            >
              Shop Today's Catch
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center group">
              <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-4">01</span>
              <h3 className="font-serif text-2xl font-medium mb-3 group-hover:text-secondary transition-colors">Daily Catch</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">Sourced every morning from Sassoon Dock & Vashi Fish Market. Pure freshness.</p>
            </div>
            <div className="text-center group">
              <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-4">02</span>
              <h3 className="font-serif text-2xl font-medium mb-3 group-hover:text-secondary transition-colors">Expert Prep</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">Cleaned, deboned, or cut to your exact culinary requirements.</p>
            </div>
            <div className="text-center group">
              <span className="block text-xs uppercase tracking-widest text-muted-foreground mb-4">03</span>
              <h3 className="font-serif text-2xl font-medium mb-3 group-hover:text-secondary transition-colors">Direct to Door</h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">Delivered across Mumbai by evening. No middlemen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Catch Preview */}
      <section className="py-24 bg-accent/30 border-y border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 border-b border-border pb-6">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-medium mb-4">Today's Selection</h2>
              <p className="text-muted-foreground text-lg">A curated preview from this morning's haul.</p>
            </div>
            <Link href="/shop" className="text-xs uppercase tracking-widest font-semibold hover:text-secondary transition-colors pb-1">
              View full catalogue →
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-background rounded-none h-[320px] animate-pulse border border-border"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {previewFish.map((fish, index) => (
                <div key={fish.id} className="group bg-background border border-border hover:border-primary transition-all duration-300 flex flex-col items-center text-center p-8 relative overflow-hidden">
                  <div className="absolute top-4 right-4 text-xs font-medium text-muted-foreground">₹{fish.pricePerKg}/kg</div>
                  {index === 0 && <img src="/prawns.png" alt="Prawns" className="w-24 h-24 object-cover rounded-full mb-6 border border-border/50" />}
                  {index === 1 && <img src="/pomfret.png" alt="Pomfret" className="w-24 h-24 object-cover rounded-full mb-6 border border-border/50" />}
                  {index > 1 && <div className="text-5xl mb-8 opacity-80 mix-blend-luminosity grayscale">{fish.emoji}</div>}
                  <h3 className="font-serif text-xl font-medium mb-1">{fish.name}</h3>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-8">{fish.localName}</p>
                  
                  <Link href="/shop" className="mt-auto text-xs uppercase tracking-widest font-semibold border-b border-primary pb-1 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Add to Cart
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Editorial Story Section */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="flex-1 relative">
              <div className="aspect-[4/5] w-full max-w-md mx-auto overflow-hidden">
                <img src="/about-cleaning.png" alt="Preparation" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-background p-6 border border-border hidden md:block">
                <span className="font-serif text-2xl">Meticulous</span>
                <span className="block text-xs uppercase tracking-widest text-muted-foreground mt-2">Preparation</span>
              </div>
            </div>
            <div className="flex-1 max-w-lg">
              <h2 className="font-serif text-4xl md:text-5xl font-medium mb-8 leading-tight">Prepared with respect for the ingredient.</h2>
              <p className="text-muted-foreground text-base leading-relaxed mb-6">
                We believe that great seafood requires minimal intervention but maximum care. Every fish is inspected for clarity, firmness, and scent before it ever reaches our cutting boards.
              </p>
              <p className="text-muted-foreground text-base leading-relaxed mb-10">
                Our prep teams are trained to clean and portion your order with precision, ensuring that when it arrives at your kitchen, it's immediately ready for the pan.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold hover:text-secondary transition-colors">
                Our Philosophy <span className="text-lg leading-none">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}