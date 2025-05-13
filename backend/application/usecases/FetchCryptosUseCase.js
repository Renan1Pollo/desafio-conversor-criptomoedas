class FetchCryptosUseCase {
  constructor(cryptoProvider, cryptoCache) {
    this.cryptoProvider = cryptoProvider;
    this.cryptoCache = cryptoCache;
  }

  /**
   * Obtém uma lista de criptomoedas usando cache para otimização.
   * @param {string} currency - Código da moeda (ex: 'usd').
   * @returns {Promise<Object[]>}
   */
  async fetchCryptocurrencies(currency = 'usd') {
    if (!this.#isValidCurrency(currency)) {
      throw new Error('Moeda inválida fornecida.');
    }

    const cachedCryptos = await this.cryptoCache.getCachedCryptos(currency);
    if (cachedCryptos) return cachedCryptos;
    
    const cryptos = await this.cryptoProvider.fetchCryptocurrencies(currency);
    await this.cryptoCache.setCachedCryptos(currency, cryptos);

    return cryptos;
  }

  #isValidCurrency(currency) {
    return typeof currency === 'string' && currency.trim() !== '';
  }
}

module.exports = FetchCryptosUseCase;
