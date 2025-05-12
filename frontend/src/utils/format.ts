export const formatDate = (date: string) =>
  new Date(date).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export const formatNumber = (value: string | number, digits: number) =>
  new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(Number(value));

export const formatCurrency = (
  value: string | number,
  currency: "USD" | "BRL"
) => {
  return new Intl.NumberFormat(
    currency === "USD" ? "en-US" : "pt-BR",
    {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 4,
    }
  ).format(Number(value));
};
