class IFavoriteCryptoRepository {

  /**
   * Busca uma criptomoeda favoritada por um usuário.
   * @param {string} userId
   * @param {string} cryptoId
   * @returns {Promise<Object|null>}
   */
  async findByUserAndCrypto(userId, cryptoId) {
    throw new Error('Method not implemented.');
  }

  /**
   * Lista todas as criptomoedas favoritas de um usuário.
   * @param {string} userId
   * @returns {Promise<Object[]>}
   */
  async findAllByUser(userId) {
    throw new Error('Method not implemented.');
  }

  /**
   * Salva uma criptomoeda favorita.
   * @param {Object} favoriteCrypto
   * @returns {Promise<void>}
   */
  async save(favoriteCrypto) {
    throw new Error('Method not implemented.');
  }

  /**
   * Remove uma criptomoeda dos favoritos de um usuário.
   * @param {string} userId
   * @param {string} cryptoId
   * @returns {Promise<void>}
   */
  async delete(userId, cryptoId) {
    throw new Error('Method not implemented.');
  }
}

module.exports = IFavoriteCryptoRepository;
