import { pool } from "../../config/db.js";
import { Wallet } from "../../models/budget-manager/wallet.model.js";

export async function getWalletsByUser(userId) {
  const result = await pool.query(
    `SELECT 
        w.*, 
        wg.goal,
        wb.annual_budget
     FROM wallets w
     LEFT JOIN wallet_goal wg ON w.id = wg.wallet_id
     LEFT JOIN wallet_budget wb ON w.id = wb.wallet_id
     WHERE w.user_id = $1 AND w.archived = false
     ORDER BY w.id`,
    [userId]
  );

  return result.rows.map((row) => new Wallet(row));
}

export async function getWalletById(walletId, userId) {
  const result = await pool.query(
    `SELECT 
        w.*, 
        wg.goal,
        wb.annual_budget
     FROM wallets w
     LEFT JOIN wallet_goal wg ON w.id = wg.wallet_id
     LEFT JOIN wallet_budget wb ON w.id = wb.wallet_id
     WHERE w.id = $1 AND w.user_id = $2`,
    [walletId, userId]
  );

  if (result.rows.length === 0) return null;
  return new Wallet(result.rows[0]);
}

export async function createWallet(userId, walletData) {
  const { name, type, balance, includeInNetWorth, color, icon } = walletData;

  const result = await pool.query(
    `INSERT INTO wallets (user_id, name, type, initial_balance, balance, include_net_worth, color, icon)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     RETURNING *`,
    [userId, name, type, balance, balance, includeInNetWorth, color, icon]
  );

  return new Wallet(result.rows[0]);
}

export async function archiveWalletById(walletId, userId) {
  const result = await pool.query(
    `UPDATE wallets 
     SET archived = true 
     WHERE id = $1 AND user_id = $2 
     RETURNING *`,
    [walletId, userId]
  );
  return result.rowCount > 0;
}
