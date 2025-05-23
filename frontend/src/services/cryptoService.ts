import { type AxiosResponse } from "axios";
import type { Crypto } from "../types/Crypto";
import api from "./api";
import { logError } from "../utils/log";

const ENDPOINT = "/cryptos";

export async function fetchCryptos(): Promise<Crypto[]> {
  try {
    const response: AxiosResponse<Crypto[]> = await api.get(ENDPOINT);
    return response.data;
  } catch (error: any) {
    const errorMessage = error.response?.data?.message || error.message || "Erro desconhecido";
    logError("[CryptoService] fetchCryptos:", errorMessage);
    throw new Error("Não foi possível carregar as criptomoedas.");
  }
}