import {
  getWalletsByUser,
  getWalletById,
} from "../../repositories/budget-manager/wallets.repository.js";

export async function listWallets(req, res) {
  try {
    const wallets = await getWalletsByUser(req.userId);
    res.json(wallets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}

export async function getWallet(req, res) {
  try {
    const wallet = await getWalletById(req.params.id, req.userId);
    if (!wallet) return res.status(404).json({ error: "Wallet not found" });
    res.json(wallet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Database error" });
  }
}
