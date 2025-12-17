import express from "express";
import { getWallets } from "../controllers/wallets.controller.js";

const router = express.Router();

router.get("/", getWallets);

export default router;
