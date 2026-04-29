import { Router } from "express";
import { ListFishResponse } from "@workspace/api-zod";

const router = Router();

const FISH_CATALOGUE = [
  {
    id: "surmai",
    name: "Surmai",
    localName: "King Fish",
    category: "Sea Fish" as const,
    pricePerKg: 800,
    emoji: "🐟",
    description: "Rich, meaty — perfect for fry or curry",
    available: true,
  },
  {
    id: "pomfret",
    name: "Pomfret",
    localName: "Paplet",
    category: "Sea Fish" as const,
    pricePerKg: 950,
    emoji: "🫧",
    description: "Mumbai's favourite — silky smooth texture",
    available: true,
  },
  {
    id: "rawas",
    name: "Rawas",
    localName: "Indian Salmon",
    category: "Sea Fish" as const,
    pricePerKg: 600,
    emoji: "🐡",
    description: "Tender and flavourful, great for grilling",
    available: true,
  },
  {
    id: "bangda",
    name: "Bangda",
    localName: "Mackerel",
    category: "Sea Fish" as const,
    pricePerKg: 300,
    emoji: "🐠",
    description: "Bold flavour, best for masala fry",
    available: true,
  },
  {
    id: "bombil",
    name: "Bombil",
    localName: "Bombay Duck",
    category: "Sea Fish" as const,
    pricePerKg: 250,
    emoji: "🐟",
    description: "A Mumbai classic — crispy when fried",
    available: true,
  },
  {
    id: "halwa",
    name: "Halwa",
    localName: "Black Pomfret",
    category: "Sea Fish" as const,
    pricePerKg: 500,
    emoji: "🐡",
    description: "Soft, mild — loved by all ages",
    available: true,
  },
  {
    id: "kolambi",
    name: "Kolambi",
    localName: "Prawns",
    category: "Prawns & Shellfish" as const,
    pricePerKg: 700,
    emoji: "🦐",
    description: "Juicy fresh prawns for any recipe",
    available: true,
  },
  {
    id: "tisrya",
    name: "Tisrya",
    localName: "Clams",
    category: "Prawns & Shellfish" as const,
    pricePerKg: 200,
    emoji: "🦀",
    description: "Coastal flavour, great in coconut curry",
    available: true,
  },
  {
    id: "lobster",
    name: "Lobster",
    localName: "Lobster",
    category: "Speciality" as const,
    pricePerKg: 1500,
    emoji: "🦞",
    description: "Premium catch — limited availability",
    available: true,
  },
  {
    id: "squid",
    name: "Squid",
    localName: "Calamari",
    category: "Speciality" as const,
    pricePerKg: 400,
    emoji: "🐙",
    description: "Tender squid for fry or gravy",
    available: true,
  },
];

router.get("/fish", (_req: any, res: any) => {
  const data = ListFishResponse.parse(FISH_CATALOGUE);
  res.json(data);
});

export default router;
