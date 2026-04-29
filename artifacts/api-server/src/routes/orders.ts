import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  CreateOrderBody,
  ListOrdersResponse,
  GetOrderStatsResponse,
} from "@workspace/api-zod";
import { appendOrder, readOrders, type StoredOrder } from "../lib/orderStore";

const router = Router();

router.get("/orders", async (_req: Request, res: Response) => {
  const orders = await readOrders();
  const sorted = [...orders].sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt),
  );
  const data = ListOrdersResponse.parse(sorted);
  res.json(data);
});

router.post("/orders", async (req: any, res: any) => {
  const parsed = CreateOrderBody.safeParse(req.body);
  if (!parsed.success) {
    res
      .status(400)
      .json({ success: false, error: "Invalid order", issues: parsed.error.issues });
    return;
  }

  const orderId = `FS-${Date.now()}`;
  const order: StoredOrder = {
    ...parsed.data,
    orderId,
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  await appendOrder(order);

  req.log.info({ orderId, total: order.total }, "Order placed");

  res.status(201).json({ success: true, orderId, order });
});

router.get("/orders/stats", async (_req: any, res: any) => {
  const orders = await readOrders();

  const totalOrders = orders.length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const fishMap = new Map<string, { name: string; emoji: string; totalKg: number }>();
  for (const order of orders) {
    for (const item of order.items) {
      const existing = fishMap.get(item.fishId);
      if (existing) {
        existing.totalKg += item.quantityKg;
      } else {
        fishMap.set(item.fishId, {
          name: item.name,
          emoji: item.emoji,
          totalKg: item.quantityKg,
        });
      }
    }
  }
  const popularFish = [...fishMap.values()]
    .sort((a, b) => b.totalKg - a.totalKg)
    .slice(0, 5);

  const areaMap = new Map<string, number>();
  for (const order of orders) {
    const a = order.customer.area;
    areaMap.set(a, (areaMap.get(a) ?? 0) + 1);
  }
  const areaBreakdown = [...areaMap.entries()]
    .map(([area, count]) => ({ area, count }))
    .sort((a, b) => b.count - a.count);

  const recentOrders = [...orders]
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
    .slice(0, 10);

  const payload = GetOrderStatsResponse.parse({
    totalOrders,
    totalRevenue,
    popularFish,
    areaBreakdown,
    recentOrders,
  });

  res.json(payload);
});

export default router;
