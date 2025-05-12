class FavoriteCryptoController {
  constructor(addFavoriteCryptoUseCase, removeFavoriteCryptoUseCase) {
    this.addFavoriteCryptoUseCase = addFavoriteCryptoUseCase;
    this.removeFavoriteCryptoUseCase = removeFavoriteCryptoUseCase;
  }

  /**
   * Adiciona uma criptomoeda aos favoritos do usuário.
   * @param {Object} req Requisição HTTP.
   * @param {Object} res Resposta HTTP.
   * @returns {Promise<void>} - Promessa que indica a conclusão.
   */
  async addFavorite(req, res) {
    const { cryptoId, cryptoName, coinSymbol, coinImage } = req.body;

    if (!cryptoId || !cryptoName || !coinSymbol || !coinImage) {
      return res.status(400).json({ error: 'Todos os dados da cripto favorita são obrigatórios.' });
    }

    try {
      const userId = req.user.sub;
      const favoriteCrypto = await this.addFavoriteCryptoUseCase.addFavoriteCrypto(userId, { cryptoId, cryptoName, coinSymbol, coinImage });

      return res.status(201).json({ message: 'Criptomoeda favoritada com sucesso!', favoriteCrypto });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  /**
   * Remove uma criptomoeda favorita de um usuário.
   * @param {string} userId - ID do usuário.
   * @param {string} cryptoId - ID da criptomoeda a ser removida.
   * @returns {Promise<void>} - Promessa que indica a conclusão da remoção.
   */
  async removeFavorite(req, res) {
    const { cryptoId } = req.query;
    const userId = req.user.sub;

    if (!cryptoId) {
      return res.status(400).json({ error: 'ID da cripto é obrigatório.' });
    }

    try {
      await this.removeFavoriteCryptoUseCase.removeFavoriteCrypto(userId, cryptoId);
      return res.status(200).json({ message: 'Criptomoeda removida dos favoritos com sucesso.' });
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  }
}

module.exports = FavoriteCryptoController;
