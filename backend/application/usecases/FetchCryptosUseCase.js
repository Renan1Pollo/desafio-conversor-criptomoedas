class FetchCryptosUseCase {
  constructor(cryptoProvider) {
    this.cryptoProvider = cryptoProvider;
  }

  /**
   * Busca criptomoedas de uma API externa.
   * @param {string} currency - Moeda para conversão (ex: 'usd').
   * @returns {Promise<Object[]>} Lista de criptomoedas
   */
  async fetchCryptocurrencies(currency = 'usd') {
    if (!currency || typeof currency !== 'string') {
      throw new Error('Moeda inválida fornecida.');
    }

    return await this.cryptoProvider.fetchCryptocurrencies(currency);
  }
}

module.exports = FetchCryptosUseCase;