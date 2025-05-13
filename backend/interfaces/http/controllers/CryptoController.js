const CryptoMapper = require('../../../application/mappers/CryptoMapper');

class CryptoController {
  constructor(fetchCryptosUseCase) {
    this.fetchCryptosUseCase = fetchCryptosUseCase;
  }

  /**
   * Retorna uma lista de criptomoedas com base na moeda fornecida.
   * @param {import('express').Request} req 
   * @param {import('express').Response} res 
   */
  async fetchCryptocurrencies(req, res) {
    try {
      const currency = req.query.currency || "usd";

      const cryptosRaw = await this.fetchCryptosUseCase.fetchCryptocurrencies(currency);
      const cryptos = CryptoMapper.toEntityList(cryptosRaw, 5.64);

      return res.status(200).json(cryptos);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao buscar criptomoedas." });
    }
  }
}

module.exports = CryptoController;
