import { useEffect } from "react";
import { Link } from "wouter";

export default function About() {
  useEffect(() => {
    document.title = "About Us | Fishy Spot";
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center mb-16">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-primary">We're Mumbaikars Who Love Fresh Fish</h1>
        <div className="w-24 h-1 bg-[#ff6b35] mx-auto rounded-full mb-8"></div>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
          Fishy Spot started with one simple idea — why should getting fresh fish be so hard? Every morning, we wake up before dawn, head to the docks, pick the freshest catch of the day, and bring it straight to your kitchen. No middlemen, no frozen stock, no compromise on freshness. Just pure, honest fish.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-card rounded-xl p-8 border border-border/20 shadow-lg text-center hover:-translate-y-1 transition-transform duration-300">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🌊</div>
          <h3 className="font-serif text-xl font-bold mb-2">Always Fresh</h3>
          <p className="text-sm text-muted-foreground">Sourced daily. Never frozen. If it's not fresh, we don't sell it.</p>
        </div>
        <div className="bg-card rounded-xl p-8 border border-border/20 shadow-lg text-center hover:-translate-y-1 transition-transform duration-300">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🔪</div>
          <h3 className="font-serif text-xl font-bold mb-2">Always Cleaned</h3>
          <p className="text-sm text-muted-foreground">Expertly cleaned and cut exactly to your preference, ready to cook.</p>
        </div>
        <div className="bg-card rounded-xl p-8 border border-border/20 shadow-lg text-center hover:-translate-y-1 transition-transform duration-300">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">🕐</div>
          <h3 className="font-serif text-xl font-bold mb-2">Always on Time</h3>
          <p className="text-sm text-muted-foreground">Reliable evening delivery to fit perfectly with your dinner prep.</p>
        </div>
      </div>

      <div className="bg-surface rounded-2xl p-8 md:p-12 text-center border border-border/20 relative overflow-hidden">
        <div className="absolute -top-10 -right-10 text-9xl opacity-5 pointer-events-none">🐟</div>
        <div className="absolute -bottom-10 -left-10 text-9xl opacity-5 pointer-events-none">🦐</div>
        
        <h2 className="font-serif text-2xl md:text-3xl font-bold mb-6 relative z-10">Our Roots</h2>
        <p className="text-lg text-muted-foreground mb-4 relative z-10">We source daily from Sassoon Dock, Mumbai and Vashi Fish Market, Navi Mumbai.</p>
        <p className="text-primary font-medium text-lg relative z-10">Serving: Mumbai & Navi Mumbai</p>
        
        <div className="mt-8 relative z-10">
          <Link href="/shop" className="inline-flex h-12 items-center justify-center rounded-lg bg-[#ff6b35] px-8 text-base font-semibold text-white transition-colors hover:bg-[#ff6b35]/90 shadow-lg shadow-[#ff6b35]/20">
            Taste the Difference
          </Link>
        </div>
      </div>
    </div>
  );
}