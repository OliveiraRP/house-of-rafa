import { pool } from "../../config/db.js";
import { Transaction } from "../../models/budget-manager/transaction.model.js";

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

export async function getTransactionsByWallet(walletId, userId) {
  const result = await pool.query(
    `SELECT 
        t.*,
        c.name AS category_name,
        c.icon AS category_icon,
        cg.color AS category_group_color,
        w_from.name AS from_wallet_name,
        w_to.name AS to_wallet_name,
        ti.wallet_id AS income_wallet,
        te.wallet_id AS expense_wallet,
        tt.from_wallet_id AS transfer_from,
        tt.to_wallet_id AS transfer_to,
        COALESCE(ti.wallet_id, te.wallet_id) AS wallet_id
     FROM transactions t
     LEFT JOIN categories c ON t.category_id = c.id
     LEFT JOIN category_groups cg ON c.category_group_id = cg.id
     LEFT JOIN transaction_income ti ON t.id = ti.transaction_id
     LEFT JOIN transaction_expense te ON t.id = te.transaction_id
     LEFT JOIN transaction_transfer tt ON t.id = tt.transaction_id
     LEFT JOIN wallets w_from ON tt.from_wallet_id = w_from.id
     LEFT JOIN wallets w_to ON tt.to_wallet_id = w_to.id
     WHERE t.user_id = $2 AND (
        ti.wallet_id = $1 OR 
        te.wallet_id = $1 OR 
        tt.from_wallet_id = $1 OR 
        tt.to_wallet_id = $1
     )
     ORDER BY t.date DESC, t.id DESC`,
    [walletId, userId]
  );

  return result.rows.map((row) => new Transaction(row));
}

export async function getTransactionsByTimeframe(userId, startDate, endDate) {
  let query = `
    SELECT 
        t.*,
        c.name AS category_name,
        c.icon AS category_icon,
        cg.color AS category_group_color,
        w_from.name AS from_wallet_name,
        w_to.name AS to_wallet_name,
        COALESCE(ti.wallet_id, te.wallet_id) AS wallet_id
     FROM transactions t
     LEFT JOIN categories c ON t.category_id = c.id
     LEFT JOIN category_groups cg ON c.category_group_id = cg.id
     LEFT JOIN transaction_income ti ON t.id = ti.transaction_id
     LEFT JOIN transaction_expense te ON t.id = te.transaction_id
     LEFT JOIN transaction_transfer tt ON t.id = tt.transaction_id
     LEFT JOIN wallets w_from ON tt.from_wallet_id = w_from.id
     LEFT JOIN wallets w_to ON tt.to_wallet_id = w_to.id
     WHERE t.user_id = $1`;

  const params = [userId];

  if (startDate && endDate) {
    params.push(startDate, endDate);
    query += ` AND t.date BETWEEN $2 AND $3`;
  }

  query += ` ORDER BY t.date DESC, t.id DESC`;

  const result = await pool.query(query, params);
  return result.rows.map((row) => new Transaction(row));
}

export async function createTransaction(userId, data) {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const mainRes = await client.query(
      `INSERT INTO transactions (user_id, amount, date, description, category_id, type, exclude_from_wallet)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id`,
      [
        userId,
        data.amount,
        data.date,
        data.description,
        data.categoryId,
        data.type,
        data.excludeFromWallet || false,
      ]
    );
    const transactionId = mainRes.rows[0].id;

    if (data.type === "expense") {
      await client.query(
        "INSERT INTO transaction_expense (transaction_id, wallet_id) VALUES ($1, $2)",
        [transactionId, data.walletId]
      );
      await client.query(
        "UPDATE wallets SET balance = balance - $1 WHERE id = $2 AND user_id = $3",
        [data.amount, data.walletId, userId]
      );
    } else if (data.type === "income") {
      await client.query(
        "INSERT INTO transaction_income (transaction_id, wallet_id) VALUES ($1, $2)",
        [transactionId, data.walletId]
      );
      await client.query(
        "UPDATE wallets SET balance = balance + $1 WHERE id = $2 AND user_id = $3",
        [data.amount, data.walletId, userId]
      );
    } else if (data.type === "transfer") {
      await client.query(
        "INSERT INTO transaction_transfer (transaction_id, from_wallet_id, to_wallet_id) VALUES ($1, $2, $3)",
        [transactionId, data.fromWalletId, data.toWalletId]
      );
      await client.query(
        "UPDATE wallets SET balance = balance - $1 WHERE id = $2 AND user_id = $3",
        [data.amount, data.fromWalletId, userId]
      );
      await client.query(
        "UPDATE wallets SET balance = balance + $1 WHERE id = $2 AND user_id = $3",
        [data.amount, data.toWalletId, userId]
      );
    }

    await client.query("COMMIT");
    return { id: transactionId, ...data };
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
}
