class IConversionHistoryRepository {
    
  /**
   * Cria um novo histórico de conversão.
   * @param {Object} conversionHistoryData
   * @returns {Promise<Object>} - Instância da conversão persistida.
   */
  async create(conversionHistoryData) {
    throw new Error('Method not implemented.');
  }

  /**
   * Retorna o histórico de conversões de um usuário.
   * @param {string} userId
   * @returns {Promise<Object[]>}
   */
  async findHistoryByUserId(userId) {
    throw new Error('Method not implemented.');
  }
}

module.exports = IConversionHistoryRepository;
