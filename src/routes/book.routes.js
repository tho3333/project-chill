import { Router } from "express";
import { listBooks, getBook, createBook, updateBook, deleteBook } from "../controllers/book.controller.js";
import { requireAuth, requireAdmin } from "../middlewares/auth.middleware.js";

const router = Router();
router.get("/", listBooks);
router.get("/:id", getBook);
router.post("/", requireAuth, requireAdmin, createBook);
router.put("/:id", requireAuth, requireAdmin, updateBook);
router.delete("/:id", requireAuth, requireAdmin, deleteBook);

export default router;
