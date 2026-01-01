import express from "express";
import {
  fetchTransactionById,
  fetchTransactionsByWallet,
  fetchTransactionsByTimeframe,
  addTransaction,
} from "../../controllers/budget-manager/transactions.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, fetchTransactionsByTimeframe);
router.post("/", authMiddleware, addTransaction);
router.get("/:id", authMiddleware, fetchTransactionById);
router.get("/wallet/:walletId", authMiddleware, fetchTransactionsByWallet);

export default router;
