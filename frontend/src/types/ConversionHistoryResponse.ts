export type ConversionHistoryResponse = {
  id: number;
  userId: string;
  cryptoId: string;
  cryptoName: string;
  quantity: number;
  convertedBrl: number;
  convertedUsd: number;
  createdAt: string;
};
