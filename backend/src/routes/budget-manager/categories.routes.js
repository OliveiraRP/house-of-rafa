import express from "express";
import { fetchAllCategories } from "../../controllers/budget-manager/categories.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, fetchAllCategories);

export default router;
