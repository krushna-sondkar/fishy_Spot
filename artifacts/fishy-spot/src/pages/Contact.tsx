import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact Us | Fishy Spot";
  }, []);

  return (
    <div className="container mx-auto px-4 py-16 max-w-5xl">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-primary">Get in Touch</h1>
        <p className="text-lg text-muted-foreground">We're here to help with your orders and special requests.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        <div className="bg-card rounded-xl p-6 border border-border/20 shadow-lg flex flex-col items-center text-center hover:border-primary/50 transition-colors">
          <div className="text-4xl mb-4">📱</div>
          <h3 className="font-serif text-lg font-bold mb-2">WhatsApp</h3>
          <a href="https://wa.me/919011295599" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">+91 90112 95599</a>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border/20 shadow-lg flex flex-col items-center text-center hover:border-primary/50 transition-colors">
          <div className="text-4xl mb-4">📸</div>
          <h3 className="font-serif text-lg font-bold mb-2">Instagram</h3>
          <a href="https://www.instagram.com/the_fishy_spot/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium">@the_fishy_spot</a>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border/20 shadow-lg flex flex-col items-center text-center hover:border-primary/50 transition-colors">
          <div className="text-4xl mb-4">🕐</div>
          <h3 className="font-serif text-lg font-bold mb-2">Order Hours</h3>
          <p className="text-muted-foreground text-sm font-medium">Monday–Saturday<br/>7 AM – 12 PM</p>
        </div>
        <div className="bg-card rounded-xl p-6 border border-border/20 shadow-lg flex flex-col items-center text-center hover:border-primary/50 transition-colors">
          <div className="text-4xl mb-4">🚚</div>
          <h3 className="font-serif text-lg font-bold mb-2">Delivery</h3>
          <p className="text-muted-foreground text-sm font-medium">Same day evening</p>
        </div>
      </div>

      <div className="bg-surface rounded-2xl p-8 md:p-12 border border-border/20 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
        <div className="text-center md:text-left">
          <h2 className="font-serif text-2xl md:text-3xl font-bold mb-2">Ready to order?</h2>
          <p className="text-muted-foreground">Drop us a message on WhatsApp for quick assistance.</p>
        </div>
        <a 
          href="https://wa.me/919011295599"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-14 items-center justify-center rounded-lg bg-[#ff6b35] px-10 text-lg font-semibold text-white transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-[#ff6b35]/20 gap-2 shrink-0 w-full md:w-auto"
        >
          <span>💬</span> Chat on WhatsApp
        </a>
      </div>

      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-2xl font-bold mb-6 text-center flex items-center justify-center gap-2">
          <span className="text-2xl">📍</span> Delivery Areas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left bg-card p-8 rounded-xl border border-border/20">
          <div>
            <h3 className="font-bold mb-2 text-primary">Mumbai</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Andheri, Bandra, Kurla, Chembur, Dadar, Worli, Powai, Mulund, Ghatkopar, Sion, Matunga, Vikhroli
            </p>
          </div>
          <div>
            <h3 className="font-bold mb-2 text-primary">Navi Mumbai</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Vashi, Kharghar, Belapur, Panvel, Airoli, Nerul, Turbhe, Sanpada, Koparkhairane, Ghansoli
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}