import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { Link } from "wouter";
import { CheckCircle2 } from "lucide-react";
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
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="font-serif text-3xl font-bold mb-4">No order specified</h1>
        <Link href="/shop" className="text-primary hover:underline">Return to Shop</Link>
      </div>
    );
  }

  const whatsappMsg = encodeURIComponent(`Hi! My Fishy Spot order ID is ${orderId}. Please confirm my order.`);
  const whatsappUrl = `https://wa.me/919011295599?text=${whatsappMsg}`;

  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <div className="bg-card rounded-2xl p-8 md:p-12 border border-border/20 shadow-xl text-center flex flex-col items-center">
        <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mb-6 animate-in zoom-in duration-500">
          <CheckCircle2 className="w-12 h-12 text-primary" />
        </div>
        
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Order Placed Successfully! 🎉</h1>
        <p className="text-muted-foreground text-lg mb-8">Our team will confirm your order within 30 minutes.</p>
        
        <div className="bg-background border border-primary/30 rounded-lg p-4 mb-8 inline-block">
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-1">Order ID</p>
          <p className="font-mono text-2xl font-bold text-primary">{orderId}</p>
        </div>

        {order && (
          <div className="w-full text-left bg-background rounded-lg p-6 border border-border/50 mb-8 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Delivery Details</h3>
                <p className="font-medium">{order.customer.fullName}</p>
                <p className="text-sm text-muted-foreground">
                  {order.customer.flat}, {order.customer.building}<br/>
                  {order.customer.street}, {order.customer.area}<br/>
                  {order.customer.pincode}
                </p>
                <p className="text-sm mt-2"><span className="text-muted-foreground">Slot:</span> {order.deliverySlot}</p>
              </div>
              <div>
                <h3 className="font-medium text-sm text-muted-foreground mb-1">Order Summary</h3>
                <ul className="text-sm space-y-1 mb-2">
                  {order.items.map((item, i) => (
                    <li key={i} className="flex justify-between">
                      <span>{item.quantityKg}kg {item.name}</span>
                      <span>₹{item.lineTotal}</span>
                    </li>
                  ))}
                </ul>
                <div className="border-t border-border/50 pt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span className="text-primary">₹{order.total}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-[#25D366] px-8 text-base font-semibold text-white transition-colors hover:bg-[#25D366]/90 shadow-lg w-full sm:w-auto gap-2"
          >
            <span>📱</span> Track on WhatsApp
          </a>
          <Link 
            href="/shop"
            className="inline-flex h-12 items-center justify-center rounded-lg border border-border bg-card px-8 text-base font-semibold text-foreground transition-colors hover:bg-muted w-full sm:w-auto"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}