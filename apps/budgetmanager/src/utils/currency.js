export const formatEuro = (amount) => {
  const value = typeof amount === "string" ? parseFloat(amount) : amount;

  if (isNaN(value)) return "€0,00";

  const formattedNumber = new Intl.NumberFormat("pt-PT", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);

  return `€${formattedNumber}`;
};
