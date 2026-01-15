import express from "express";
import {
  fetchAllCategories,
  fetchCategoryGroups,
  createNewCategory,
} from "../../controllers/budget-manager/categories.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", authMiddleware, fetchAllCategories);
router.get("/groups", authMiddleware, fetchCategoryGroups);
router.post("/", authMiddleware, createNewCategory);

export default router;
