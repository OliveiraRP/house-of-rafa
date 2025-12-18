import express from "express";
import {
  fetchTransactions,
  fetchTransactionById,
} from "../../controllers/budget-manager/transactions.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, fetchTransactions);
router.get("/:id", authMiddleware, fetchTransactionById);

export default router;
