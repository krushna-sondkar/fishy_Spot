import { useEffect } from "react";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact Us | Fishy Spot";
  }, []);

  return (
    <div className="container mx-auto px-4 py-24 max-w-5xl">
      <div className="text-center mb-20 border-b border-border pb-16">
        <h1 className="font-serif text-5xl md:text-6xl font-medium mb-6 text-primary tracking-tighter">Concierge</h1>
        <p className="text-lg text-muted-foreground font-light max-w-2xl mx-auto">
          For special requests, bulk orders, or questions about today's catch, our team is directly available.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16 mb-24">
        <div className="bg-accent/10 border border-border p-12 text-center md:text-left flex flex-col justify-center">
          <h2 className="font-serif text-3xl font-medium mb-4">Direct Line</h2>
          <p className="text-muted-foreground mb-10 leading-relaxed">
            The fastest way to reach us is via WhatsApp. We monitor the line throughout our operational hours.
          </p>
          <a 
            href="https://wa.me/919011295599"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center bg-primary px-10 text-xs uppercase tracking-widest font-bold text-primary-foreground transition-colors hover:bg-primary/90 w-full md:w-auto self-start mx-auto md:mx-0"
          >
            Message on WhatsApp
          </a>
        </div>

        <div className="space-y-8">
          <div className="border-b border-border pb-8">
            <h3 className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-4">Contact Detail</h3>
            <p className="font-serif text-2xl">+91 90112 95599</p>
          </div>
          <div className="border-b border-border pb-8">
            <h3 className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-4">Operational Hours</h3>
            <p className="font-serif text-2xl">Mon–Sat, 7 AM – 12 PM</p>
            <p className="text-sm text-muted-foreground mt-2">Evening delivery cutoff is 12 PM daily.</p>
          </div>
          <div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-muted-foreground mb-4">Social</h3>
            <a href="https://www.instagram.com/the_fishy_spot/" target="_blank" rel="noopener noreferrer" className="font-serif text-2xl hover:text-secondary transition-colors">
              @the_fishy_spot
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto text-center border-t border-border pt-20">
        <h2 className="text-xs uppercase tracking-widest font-bold text-primary mb-12">Current Delivery Network</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          <div>
            <h3 className="font-serif text-2xl font-medium mb-4 pb-4 border-b border-border">Mumbai</h3>
            <p className="text-sm text-muted-foreground leading-loose">
              Andheri, Bandra, Kurla, Chembur, Dadar, Worli, Powai, Mulund, Ghatkopar, Sion, Matunga, Vikhroli
            </p>
          </div>
          <div>
            <h3 className="font-serif text-2xl font-medium mb-4 pb-4 border-b border-border">Navi Mumbai</h3>
            <p className="text-sm text-muted-foreground leading-loose">
              Vashi, Kharghar, Belapur, Panvel, Airoli, Nerul, Turbhe, Sanpada, Koparkhairane, Ghansoli
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}