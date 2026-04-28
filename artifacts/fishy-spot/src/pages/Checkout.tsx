import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useCart } from "../components/cart-context";
import { useCreateOrder, DeliverySlot } from "@workspace/api-client-react";
import { useToast } from "@/hooks/use-toast";

const AREAS = [
  "Andheri", "Bandra", "Kurla", "Chembur", "Dadar", "Worli", "Powai", "Mulund", "Ghatkopar", "Sion", "Matunga", "Vikhroli",
  "Vashi", "Kharghar", "Belapur", "Panvel", "Airoli", "Nerul", "Turbhe", "Sanpada", "Koparkhairane", "Ghansoli"
];

export default function Checkout() {
  useEffect(() => {
    document.title = "Checkout | Fishy Spot";
  }, []);

  const [, setLocation] = useLocation();
  const { items, subtotal, clearCart } = useCart();
  const { toast } = useToast();
  const createOrder = useCreateOrder();

  const deliveryCharge = subtotal >= 500 ? 0 : 40;
  const total = subtotal + deliveryCharge;

  const [formData, setFormData] = useState({
    fullName: "",
    mobile: "",
    alternateMobile: "",
    flat: "",
    building: "",
    street: "",
    area: "",
    landmark: "",
    pincode: "",
    deliverySlot: DeliverySlot["Evening_(4_PM_-_7_PM)"],
    specialInstructions: ""
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (items.length === 0) {
      setLocation("/shop");
    }
  }, [items, setLocation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.fullName.trim()) newErrors.fullName = "Name is required";
    if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Valid 10-digit mobile is required";
    if (!formData.flat.trim()) newErrors.flat = "Flat/House # is required";
    if (!formData.building.trim()) newErrors.building = "Building/Society is required";
    if (!formData.street.trim()) newErrors.street = "Street/Locality is required";
    if (!formData.area) newErrors.area = "Area is required";
    if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Valid 6-digit pincode is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) {
      toast({ title: "Please check the form", description: "Some required fields are missing or invalid.", variant: "destructive" });
      return;
    }

    const orderItems = items.map(i => ({
      ...i,
      lineTotal: i.pricePerKg * i.quantityKg
    }));

    createOrder.mutate({
      data: {
        customer: {
          fullName: formData.fullName,
          mobile: formData.mobile,
          alternateMobile: formData.alternateMobile || undefined,
          flat: formData.flat,
          building: formData.building,
          street: formData.street,
          area: formData.area,
          landmark: formData.landmark || undefined,
          pincode: formData.pincode
        },
        items: orderItems,
        deliverySlot: formData.deliverySlot,
        specialInstructions: formData.specialInstructions || undefined,
        subtotal,
        deliveryCharge,
        total
      }
    }, {
      onSuccess: (res) => {
        sessionStorage.setItem("fishyspot-last-order", JSON.stringify(res.order));
        clearCart();
        setLocation(`/order-confirmation?id=${res.orderId}`);
      },
      onError: () => {
        toast({ title: "Order failed", description: "Could not place your order. Please try again.", variant: "destructive" });
      }
    });
  };

  if (items.length === 0) return null;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Checkout</h1>
      
      <div className="grid lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          
          {/* Personal Details */}
          <div className="bg-card rounded-xl p-6 border border-border/20 shadow-sm">
            <h2 className="font-serif text-xl font-bold mb-4 border-b border-border/50 pb-2">1. Personal Details</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Full Name *</label>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={`w-full bg-background border ${errors.fullName ? 'border-destructive' : 'border-border/50'} rounded-md p-2 text-foreground focus:ring-primary focus:border-primary`} />
                {errors.fullName && <p className="text-destructive text-xs mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Mobile Number *</label>
                <input type="tel" name="mobile" placeholder="10 digits" maxLength={10} value={formData.mobile} onChange={handleChange} className={`w-full bg-background border ${errors.mobile ? 'border-destructive' : 'border-border/50'} rounded-md p-2 text-foreground focus:ring-primary focus:border-primary`} />
                {errors.mobile && <p className="text-destructive text-xs mt-1">{errors.mobile}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Alternate Number (Optional)</label>
                <input type="tel" name="alternateMobile" maxLength={10} value={formData.alternateMobile} onChange={handleChange} className="w-full bg-background border border-border/50 rounded-md p-2 text-foreground focus:ring-primary focus:border-primary" />
              </div>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-card rounded-xl p-6 border border-border/20 shadow-sm">
            <h2 className="font-serif text-xl font-bold mb-4 border-b border-border/50 pb-2">2. Delivery Address</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Flat/House # *</label>
                <input type="text" name="flat" value={formData.flat} onChange={handleChange} className={`w-full bg-background border ${errors.flat ? 'border-destructive' : 'border-border/50'} rounded-md p-2 text-foreground focus:ring-primary focus:border-primary`} />
                {errors.flat && <p className="text-destructive text-xs mt-1">{errors.flat}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Building/Society *</label>
                <input type="text" name="building" value={formData.building} onChange={handleChange} className={`w-full bg-background border ${errors.building ? 'border-destructive' : 'border-border/50'} rounded-md p-2 text-foreground focus:ring-primary focus:border-primary`} />
                {errors.building && <p className="text-destructive text-xs mt-1">{errors.building}</p>}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Street/Locality *</label>
                <input type="text" name="street" value={formData.street} onChange={handleChange} className={`w-full bg-background border ${errors.street ? 'border-destructive' : 'border-border/50'} rounded-md p-2 text-foreground focus:ring-primary focus:border-primary`} />
                {errors.street && <p className="text-destructive text-xs mt-1">{errors.street}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Area *</label>
                <select name="area" value={formData.area} onChange={handleChange} className={`w-full bg-background border ${errors.area ? 'border-destructive' : 'border-border/50'} rounded-md p-2 text-foreground focus:ring-primary focus:border-primary`}>
                  <option value="">Select Area...</option>
                  {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                {errors.area && <p className="text-destructive text-xs mt-1">{errors.area}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Landmark (Optional)</label>
                <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} className="w-full bg-background border border-border/50 rounded-md p-2 text-foreground focus:ring-primary focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Pincode *</label>
                <input type="text" name="pincode" maxLength={6} value={formData.pincode} onChange={handleChange} className={`w-full bg-background border ${errors.pincode ? 'border-destructive' : 'border-border/50'} rounded-md p-2 text-foreground focus:ring-primary focus:border-primary`} />
                {errors.pincode && <p className="text-destructive text-xs mt-1">{errors.pincode}</p>}
              </div>
            </div>
          </div>

          {/* Delivery Slot & Instructions */}
          <div className="bg-card rounded-xl p-6 border border-border/20 shadow-sm">
            <h2 className="font-serif text-xl font-bold mb-4 border-b border-border/50 pb-2">3. Delivery & Instructions</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-muted-foreground">Delivery Slot *</label>
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-3 cursor-pointer p-3 border border-border/50 rounded-md bg-background hover:bg-background/80 transition-colors">
                    <input type="radio" name="deliverySlot" value={DeliverySlot["Evening_(4_PM_-_7_PM)"]} checked={formData.deliverySlot === DeliverySlot["Evening_(4_PM_-_7_PM)"]} onChange={handleChange} className="text-primary focus:ring-primary" />
                    <span>🕔 Evening (4 PM - 7 PM)</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer p-3 border border-border/50 rounded-md bg-background hover:bg-background/80 transition-colors">
                    <input type="radio" name="deliverySlot" value={DeliverySlot["Late_Evening_(7_PM_-_9_PM)"]} checked={formData.deliverySlot === DeliverySlot["Late_Evening_(7_PM_-_9_PM)"]} onChange={handleChange} className="text-primary focus:ring-primary" />
                    <span>🕖 Late Evening (7 PM - 9 PM)</span>
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1 text-muted-foreground">Special Instructions</label>
                <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} rows={3} placeholder="Any special requests? (e.g. extra cleaning, less spicy marination)" className="w-full bg-background border border-border/50 rounded-md p-2 text-foreground focus:ring-primary focus:border-primary resize-none"></textarea>
              </div>
            </div>
          </div>

        </div>
        
        {/* Right Sidebar - Summary & Payment */}
        <div className="lg:col-span-4">
          <div className="bg-card rounded-xl p-6 border border-border/20 shadow-lg sticky top-28 space-y-6">
            
            <div>
              <h2 className="font-serif text-xl font-bold mb-4">Items Summary</h2>
              <ul className="space-y-3">
                {items.map((item, i) => (
                  <li key={i} className="flex items-start justify-between text-sm">
                    <div className="flex gap-2">
                      <span className="text-lg">{item.emoji}</span>
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground text-xs">{item.quantityKg.toFixed(1)}kg • {item.cut}</p>
                      </div>
                    </div>
                    <span className="font-medium">₹{item.pricePerKg * item.quantityKg}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="border-t border-border/50 pt-4">
              <h2 className="font-serif text-xl font-bold mb-4">Payment Method</h2>
              <div className="bg-background border border-primary/30 p-4 rounded-md flex items-center gap-3 text-primary">
                <span className="text-xl">✅</span>
                <span className="font-medium">Cash on Delivery</span>
              </div>
            </div>

            <div className="border-t border-border/50 pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className={deliveryCharge === 0 ? "text-primary font-medium" : ""}>
                  {deliveryCharge === 0 ? "FREE" : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="flex justify-between items-center text-lg pt-2 mt-2 border-t border-border/50">
                <span className="font-bold">Total to Pay</span>
                <span className="font-bold text-primary text-2xl">₹{total}</span>
              </div>
            </div>
            
            <button 
              onClick={handlePlaceOrder}
              disabled={createOrder.isPending}
              className="w-full bg-[#ff6b35] text-white font-semibold py-4 rounded-lg hover:bg-[#ff6b35]/90 transition-all active:scale-[0.98] shadow-lg shadow-[#ff6b35]/20 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
            >
              {createOrder.isPending ? (
                <>
                  <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
                  Placing Order...
                </>
              ) : (
                "Place Order"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}