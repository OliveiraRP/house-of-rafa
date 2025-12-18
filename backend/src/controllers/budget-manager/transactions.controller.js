import {
  getTransactionsByUser,
  getTransactionById,
} from "../../repositories/budget-manager/transactions.repository.js";

export async function fetchTransactions(req, res) {
  try {
    const transactions = await getTransactionsByUser(req.userId);
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch transactions" });
  }
}

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
