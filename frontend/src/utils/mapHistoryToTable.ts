import type { ConversionHistoryResponse } from "../types/ConversionHistoryResponse";
import { formatDate, formatNumber, formatCurrency } from "./format";

export const mapHistoryToTable = (
  history: ConversionHistoryResponse[]
) => {
  return history.map((item) => ({
    date: formatDate(item.createdAt),
    crypto: item.cryptoName,
    quantity: formatNumber(item.quantity, 8),
    usdValue: formatCurrency(item.convertedUsd, "USD"),
    brlValue: formatCurrency(item.convertedBrl, "BRL"),
  }));
};
