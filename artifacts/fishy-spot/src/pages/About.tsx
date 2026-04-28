import { useEffect } from "react";
import { Link } from "wouter";

export default function About() {
  useEffect(() => {
    document.title = "Our Story | Fishy Spot";
  }, []);

  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <div className="text-center mb-24">
        <h1 className="font-serif text-5xl md:text-7xl font-medium mb-8 text-primary tracking-tighter">The Pursuit of Freshness.</h1>
        <div className="w-16 h-[1px] bg-primary mx-auto mb-10"></div>
        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light max-w-3xl mx-auto">
          We believe that exceptional seafood shouldn't require a restaurant reservation or a 4 AM trip to the docks. It should simply arrive at your door, pristine and ready for the pan.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 items-center mb-32">
        <div className="order-2 md:order-1 space-y-6 text-muted-foreground leading-relaxed">
          <p>
            Fishy Spot was born from a frustration familiar to any coastal resident: why is it so difficult to get genuinely fresh fish from local waters without compromising your entire morning?
          </p>
          <p>
            Every day before dawn, our buyers are at Sassoon Dock and Vashi Fish Market. We bypass the secondary markets, the cold storage facilities, and the middlemen. We buy the catch straight off the boats, focusing strictly on quality, firmness, and clarity.
          </p>
          <p>
            Once secured, our preparation team takes over. Skilled mongers clean, debone, and portion the fish to exact culinary standards. By evening, it's in your kitchen. No freezing, no sitting on ice displays for days. Just honest, incredibly fresh seafood.
          </p>
        </div>
        <div className="order-1 md:order-2">
          <img src="/hero.png" alt="Mumbai Docks" className="w-full h-[500px] object-cover grayscale-[20%] sepia-[10%] border border-border" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 border-t border-b border-border py-16">
        <div className="text-center px-4">
          <span className="block text-xs uppercase tracking-widest text-primary font-bold mb-4">01. Source</span>
          <h3 className="font-serif text-2xl font-medium mb-4">Uncompromising</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">We reject more than we buy. Only the clearest eyes and firmest textures make it into our daily catalogue.</p>
        </div>
        <div className="text-center px-4 border-t md:border-t-0 md:border-l border-border pt-8 md:pt-0">
          <span className="block text-xs uppercase tracking-widest text-primary font-bold mb-4">02. Craft</span>
          <h3 className="font-serif text-2xl font-medium mb-4">Expertly Prepped</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">Our fishmongers treat the ingredient with respect, providing clean, professional cuts for immediate cooking.</p>
        </div>
        <div className="text-center px-4 border-t md:border-t-0 md:border-l border-border pt-8 md:pt-0">
          <span className="block text-xs uppercase tracking-widest text-primary font-bold mb-4">03. Time</span>
          <h3 className="font-serif text-2xl font-medium mb-4">Hours, not Days</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">From the ocean to your kitchen in a matter of hours. Time is the ultimate metric of seafood quality.</p>
        </div>
      </div>

      <div className="text-center">
        <p className="text-xs uppercase tracking-widest text-muted-foreground font-bold mb-6">Experience the difference</p>
        <Link href="/shop" className="inline-flex h-14 items-center justify-center bg-primary px-10 text-xs uppercase tracking-widest font-bold text-primary-foreground transition-colors hover:bg-primary/90">
          View Today's Catalogue
        </Link>
      </div>
    </div>
  );
}