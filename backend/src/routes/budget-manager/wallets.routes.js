import express from "express";
import {
  listWallets,
  getWallet,
} from "../../controllers/budget-manager/wallets.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", listWallets);
router.get("/:id", getWallet);

export default router;
