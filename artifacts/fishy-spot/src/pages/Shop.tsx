import { useEffect, useState } from "react";
import { useListFish, FishCategory, CutPreference } from "@workspace/api-client-react";
import { useCart } from "../components/cart-context";
import { useToast } from "@/hooks/use-toast";

export default function Shop() {
  useEffect(() => {
    document.title = "Shop Today's Catch | Fishy Spot";
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
    <div className="container mx-auto px-4 py-20 max-w-7xl">
      <div className="mb-16 border-b border-border pb-12">
        <h1 className="font-serif text-5xl md:text-6xl font-medium mb-6 text-primary tracking-tighter">Catalogue</h1>
        <p className="text-muted-foreground text-lg max-w-2xl font-light">
          The finest daily selection. Order before 12 PM for same-day evening delivery.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-16">
        {["All", FishCategory.Sea_Fish, FishCategory["Prawns_&_Shellfish"], FishCategory.Speciality].map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 text-xs uppercase tracking-widest font-medium transition-all border ${
              filter === cat 
                ? "bg-primary text-primary-foreground border-primary" 
                : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-primary"
            }`}
          >
            {cat.replace("_", " ")}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="bg-accent/20 h-[450px] animate-pulse border border-border"></div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredFish.map(fish => (
            <FishCard key={fish.id} fish={fish} onAdd={(item) => {
              addItem(item);
              toast({
                title: "Added to Cart",
                description: `${item.quantityKg}kg ${item.name} (${item.cut}) has been added.`,
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
    <div className={`bg-background border border-border flex flex-col transition-all duration-300 hover:shadow-xl hover:border-primary/30 ${!fish.available ? "opacity-50 grayscale" : ""}`}>
      <div className="p-8 pb-0 text-center flex flex-col items-center">
        <div className="text-6xl mb-6 mix-blend-luminosity opacity-80">{fish.emoji}</div>
        <div className="w-full text-left">
          <div className="flex justify-between items-baseline mb-2">
            <h3 className="font-serif text-2xl font-medium tracking-tight">{fish.name}</h3>
            <span className="text-xs uppercase tracking-wider text-muted-foreground">₹{fish.pricePerKg}/kg</span>
          </div>
          <p className="text-xs uppercase tracking-wider text-secondary mb-4">{fish.localName}</p>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 min-h-[4.5rem]">
            {fish.description}
          </p>
        </div>
      </div>
      
      <div className="mt-auto p-6 space-y-5 border-t border-border mt-6">
        <div className="flex items-center justify-between border-b border-border pb-4">
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Quantity</span>
          <div className="flex items-center gap-4">
            <button onClick={decrease} disabled={!fish.available || quantity <= 0.5} className="text-muted-foreground hover:text-primary transition-colors disabled:opacity-30">-</button>
            <span className="font-mono text-sm w-12 text-center">{quantity.toFixed(1)} kg</span>
            <button onClick={increase} disabled={!fish.available} className="text-muted-foreground hover:text-primary transition-colors disabled:opacity-30">+</button>
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-border pb-4">
          <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Prep</span>
          <select 
            value={cut} 
            onChange={(e) => setCut(e.target.value as CutPreference)}
            disabled={!fish.available}
            className="bg-transparent text-sm font-medium focus:outline-none text-right cursor-pointer disabled:cursor-not-allowed"
          >
            {Object.values(CutPreference).map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

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
          className="w-full bg-primary text-primary-foreground text-xs uppercase tracking-widest font-bold py-4 hover:bg-primary/90 transition-colors disabled:bg-muted disabled:text-muted-foreground"
        >
          {fish.available ? "Add to Cart" : "Sold Out"}
        </button>
      </div>
    </div>
  );
}