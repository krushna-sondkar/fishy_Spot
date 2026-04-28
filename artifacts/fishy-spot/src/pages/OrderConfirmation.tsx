import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { Order } from "@workspace/api-client-react";

export default function OrderConfirmation() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  const orderId = searchParams.get("id");
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    document.title = "Order Confirmed | Fishy Spot";
    const savedOrder = sessionStorage.getItem("fishyspot-last-order");
    if (savedOrder) {
      try {
        setOrder(JSON.parse(savedOrder));
      } catch (e) {
        console.error("Failed to parse saved order", e);
      }
    }
  }, []);

  if (!orderId) {
    return (
      <div className="container mx-auto px-4 py-32 text-center">
        <h1 className="font-serif text-4xl font-medium tracking-tighter mb-6">Order Not Found</h1>
        <Link href="/shop" className="text-xs uppercase tracking-widest font-bold border-b border-primary pb-1 hover:text-secondary hover:border-secondary transition-colors">Return to Catalogue</Link>
      </div>
    );
  }

  const whatsappMsg = encodeURIComponent(`Hi! My Fishy Spot order ID is ${orderId}. Please confirm my order.`);
  const whatsappUrl = `https://wa.me/919011295599?text=${whatsappMsg}`;

  return (
    <div className="container mx-auto px-4 py-20 max-w-3xl">
      <div className="bg-accent/10 border border-border p-12 text-center flex flex-col items-center">
        <div className="w-16 h-16 border-2 border-primary rounded-full flex items-center justify-center mb-8">
          <div className="w-8 h-8 bg-primary rounded-full"></div>
        </div>
        
        <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4 tracking-tighter">Order Confirmed</h1>
        <p className="text-muted-foreground text-lg mb-10 font-light">Your selection has been received and will be prepared shortly.</p>
        
        <div className="border border-border p-6 mb-12 bg-background min-w-[250px]">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-medium">Order Reference</p>
          <p className="font-mono text-2xl font-medium text-primary">{orderId}</p>
        </div>

        {order && (
          <div className="w-full text-left bg-background border border-border p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-sans text-xs uppercase tracking-widest font-bold text-primary mb-4 border-b border-border pb-2">Delivery</h3>
                <p className="font-serif text-lg mb-2">{order.customer.fullName}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {order.customer.flat}, {order.customer.building}<br/>
                  {order.customer.street}, {order.customer.area}<br/>
                  {order.customer.pincode}
                </p>
                <p className="text-xs uppercase tracking-widest font-medium"><span className="text-muted-foreground">Timing:</span> {order.deliverySlot}</p>
              </div>
              <div>
                <h3 className="font-sans text-xs uppercase tracking-widest font-bold text-primary mb-4 border-b border-border pb-2">Summary</h3>
                <ul className="text-sm space-y-3 mb-6">
                  {order.items.map((item, i) => (
                    <li key={i} className="flex justify-between items-start border-b border-border/30 pb-3">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <span className="block text-xs text-muted-foreground mt-1">{item.quantityKg}kg • {item.cut}</span>
                      </div>
                      <span className="font-mono">₹{item.lineTotal}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-xs uppercase tracking-widest font-bold">Total</span>
                  <span className="font-mono text-lg font-bold text-primary">₹{order.total}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-6 w-full justify-center">
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-14 items-center justify-center bg-primary px-8 text-xs uppercase tracking-widest font-bold text-primary-foreground transition-colors hover:bg-primary/90 w-full sm:w-auto"
          >
            Track on WhatsApp
          </a>
          <Link 
            href="/shop"
            className="inline-flex h-14 items-center justify-center border border-border bg-transparent px-8 text-xs uppercase tracking-widest font-bold text-foreground transition-colors hover:bg-accent/50 w-full sm:w-auto"
          >
            Return to Catalogue
          </Link>
        </div>
      </div>
    </div>
  );
}