import { Router } from "express";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { listMyOrders } from "../controllers/order.controller.js";

const router = Router();
router.get("/", requireAuth, listMyOrders);

export default router;
