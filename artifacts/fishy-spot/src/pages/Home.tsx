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
      <section className="relative overflow-hidden bg-background pt-24 pb-32 text-center text-foreground z-0">
        {/* Animated Background Fish (CSS based) */}
        <div className="absolute inset-0 z-[-1] opacity-10 pointer-events-none">
          <div className="absolute top-20 left-[-10%] text-6xl animate-[swim_20s_linear_infinite]">🐟</div>
          <div className="absolute top-40 left-[-20%] text-5xl animate-[swim_25s_linear_infinite_delay-5s]">🐠</div>
          <div className="absolute top-60 left-[-15%] text-7xl animate-[swim_22s_linear_infinite_delay-10s]">🐡</div>
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
          <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-6 max-w-4xl tracking-tight leading-tight">
            From the Sea to Your Plate — <span className="text-[#ff6b35]">Fresh, Fast & at Your Door.</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
            Mumbai's freshest fish, sourced every morning from the docks and delivered to your home. No frozen stock. Ever.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-16 w-full sm:w-auto">
            <Link 
              href="/shop" 
              className="inline-flex h-14 items-center justify-center rounded-lg bg-[#ff6b35] px-8 text-lg font-semibold text-white transition-all hover:bg-[#ff6b35]/90 hover:scale-105 active:scale-95 shadow-lg shadow-[#ff6b35]/20 w-full sm:w-auto"
            >
              Shop Now
            </Link>
            <button 
              onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex h-14 items-center justify-center rounded-lg border-2 border-primary text-primary bg-transparent px-8 text-lg font-semibold transition-all hover:bg-primary/10 w-full sm:w-auto"
            >
              How It Works
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl text-sm md:text-base font-medium">
            <div className="flex items-center justify-center gap-2 bg-card/50 backdrop-blur rounded-lg p-3 border border-border/30">
              <span className="text-xl">✅</span> Daily Fresh Catch
            </div>
            <div className="flex items-center justify-center gap-2 bg-card/50 backdrop-blur rounded-lg p-3 border border-border/30">
              <span className="text-xl">🚚</span> Free Delivery above ₹500
            </div>
            <div className="flex items-center justify-center gap-2 bg-card/50 backdrop-blur rounded-lg p-3 border border-border/30">
              <span className="text-xl">🔪</span> Cleaned & Ready to Cook
            </div>
            <div className="flex items-center justify-center gap-2 bg-card/50 backdrop-blur rounded-lg p-3 border border-border/30">
              <span className="text-xl">💰</span> Best Market Prices
            </div>
          </div>
        </div>

        {/* Decorative wave SVG at bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-full h-[50px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,119.3,195,101.52,238.13,89.5,280.4,70.6,321.39,56.44Z" className="fill-surface"></path>
          </svg>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border/20 shadow-lg hover:-translate-y-2 transition-transform duration-300">
              <div className="text-4xl mb-4">🌊</div>
              <h3 className="font-serif text-xl font-bold mb-2">Daily Fresh Catch</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Sourced every morning from Sassoon Dock & Vashi Fish Market</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border/20 shadow-lg hover:-translate-y-2 transition-transform duration-300">
              <div className="text-4xl mb-4">🔪</div>
              <h3 className="font-serif text-xl font-bold mb-2">Cleaned & Cut Your Way</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Debone, fillet, or curry cut — you choose</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border/20 shadow-lg hover:-translate-y-2 transition-transform duration-300">
              <div className="text-4xl mb-4">🚪</div>
              <h3 className="font-serif text-xl font-bold mb-2">Doorstep Delivery</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Across Mumbai & Navi Mumbai, same day</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border/20 shadow-lg hover:-translate-y-2 transition-transform duration-300">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="font-serif text-xl font-bold mb-2">No Middlemen</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Direct from dock to door, best prices guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* Today's Catch Preview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-4">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-2">Today's Catch Preview</h2>
              <p className="text-muted-foreground text-lg">Fresh from the docks this morning.</p>
            </div>
            <Link href="/shop" className="text-primary hover:text-primary/80 font-medium inline-flex items-center gap-1 group">
              View All Fish <span className="group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="bg-card rounded-xl p-4 h-[300px] animate-pulse border border-border/20"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {previewFish.map(fish => (
                <div key={fish.id} className="bg-card rounded-xl p-4 border border-border/20 shadow-sm flex flex-col items-center text-center hover:border-primary/50 transition-colors">
                  <div className="text-6xl mb-4">{fish.emoji}</div>
                  <h3 className="font-serif text-lg font-bold truncate w-full">{fish.name}</h3>
                  <p className="text-muted-foreground text-sm italic mb-2 truncate w-full">{fish.localName}</p>
                  <div className="mt-auto font-bold text-primary mb-4">₹{fish.pricePerKg}/kg</div>
                  <Link href="/shop" className="w-full py-2 bg-primary/10 text-primary rounded-md font-medium hover:bg-primary/20 transition-colors text-sm">
                    Buy Now
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-surface">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-16">How It Works</h2>
          
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 relative max-w-5xl mx-auto">
            {/* Desktop Connector Line */}
            <div className="hidden md:block absolute top-1/2 left-1/4 right-1/4 h-1 bg-border/30 -z-0 -translate-y-1/2"></div>
            
            <div className="flex-1 bg-card rounded-xl p-6 border border-border/20 relative z-10 shadow-lg w-full">
              <div className="w-16 h-16 bg-primary/20 text-primary text-3xl rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/30">📱</div>
              <h3 className="font-serif font-bold text-lg mb-2">Step 1</h3>
              <p className="text-muted-foreground text-sm">Browse & add fish to cart by 12 PM</p>
            </div>
            
            <div className="flex-1 bg-card rounded-xl p-6 border border-border/20 relative z-10 shadow-lg w-full">
              <div className="w-16 h-16 bg-primary/20 text-primary text-3xl rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/30">🐟</div>
              <h3 className="font-serif font-bold text-lg mb-2">Step 2</h3>
              <p className="text-muted-foreground text-sm">We source, clean & pack fresh</p>
            </div>
            
            <div className="flex-1 bg-card rounded-xl p-6 border border-border/20 relative z-10 shadow-lg w-full">
              <div className="w-16 h-16 bg-primary/20 text-primary text-3xl rounded-full flex items-center justify-center mx-auto mb-4 border border-primary/30">🚚</div>
              <h3 className="font-serif font-bold text-lg mb-2">Step 3</h3>
              <p className="text-muted-foreground text-sm">Delivered to your door by evening</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12 text-center">What Mumbaikars Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border/20 shadow-lg hover:-translate-y-1 transition-transform duration-300">
              <div className="text-primary mb-4 text-xl">★★★★★</div>
              <p className="text-foreground italic mb-6 leading-relaxed">"The Surmai was so fresh — tasted like it came straight from the dock!"</p>
              <div className="text-sm">
                <span className="font-bold block">— Priya Mehta</span>
                <span className="text-muted-foreground">Andheri West</span>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border/20 shadow-lg hover:-translate-y-1 transition-transform duration-300">
              <div className="text-primary mb-4 text-xl">★★★★★</div>
              <p className="text-foreground italic mb-6 leading-relaxed">"Cleaned exactly how I asked. Saves so much time. Fishy Spot is amazing!"</p>
              <div className="text-sm">
                <span className="font-bold block">— Rahul Desai</span>
                <span className="text-muted-foreground">Kharghar</span>
              </div>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border/20 shadow-lg hover:-translate-y-1 transition-transform duration-300">
              <div className="text-primary mb-4 text-xl">★★★★★</div>
              <p className="text-foreground italic mb-6 leading-relaxed">"Best pomfret in years. Fresh, affordable, on time. Highly recommend!"</p>
              <div className="text-sm">
                <span className="font-bold block">— Sunita Nair</span>
                <span className="text-muted-foreground">Chembur</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Areas */}
      <section className="py-20 bg-surface">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-12">Our Delivery Areas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left bg-card p-8 rounded-xl border border-border/20 shadow-lg">
            <div>
              <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2"><span className="text-2xl">🏙️</span> Mumbai</h3>
              <p className="text-muted-foreground leading-loose">
                Andheri, Bandra, Kurla, Chembur, Dadar, Worli, Powai, Mulund, Ghatkopar, Sion, Matunga, Vikhroli
              </p>
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold mb-4 flex items-center gap-2"><span className="text-2xl">🌆</span> Navi Mumbai</h3>
              <p className="text-muted-foreground leading-loose">
                Vashi, Kharghar, Belapur, Panvel, Airoli, Nerul, Turbhe, Sanpada, Koparkhairane, Ghansoli
              </p>
            </div>
          </div>
          <p className="mt-8 text-muted-foreground">
            Don't see your area? <a href="https://wa.me/919011295599" className="text-primary hover:underline font-medium">WhatsApp us</a> — we're expanding!
          </p>
        </div>
      </section>
    </div>
  );
}