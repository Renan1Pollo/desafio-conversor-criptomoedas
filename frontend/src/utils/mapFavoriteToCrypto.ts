import type { Crypto } from "../types/Crypto";
import type { FavoriteCrypto } from "../types/FavoriteCrypto";

/**
 * Retorna a lista de criptomoedas favoritas do usuário autenticado.
 *
 * @param {FavoriteCrypto[]} favorites - Lista de criptomoedas favoritas do usuário.
 * @returns {Promise<Crypto[]>} Lista convertida no formato `Crypto`
 */
export function mapFavoriteToCrypto(favorites: FavoriteCrypto[]): Crypto[] {
  return favorites.map((fav) => ({
    cryptoId: fav.cryptoId,
    cryptoName: fav.cryptoName,
    coinSymbol: fav.coinSymbol,
    coinImage: fav.coinImage,
    priceUSD: 0,
    priceBRL: 0,
  }));
}
