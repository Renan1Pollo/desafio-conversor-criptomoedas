class ConversionHistoryController {
  constructor(createConversionHistoryUseCase, getUserConversionHistoryUseCase) {
    this.createConversionHistoryUseCase = createConversionHistoryUseCase;
    this.getUserConversionHistoryUseCase = getUserConversionHistoryUseCase;
  }

  /**
   * Registra uma nova conversão de criptomoeda para o usuário.
   * @param {Object} req Requisição HTTP.
   * @param {Object} res Resposta HTTP.
   * @returns {Promise<void>}
   */
  async createConversionHistory(req, res) {
    const {
      cryptoId,
      cryptoName,
      coinSymbol,
      coinImage,
      priceUSD,
      priceBRL,
      quantity
    } = req.body;

    if (!cryptoId || !cryptoName || !priceUSD || !priceBRL || !quantity) {
      return res.status(400).json({ error: 'Todos os dados da conversão são obrigatórios.' });
    }

    try {
      const userId = req.user.sub;
      const conversion = await this.createConversionHistoryUseCase.createConversionHistory(userId, {
        cryptoId,
        cryptoName,
        coinSymbol,
        coinImage,
        priceUSD,
        priceBRL,
        quantity
      });

      return res.status(201).json({ message: 'Conversão registrada com sucesso!', conversion });
    } catch (error) {
      if (error.statusCode) {
        return res.status(error.statusCode).json({ error: error.message });
      }
      
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Retorna o histórico de conversões do usuário autenticado.
   * @param {Object} req Requisição HTTP.
   * @param {Object} res Resposta HTTP.
   * @returns {Promise<void>}
   */
  async getUserHistory(req, res) {
    try {
      const userId = req.user.sub;
      const histories = await this.getUserConversionHistoryUseCase.getUserHistory(userId);

      return res.status(200).json(histories);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ConversionHistoryController;
