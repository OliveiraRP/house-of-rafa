import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(
  cors({
    origin: ["http://192.168.1.85:5173", "http://192.168.1.85:5174"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api", authRoutes);

export default app;
