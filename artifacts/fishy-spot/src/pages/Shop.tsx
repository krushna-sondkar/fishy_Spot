import { useEffect, useState } from "react";
import { useListFish, FishCategory, CutPreference } from "@workspace/api-client-react";
import { useCart } from "../components/cart-context";
import { useToast } from "@/hooks/use-toast";

export default function Shop() {
  useEffect(() => {
    document.title = "Shop Today's Catch | Fishy Spot";
    document.querySelector('meta[name="description"]')?.setAttribute("content", "Order fresh fish before 12 PM for same-day evening delivery in Mumbai and Navi Mumbai.");
  }, []);

  const { data: fishData, isLoading } = useListFish();
  const [filter, setFilter] = useState<string>("All");
  const { addItem } = useCart();
  const { toast } = useToast();

  const filteredFish = fishData?.filter(fish => {
    if (filter === "All") return true;
    return fish.category === filter;
  }) || [];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-primary">Today's Fresh Catch</h1>
        <p className="text-muted-foreground text-lg">Order before 12 PM for same-day evening delivery</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {["All", FishCategory.Sea_Fish, FishCategory["Prawns_&_Shellfish"], FishCategory.Speciality].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full text-sm font-medium transition-colors border ${
              filter === cat 
                ? "bg-primary text-primary-foreground border-primary" 
                : "bg-card text-foreground border-border hover:border-primary/50"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="bg-card rounded-xl p-4 h-[400px] animate-pulse border border-border/20"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {filteredFish.map(fish => (
            <FishCard key={fish.id} fish={fish} onAdd={(item) => {
              addItem(item);
              toast({
                title: "Added to Cart",
                description: `${item.quantityKg}kg ${item.name} (${item.cut}) added to your cart.`,
              });
            }} />
          ))}
        </div>
      )}
    </div>
  );
}

function FishCard({ fish, onAdd }: { fish: any, onAdd: (item: any) => void }) {
  const [quantity, setQuantity] = useState(0.5);
  const [cut, setCut] = useState<CutPreference>(CutPreference.Whole_Fish);

  const increase = () => setQuantity(q => q + 0.5);
  const decrease = () => setQuantity(q => Math.max(0.5, q - 0.5));

  return (
    <div className={`bg-card rounded-xl p-4 md:p-6 border border-border/20 shadow-lg flex flex-col ${!fish.available ? "opacity-60" : ""}`}>
      <div className="text-6xl text-center mb-4">{fish.emoji}</div>
      <div className="flex justify-between items-start mb-1 gap-2">
        <h3 className="font-serif text-lg font-bold leading-tight flex-1">{fish.name}</h3>
        <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-sm whitespace-nowrap">{fish.category.split(" ")[0]}</span>
      </div>
      <p className="text-muted-foreground text-sm italic mb-2">{fish.localName}</p>
      
      <p className="text-xs text-muted-foreground mb-4 line-clamp-2 min-h-[2rem]">{fish.description}</p>
      
      <div className="font-bold text-primary text-xl mb-4">₹{fish.pricePerKg}/kg</div>
      
      <div className="mt-auto space-y-4">
        <div className="flex items-center justify-between bg-background rounded-md border border-border/50 p-1">
          <button onClick={decrease} disabled={!fish.available || quantity <= 0.5} className="w-8 h-8 flex items-center justify-center text-xl disabled:opacity-50 text-foreground hover:bg-muted rounded">-</button>
          <span className="font-medium text-sm w-12 text-center">{quantity.toFixed(1)} kg</span>
          <button onClick={increase} disabled={!fish.available} className="w-8 h-8 flex items-center justify-center text-xl disabled:opacity-50 text-foreground hover:bg-muted rounded">+</button>
        </div>

        <select 
          value={cut} 
          onChange={(e) => setCut(e.target.value as CutPreference)}
          disabled={!fish.available}
          className="w-full bg-background border border-border/50 text-foreground text-sm rounded-md p-2 focus:ring-primary focus:border-primary disabled:opacity-50"
        >
          {Object.values(CutPreference).map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <button 
          disabled={!fish.available}
          onClick={() => onAdd({
            fishId: fish.id,
            name: fish.name,
            emoji: fish.emoji,
            pricePerKg: fish.pricePerKg,
            quantityKg: quantity,
            cut
          })}
          className="w-full bg-[#ff6b35] text-white font-semibold py-3 rounded-md hover:bg-[#ff6b35]/90 transition-colors disabled:bg-muted disabled:text-muted-foreground disabled:cursor-not-allowed"
        >
          {fish.available ? "Add to Cart" : "Not Available Today"}
        </button>
      </div>
    </div>
  );
}