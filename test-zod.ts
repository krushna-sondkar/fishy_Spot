import { ListFishResponse } from "@workspace/api-zod";

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
    pricePerKg: 1200,
    emoji: "🐠",
    description: "Delicate, sweet flavor — excellent for steaming",
    available: true,
  },
  {
    id: "tiger-prawns",
    name: "Tiger Prawns",
    localName: "Kolambi",
    category: "Prawns & Shellfish" as const,
    pricePerKg: 950,
    emoji: "🦐",
    description: "Large, juicy — perfect for grilling or biryani",
    available: true,
  },
  {
    id: "bombil",
    name: "Bombay Duck",
    localName: "Bombil",
    category: "Sea Fish" as const,
    pricePerKg: 350,
    emoji: "🐟",
    description: "Soft, melt-in-mouth — best deep fried crisp",
    available: true,
  },
  {
    id: "crab",
    name: "Mud Crab",
    localName: "Khekda",
    category: "Prawns & Shellfish" as const,
    pricePerKg: 850,
    emoji: "🦀",
    description: "Sweet, tender meat — ideal for spicy gravies",
    available: true,
  },
  {
    id: "rawas",
    name: "Indian Salmon",
    localName: "Rawas",
    category: "Speciality" as const,
    pricePerKg: 1100,
    emoji: "🍣",
    description: "Firm, rich texture — excellent for tikkas",
    available: false,
  },
];

console.log("Parsing...");
const data = ListFishResponse.parse(FISH_CATALOGUE);
console.log("Success:", data.length);
