import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";

import authRoutes from "./routes/auth.routes.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";
import walletsRoutes from "./routes/budget-manager/wallets.routes.js";
import transactionRoutes from "./routes/budget-manager/transactions.routes.js";

const app = express();

app.use(
  cors({
    origin: env.corsOrigins,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRoutes);

// Budget Manager
app.use("/api/v1/wallets", authMiddleware, walletsRoutes);
app.use("/api/v1/transactions", authMiddleware, transactionRoutes);

export default app;
