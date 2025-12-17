import { pool } from "../config/db.js";

export async function getWallets(req, res) {
  try {
    const result = await pool.query(
      "SELECT id, name, initial_balance, balance FROM wallets WHERE user_id = $1",
      [req.userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
