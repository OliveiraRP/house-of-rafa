import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { env } from "./config/env.js";

import authRoutes from "./routes/auth.routes.js";
import walletsRoutes from "./routes/wallets.routes.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

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
app.use("/api/v1/wallets", authMiddleware, walletsRoutes);

export default app;
