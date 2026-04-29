import { Router } from "express";
import healthRouter from "./health";
import fishRouter from "./fish";
import ordersRouter from "./orders";

const router = Router();

router.use(healthRouter);
router.use(fishRouter);
router.use(ordersRouter);

export default router;
