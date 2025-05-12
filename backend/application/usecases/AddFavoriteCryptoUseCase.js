class AddFavoriteCryptoUseCase {
  constructor(favoriteCryptoRepository) {
    this.favoriteCryptoRepository = favoriteCryptoRepository;
  }

  /**
   * Adiciona uma criptomoeda aos favoritos do usuário.
   * 
   * @param {string} userId O ID do usuário autenticado.
   * @param {Object} cryptoData Dados da criptomoeda.
   * @param {string} cryptoData.cryptoId ID da criptomoeda.
   * @param {string} cryptoData.cryptoName Nome da criptomoeda.
   * @param {string} cryptoData.coinSymbol Símbolo da criptomoeda.
   * @param {string} cryptoData.coinImage URL da imagem da criptomoeda.
   * 
   * @returns {Promise<Object>} Cripto favorita salva.
   */
  async addFavoriteCrypto(userId, cryptoData) {
    const { cryptoId, cryptoName, coinSymbol, coinImage } = cryptoData;

    const alreadyFavorited = await this.favoriteCryptoRepository.findByUserAndCrypto(userId, cryptoId);
    
    if (alreadyFavorited) {
      throw new Error('Criptomoeda já está favoritada.');
    }

    const favoriteCrypto = {
      userId,
      cryptoId,
      cryptoName,
      coinSymbol,
      coinImage
    };

    return this.favoriteCryptoRepository.save(favoriteCrypto);
  }
}

module.exports = AddFavoriteCryptoUseCase;
