import { useEffect } from "react";
import { Link } from "wouter";
import { useCart } from "../components/cart-context";
import { ShoppingBag, Trash2 } from "lucide-react";

export default function Cart() {
  useEffect(() => {
    document.title = "Your Cart | Fishy Spot";
  }, []);

  const { items, updateQuantity, removeItem, subtotal } = useCart();
  const deliveryCharge = subtotal >= 500 ? 0 : 40;
  const total = subtotal + deliveryCharge;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center mb-6 shadow-lg border border-border/20">
          <ShoppingBag className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="font-serif text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8 max-w-md">Looks like you haven't added any fresh catch to your cart yet. Let's fix that!</p>
        <Link href="/shop" className="bg-[#ff6b35] text-white px-8 py-3 rounded-lg font-medium hover:bg-[#ff6b35]/90 transition-colors shadow-lg">
          Browse Our Fish
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, idx) => (
            <div key={`${item.fishId}-${item.cut}-${idx}`} className="bg-card rounded-xl p-4 sm:p-6 border border-border/20 shadow-sm flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="text-4xl bg-background w-16 h-16 flex items-center justify-center rounded-lg border border-border/50 shrink-0">{item.emoji}</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm text-muted-foreground mb-1">Cut: {item.cut}</p>
                <div className="font-medium text-primary">₹{item.pricePerKg}/kg</div>
              </div>
              
              <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center bg-background rounded-md border border-border/50 p-1">
                  <button onClick={() => updateQuantity(item.fishId, item.cut, item.quantityKg - 0.5)} className="w-8 h-8 flex items-center justify-center text-xl text-foreground hover:bg-muted rounded">-</button>
                  <span className="font-medium text-sm w-12 text-center">{item.quantityKg.toFixed(1)} kg</span>
                  <button onClick={() => updateQuantity(item.fishId, item.cut, item.quantityKg + 0.5)} className="w-8 h-8 flex items-center justify-center text-xl text-foreground hover:bg-muted rounded">+</button>
                </div>
                
                <div className="font-bold text-lg w-20 text-right">₹{item.pricePerKg * item.quantityKg}</div>
                
                <button onClick={() => removeItem(item.fishId, item.cut)} className="text-muted-foreground hover:text-destructive transition-colors p-2" aria-label="Remove item">
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl p-6 border border-border/20 shadow-lg sticky top-28">
            <h2 className="font-serif text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span>
                  {deliveryCharge === 0 ? (
                    <span className="font-medium text-primary">
                      <span className="line-through text-muted-foreground mr-2">₹40</span>
                      FREE
                    </span>
                  ) : (
                    <span className="font-medium">₹{deliveryCharge}</span>
                  )}
                </span>
              </div>
              {subtotal < 500 && (
                <div className="text-xs text-primary/80 bg-primary/10 p-2 rounded">
                  Add items worth ₹{500 - subtotal} more for FREE delivery.
                </div>
              )}
              <div className="border-t border-border/50 pt-4 mt-4 flex justify-between items-center">
                <span className="font-bold text-lg">Total</span>
                <span className="font-bold text-2xl text-primary">₹{total}</span>
              </div>
            </div>
            
            <Link href="/checkout" className="block w-full text-center bg-[#ff6b35] text-white font-semibold py-4 rounded-lg hover:bg-[#ff6b35]/90 transition-colors shadow-lg shadow-[#ff6b35]/20 mb-4">
              Proceed to Checkout
            </Link>
            
            <p className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1">
              🔒 Safe & Secure | Cash on Delivery | Fresh Guaranteed
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}