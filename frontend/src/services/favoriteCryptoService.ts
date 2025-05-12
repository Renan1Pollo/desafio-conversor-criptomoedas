import type { Crypto } from "../types/Crypto";
import type { FavoriteCrypto } from "../types/FavoriteCrypto";
import api from "./api";

const ENDPOINT = "/favorites";

/**
 * Retorna a lista de criptomoedas favoritas do usuário autenticado.
 *
 * @returns {Promise<Crypto[]>} Lista de criptomoedas favoritas.
 * @throws {Error} Se ocorrer falha na requisição.
 */
export async function getFavoriteCryptos(): Promise<FavoriteCrypto[]> {
  try {
    const response = await api.get(ENDPOINT);
    return response.data;
  } catch (error: any) {
    throw new Error("Erro ao buscar criptomoedas favoritas.");
  }
}

/**
 * Adiciona uma criptomoeda aos favoritos.
 *
 * @param {Crypto} crypto - Objeto contendo os dados da criptomoeda.
 */
export async function addFavoriteCrypto(crypto: Crypto): Promise<void> {
  try {
    await api.post(ENDPOINT, crypto);
  } catch (error: any) {
    throw new Error("Erro ao favoritar a cripto.");
  }
}

/**
 * Remove uma criptomoeda dos favoritos.
 *
 * @param {string} cryptoId - ID da criptomoeda a ser removida.
 */
export async function removeFavoriteCrypto(cryptoId: string): Promise<void> {
  try {
    await api.delete(`${ENDPOINT}?cryptoId=${cryptoId}`);
  } catch (error: any) {
    throw new Error("Erro ao remover a cripto favorita.");
  }
}
