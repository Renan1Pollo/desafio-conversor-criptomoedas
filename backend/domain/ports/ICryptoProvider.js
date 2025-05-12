class ICryptoProvider {

  /**
   * Busca criptomoedas com base na moeda especificada.
   * @param {string} currency - A moeda de referência (ex: 'usd').
   * @returns {Promise<Object[]>} Lista de criptomoedas
   */
  async fetchCryptocurrencies(currency) {
    throw new Error("Method not implemented: fetchCryptos");
  }
}

module.exports = ICryptoProvider;
