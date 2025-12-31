export const toLocalISOString = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const getEndDate = (startDateStr) => {
  if (!startDateStr) return null;
  const [y, m, d] = startDateStr.split("-").map(Number);
  const date = new Date(y, m - 1, d, 12, 0, 0);

  date.setMonth(date.getMonth() + 1);
  date.setDate(date.getDate() - 1);

  return toLocalISOString(date);
};
