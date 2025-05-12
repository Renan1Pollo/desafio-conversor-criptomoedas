class GetFavoriteCryptosUseCase {
  constructor(favoriteCryptoRepository) {
    this.favoriteCryptoRepository = favoriteCryptoRepository;
  }

  /**
   * Retorna todas as criptomoedas favoritas de um usuário.
   * @param {string} userId - ID do usuário.
   * @returns {Promise<Object[]>} Lista de criptomoedas favoritas.
   */
  async getUserFavoriteCryptos(userId) {
    if (!userId) {
      throw new Error("ID do usuário é obrigatório.");
    }

    const favorites = await this.favoriteCryptoRepository.findAllByUser(userId);

    return favorites;
  }
}

module.exports = GetFavoriteCryptosUseCase;
