import { useEffect } from "react";
import { Link } from "wouter";
import { useCart } from "../components/cart-context";
import { ShoppingBag, X } from "lucide-react";

export default function Cart() {
  useEffect(() => {
    document.title = "Your Cart | Fishy Spot";
  }, []);

  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const deliveryCharge = subtotal >= 500 ? 0 : 40;
  const total = subtotal + deliveryCharge;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-32 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <ShoppingBag className="w-12 h-12 text-muted-foreground mb-8" strokeWidth={1} />
        <h1 className="font-serif text-4xl font-medium mb-4 tracking-tighter">Your cart is empty</h1>
        <p className="text-muted-foreground mb-10 max-w-md font-light">Our daily catch is waiting. Browse the catalogue to add fresh seafood to your order.</p>
        <Link href="/shop" className="bg-primary text-primary-foreground px-8 py-4 text-xs uppercase tracking-widest font-bold hover:bg-primary/90 transition-colors">
          Browse Catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-20 max-w-6xl">
      <div className="mb-16 border-b border-border pb-8">
        <h1 className="font-serif text-5xl font-medium tracking-tighter">Cart</h1>
      </div>
      
      <div className="grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="space-y-8">
            {items.map((item, idx) => (
              <div key={`${item.fishId}-${item.cut}-${idx}`} className="flex flex-col sm:flex-row gap-6 items-start sm:items-center py-6 border-b border-border/50">
                <div className="text-5xl shrink-0 opacity-80 mix-blend-luminosity bg-accent/20 w-24 h-24 flex items-center justify-center border border-border">
                  {item.emoji}
                </div>
                <div className="flex-1 w-full">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-2xl font-medium">{item.name}</h3>
                    <button onClick={() => removeItem(item.fishId, item.cut)} className="text-muted-foreground hover:text-destructive transition-colors">
                      <X className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
                    <span className="uppercase tracking-wider text-xs font-medium text-foreground">{item.cut}</span>
                    <span>₹{item.pricePerKg}/kg</span>
                  </div>
                  
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-4 border border-border px-4 py-2">
                      <button onClick={() => updateQuantity(item.fishId, item.cut, item.quantityKg - 0.5)} className="text-muted-foreground hover:text-primary transition-colors">-</button>
                      <span className="font-mono text-sm w-12 text-center">{item.quantityKg.toFixed(1)} kg</span>
                      <button onClick={() => updateQuantity(item.fishId, item.cut, item.quantityKg + 0.5)} className="text-muted-foreground hover:text-primary transition-colors">+</button>
                    </div>
                    <div className="font-mono text-lg text-foreground">₹{item.pricePerKg * item.quantityKg}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="lg:col-span-5 xl:col-span-4">
          <div className="bg-accent/10 border border-border p-8 sticky top-32">
            <h2 className="font-sans text-xs uppercase tracking-widest font-bold mb-8 text-primary border-b border-border pb-4">Order Summary</h2>
            
            <div className="space-y-4 mb-8 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-mono">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span>
                  {deliveryCharge === 0 ? (
                    <span className="font-medium text-secondary">COMPLIMENTARY</span>
                  ) : (
                    <span className="font-mono">₹{deliveryCharge}</span>
                  )}
                </span>
              </div>
              {subtotal < 500 && (
                <div className="text-xs text-secondary mt-2">
                  Add items worth ₹{500 - subtotal} more for complimentary delivery.
                </div>
              )}
              <div className="border-t border-border pt-6 mt-6 flex justify-between items-center">
                <span className="text-xs uppercase tracking-widest font-bold">Total</span>
                <span className="font-mono text-2xl font-bold text-primary">₹{total}</span>
              </div>
            </div>
            
            <Link href="/checkout" className="block w-full text-center bg-primary text-primary-foreground text-xs uppercase tracking-widest font-bold py-5 hover:bg-primary/90 transition-colors">
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}