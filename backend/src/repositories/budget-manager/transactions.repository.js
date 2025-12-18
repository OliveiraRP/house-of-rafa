import { pool } from "../../config/db.js";
import { Transaction } from "../../models/budget-manager/transaction.model.js";

export async function getTransactionsByUser(userId) {
  const result = await pool.query(
    `SELECT 
        t.*,
        CASE 
            WHEN t.type = 'income' THEN ti.wallet_id
            WHEN t.type = 'expense' THEN te.wallet_id
            ELSE NULL
        END AS wallet_id,
        tt.from_wallet_id,
        tt.to_wallet_id
     FROM transactions t
     LEFT JOIN transaction_income ti ON t.id = ti.transaction_id
     LEFT JOIN transaction_expense te ON t.id = te.transaction_id
     LEFT JOIN transaction_transfer tt ON t.id = tt.transaction_id
     WHERE t.user_id = $1
     ORDER BY t.date DESC, t.id DESC`,
    [userId]
  );

  return result.rows.map((row) => new Transaction(row));
}

export async function getTransactionById(transactionId, userId) {
  const result = await pool.query(
    `SELECT 
        t.*,
        ti.wallet_id AS wallet_id,
        te.wallet_id AS wallet_id,
        tt.from_wallet_id,
        tt.to_wallet_id
     FROM transactions t
     LEFT JOIN transaction_income ti ON t.id = ti.transaction_id
     LEFT JOIN transaction_expense te ON t.id = te.transaction_id
     LEFT JOIN transaction_transfer tt ON t.id = tt.transaction_id
     WHERE t.id = $1 AND t.user_id = $2`,
    [transactionId, userId]
  );

  if (result.rows.length === 0) return null;
  return new Transaction(result.rows[0]);
}
