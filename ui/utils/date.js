export const toLocalISOString = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

export const shiftMonthSafe = (dateStr, monthsToShift) => {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split("-").map(Number);

  const newDate = new Date(y, m - 1 + monthsToShift, d, 12, 0, 0);

  if (newDate.getDate() !== d) {
    newDate.setDate(0);
  }

  return toLocalISOString(newDate);
};
