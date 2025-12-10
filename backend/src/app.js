import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pkg;
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.post("/api/check-token", async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ error: "Token required" });

  try {
    const result = await pool.query(
      "SELECT username FROM users WHERE token = $1",
      [token]
    );
    if (result.rows.length === 0)
      return res.status(404).json({ error: "Invalid token" });
    res.json({ username: result.rows[0].username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
