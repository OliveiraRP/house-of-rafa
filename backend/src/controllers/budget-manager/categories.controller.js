import { getAllCategories } from "../../repositories/budget-manager/categories.repository.js";

export async function fetchAllCategories(req, res) {
  try {
    const categories = await getAllCategories(req.userId);
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch categories" });
  }
}
