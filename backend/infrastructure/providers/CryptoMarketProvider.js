const CoinGeckoAPI = require("../api/coinGeckoAPI");
const ICryptoProvider = require("../../domain/ports/ICryptoProvider");

class CryptoMarketProvider extends ICryptoProvider {

  /**
   * Implementa a interface ICryptoProvider para buscar criptomoedas.
   * @param {string} currency - A moeda de referência (ex: 'usd').
   * @returns {Promise<Object[]>} Lista de criptomoedas
   */
  async fetchCryptocurrencies(currency) {
    return await CoinGeckoAPI.fetchCryptocurrencies(currency);
  }
}

module.exports = new CryptoMarketProvider();