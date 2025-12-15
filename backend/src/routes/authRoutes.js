import express from "express";
import { API } from "../config/routes.js";
import { checkToken, getCurrentUser } from "../controllers/authController.js";

const router = express.Router();

router.post(API.CHECK_TOKEN, checkToken);
router.get(API.ME, getCurrentUser);

export default router;
