import { promises as fs } from "node:fs";
import path from "node:path";
import { logger } from "./logger";

export interface StoredOrder {
  orderId: string;
  createdAt: string;
  status: "pending" | "confirmed" | "delivered" | "cancelled";
  customer: {
    fullName: string;
    mobile: string;
    alternateMobile?: string;
    flat: string;
    building: string;
    street: string;
    area: string;
    landmark?: string;
    pincode: string;
  };
  items: Array<{
    fishId: string;
    name: string;
    emoji: string;
    pricePerKg: number;
    quantityKg: number;
    cut: "Whole Fish" | "Curry Cut" | "Fillet" | "Steak Cut";
    lineTotal: number;
  }>;
  deliverySlot: "Evening (4 PM - 7 PM)" | "Late Evening (7 PM - 9 PM)";
  specialInstructions?: string;
  subtotal: number;
  deliveryCharge: number;
  total: number;
}

const DATA_DIR = path.resolve(process.cwd(), "data");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

async function ensureFile(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.access(ORDERS_FILE);
  } catch {
    await fs.writeFile(ORDERS_FILE, "[]", "utf8");
  }
}

export async function readOrders(): Promise<StoredOrder[]> {
  await ensureFile();
  try {
    const raw = await fs.readFile(ORDERS_FILE, "utf8");
    const parsed = JSON.parse(raw) as StoredOrder[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    logger.error({ err }, "Failed to read orders.json, returning empty list");
    return [];
  }
}

export async function appendOrder(order: StoredOrder): Promise<void> {
  const orders = await readOrders();
  orders.push(order);
  await fs.writeFile(ORDERS_FILE, JSON.stringify(orders, null, 2), "utf8");
}
