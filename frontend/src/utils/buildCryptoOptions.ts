import type { Crypto } from "../types/Crypto";
import type { Option } from "../components/inputs/SelectInput";

/**
 * Constrói uma lista de opções únicas de criptomoedas para o SelectInput,
 * garantindo que não existam duplicatas por cryptoId.
 *
 * @param cryptos Lista de criptomoedas brutas
 * @param favorites Lista de criptos favoritas do usuário
 * @returns Lista formatada de opções únicas com flag de favorito
 */
export function buildCryptoOptions(
  cryptos: Crypto[],
  favorites: Crypto[]
): Option[] {
  const uniqueMap = new Map<string, Crypto>();

  for (const crypto of cryptos) {
    if (!uniqueMap.has(crypto.cryptoId)) {
      uniqueMap.set(crypto.cryptoId, crypto);
    }
  }

  return Array.from(uniqueMap.values()).map((crypto) => ({
    value: crypto.coinSymbol,
    label: `${crypto.cryptoName} (${crypto.coinSymbol.toUpperCase()})`,
    image: crypto.coinImage,
    isFavorite: favorites.some((f) => f.cryptoId === crypto.cryptoId),
    cryptoId: crypto.cryptoId,
  }));
}
