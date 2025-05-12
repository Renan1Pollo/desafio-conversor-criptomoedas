class RemoveFavoriteCryptoUseCase {
  constructor(favoriteCryptoRepository) {
    this.favoriteCryptoRepository = favoriteCryptoRepository;
  }

  /**
   * Remove uma criptomoeda favorita de um usuário.
   * @param {string} userId - ID do usuário.
   * @param {string} cryptoId - ID da criptomoeda a ser removida.
   * @returns {Promise<void>}
   */
  async removeFavoriteCrypto(userId, cryptoId) {
    const existing = await this.favoriteCryptoRepository.findByUserAndCrypto(userId, cryptoId);

    if (!existing) {
      throw new Error('Criptomoeda não encontrada nos favoritos do usuário.');
    }

    await this.favoriteCryptoRepository.delete(userId, cryptoId);
  }
}

module.exports = RemoveFavoriteCryptoUseCase;
