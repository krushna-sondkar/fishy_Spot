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
    deliverySlot: DeliverySlot["Evening_(4_PM_-_7_PM)"] as DeliverySlot,
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
    if (!formData.fullName.trim()) newErrors.fullName = "Required";
    if (!/^\d{10}$/.test(formData.mobile)) newErrors.mobile = "Valid 10-digit mobile required";
    if (!formData.flat.trim()) newErrors.flat = "Required";
    if (!formData.building.trim()) newErrors.building = "Required";
    if (!formData.street.trim()) newErrors.street = "Required";
    if (!formData.area) newErrors.area = "Required";
    if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = "Valid 6-digit pincode required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = () => {
    if (!validate()) {
      toast({ title: "Validation Error", description: "Please complete all required fields.", variant: "destructive" });
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

  const InputLabel = ({ children }: { children: React.ReactNode }) => (
    <label className="block text-xs uppercase tracking-widest font-medium text-muted-foreground mb-2">{children}</label>
  );

  const InputClasses = "w-full bg-transparent border-b border-border/50 pb-2 text-foreground focus:outline-none focus:border-primary transition-colors text-sm rounded-none";

  return (
    <div className="container mx-auto px-4 py-20 max-w-6xl">
      <div className="mb-16 border-b border-border pb-8">
        <h1 className="font-serif text-5xl font-medium tracking-tighter">Checkout</h1>
      </div>
      
      <div className="grid lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-16">
          
          <section>
            <h2 className="font-serif text-2xl font-medium mb-8">1. Personal Details</h2>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-8">
              <div>
                <InputLabel>Full Name *</InputLabel>
                <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className={`${InputClasses} ${errors.fullName ? 'border-destructive' : ''}`} />
                {errors.fullName && <p className="text-destructive text-xs mt-2">{errors.fullName}</p>}
              </div>
              <div>
                <InputLabel>Mobile Number *</InputLabel>
                <input type="tel" name="mobile" placeholder="10 digits" maxLength={10} value={formData.mobile} onChange={handleChange} className={`${InputClasses} ${errors.mobile ? 'border-destructive' : ''}`} />
                {errors.mobile && <p className="text-destructive text-xs mt-2">{errors.mobile}</p>}
              </div>
              <div className="md:col-span-2">
                <InputLabel>Alternate Number</InputLabel>
                <input type="tel" name="alternateMobile" maxLength={10} value={formData.alternateMobile} onChange={handleChange} className={InputClasses} />
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-medium mb-8">2. Delivery Address</h2>
            <div className="grid md:grid-cols-2 gap-x-8 gap-y-8">
              <div>
                <InputLabel>Flat/House # *</InputLabel>
                <input type="text" name="flat" value={formData.flat} onChange={handleChange} className={`${InputClasses} ${errors.flat ? 'border-destructive' : ''}`} />
                {errors.flat && <p className="text-destructive text-xs mt-2">{errors.flat}</p>}
              </div>
              <div>
                <InputLabel>Building/Society *</InputLabel>
                <input type="text" name="building" value={formData.building} onChange={handleChange} className={`${InputClasses} ${errors.building ? 'border-destructive' : ''}`} />
                {errors.building && <p className="text-destructive text-xs mt-2">{errors.building}</p>}
              </div>
              <div className="md:col-span-2">
                <InputLabel>Street/Locality *</InputLabel>
                <input type="text" name="street" value={formData.street} onChange={handleChange} className={`${InputClasses} ${errors.street ? 'border-destructive' : ''}`} />
                {errors.street && <p className="text-destructive text-xs mt-2">{errors.street}</p>}
              </div>
              <div>
                <InputLabel>Area *</InputLabel>
                <select name="area" value={formData.area} onChange={handleChange} className={`${InputClasses} ${errors.area ? 'border-destructive' : ''}`}>
                  <option value="">Select Area...</option>
                  {AREAS.map(a => <option key={a} value={a}>{a}</option>)}
                </select>
                {errors.area && <p className="text-destructive text-xs mt-2">{errors.area}</p>}
              </div>
              <div>
                <InputLabel>Pincode *</InputLabel>
                <input type="text" name="pincode" maxLength={6} value={formData.pincode} onChange={handleChange} className={`${InputClasses} ${errors.pincode ? 'border-destructive' : ''}`} />
                {errors.pincode && <p className="text-destructive text-xs mt-2">{errors.pincode}</p>}
              </div>
              <div className="md:col-span-2">
                <InputLabel>Landmark</InputLabel>
                <input type="text" name="landmark" value={formData.landmark} onChange={handleChange} className={InputClasses} />
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-serif text-2xl font-medium mb-8">3. Delivery Slot & Instructions</h2>
            <div className="space-y-8">
              <div>
                <InputLabel>Delivery Slot *</InputLabel>
                <div className="flex flex-col gap-4 mt-4">
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <div className="w-5 h-5 rounded-full border border-primary flex items-center justify-center shrink-0">
                      {formData.deliverySlot === DeliverySlot["Evening_(4_PM_-_7_PM)"] && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                    </div>
                    <input type="radio" name="deliverySlot" value={DeliverySlot["Evening_(4_PM_-_7_PM)"]} checked={formData.deliverySlot === DeliverySlot["Evening_(4_PM_-_7_PM)"]} onChange={handleChange} className="hidden" />
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">Evening (4 PM - 7 PM)</span>
                  </label>
                  <label className="flex items-center gap-4 cursor-pointer group">
                    <div className="w-5 h-5 rounded-full border border-primary flex items-center justify-center shrink-0">
                      {formData.deliverySlot === DeliverySlot["Late_Evening_(7_PM_-_9_PM)"] && <div className="w-2.5 h-2.5 bg-primary rounded-full"></div>}
                    </div>
                    <input type="radio" name="deliverySlot" value={DeliverySlot["Late_Evening_(7_PM_-_9_PM)"]} checked={formData.deliverySlot === DeliverySlot["Late_Evening_(7_PM_-_9_PM)"]} onChange={handleChange} className="hidden" />
                    <span className="text-sm font-medium group-hover:text-primary transition-colors">Late Evening (7 PM - 9 PM)</span>
                  </label>
                </div>
              </div>
              <div>
                <InputLabel>Special Instructions</InputLabel>
                <textarea name="specialInstructions" value={formData.specialInstructions} onChange={handleChange} rows={3} placeholder="Preparation notes, delivery instructions..." className="w-full bg-transparent border-b border-border/50 py-2 text-sm text-foreground focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
              </div>
            </div>
          </section>

        </div>
        
        <div className="lg:col-span-5">
          <div className="bg-accent/10 border border-border p-8 sticky top-32">
            <h2 className="font-sans text-xs uppercase tracking-widest font-bold mb-8 text-primary border-b border-border pb-4">Order Summary</h2>
            
            <ul className="space-y-4 mb-8">
              {items.map((item, i) => (
                <li key={i} className="flex justify-between items-start text-sm border-b border-border/30 pb-4">
                  <div className="pr-4">
                    <p className="font-medium font-serif text-lg">{item.name}</p>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mt-1">{item.quantityKg.toFixed(1)}kg • {item.cut}</p>
                  </div>
                  <span className="font-mono mt-1 shrink-0">₹{item.pricePerKg * item.quantityKg}</span>
                </li>
              ))}
            </ul>
            
            <div className="mb-8">
              <span className="block text-xs uppercase tracking-widest text-muted-foreground font-bold mb-3">Payment</span>
              <p className="text-sm font-medium border border-border px-4 py-3 inline-block">Cash on Delivery</p>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-mono">₹{subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Delivery</span>
                <span className={deliveryCharge === 0 ? "text-secondary font-medium" : "font-mono"}>
                  {deliveryCharge === 0 ? "COMPLIMENTARY" : `₹${deliveryCharge}`}
                </span>
              </div>
              <div className="flex justify-between items-center pt-6 mt-6 border-t border-border">
                <span className="text-xs uppercase tracking-widest font-bold">Total</span>
                <span className="font-mono text-2xl font-bold text-primary">₹{total}</span>
              </div>
            </div>
            
            <button 
              onClick={handlePlaceOrder}
              disabled={createOrder.isPending}
              className="w-full mt-10 bg-primary text-primary-foreground text-xs uppercase tracking-widest font-bold py-5 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {createOrder.isPending ? "Processing..." : "Confirm Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}