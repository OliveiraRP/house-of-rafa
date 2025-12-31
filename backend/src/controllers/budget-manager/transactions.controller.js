import {
  getTransactionById,
  getTransactionsByWallet,
  getTransactionsByTimeframe,
} from "../../repositories/budget-manager/transactions.repository.js";

export async function fetchTransactionById(req, res) {
  const transactionId = Number(req.params.id);
  if (isNaN(transactionId)) {
    return res.status(400).json({ error: "Invalid transaction ID" });
  }

  try {
    const transaction = await getTransactionById(transactionId, req.userId);
    if (!transaction) {
      return res.status(404).json({ error: "Transaction not found" });
    }
    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch transaction" });
  }
}

export async function fetchTransactionsByWallet(req, res) {
  const walletId = parseInt(req.params.walletId, 10);

  try {
    const transactions = await getTransactionsByWallet(walletId, req.userId);
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
}

export async function fetchTransactionsByTimeframe(req, res) {
  const { startDate, endDate } = req.query;

  try {
    const transactions = await getTransactionsByTimeframe(
      req.userId,
      startDate,
      endDate
    );
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
}
