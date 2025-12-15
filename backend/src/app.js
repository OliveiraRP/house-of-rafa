import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ROUTES } from "./config/routes.js";

import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(
  cors({
    origin: [ROUTES.HUB, ROUTES.BUDGET_MANAGER],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use(authRoutes);

export default app;
