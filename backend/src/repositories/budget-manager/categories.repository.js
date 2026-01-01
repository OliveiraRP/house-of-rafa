import { pool } from "../../config/db.js";

export async function getAllCategories(userId) {
  const result = await pool.query(
    `SELECT 
        c.id,
        c.category_group_id,
        c.name,
        c.icon,
        c.exclude_from_overview,
        cg.color,
        cg.type as group_type
     FROM categories c
     JOIN category_groups cg ON c.category_group_id = cg.id
     WHERE cg.user_id = $1
     ORDER BY cg.name ASC, c.name ASC`,
    [userId]
  );

  return result.rows;
}
