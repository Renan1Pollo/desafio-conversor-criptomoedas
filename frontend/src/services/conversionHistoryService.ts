import type { ConversionHistoryRequest } from "../types/ConversionHistoryRequest";
import type { ConversionHistoryResponse } from "../types/ConversionHistoryResponse";
import api from "./api";

const ENDPOINT = "/history";

/**
 * Envia uma nova conversão de criptomoeda para o backend.
 *
 * @param {ConversionHistoryRequest} request - Dados da conversão.
 * @returns {Promise<ConversionHistoryResponse>} Conversão registrada.
 */
export async function convertCrypto(
  request: ConversionHistoryRequest
): Promise<ConversionHistoryResponse> {
  try {
    const response = await api.post(ENDPOINT, request);
    return response.data.conversion;
  } catch (error: any) {
    throw new Error("Erro na conversão da criptomoeda.");
  }
}

/**
 * Retorna o histórico de conversões do usuário autenticado.
 *
 * @returns {Promise<ConversionHistoryResponse[]>} Lista de conversões.
 * @throws {Error} Se ocorrer falha na requisição.
 */
export async function getConversionHistory(): Promise<ConversionHistoryResponse[]> {
  try {
    const response = await api.get(ENDPOINT);
    console.log("response.data:", response.data);
    return response.data;
  } catch (error: any) {
    throw new Error("Erro ao buscar histórico de conversões.");
  }
}
