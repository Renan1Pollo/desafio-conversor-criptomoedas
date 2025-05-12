class GetUserConversionHistoryUseCase {
  constructor(conversionHistoryRepository) {
    this.conversionHistoryRepository = conversionHistoryRepository;
  }

  /**
   * Retorna o histórico de conversões de um usuário.
   * 
   * @param {string} userId
   * @returns {Promise<Object[]>}
   */
  async getUserHistory(userId) {
    return this.conversionHistoryRepository.findHistoryByUserId(userId);
  }
}

module.exports = GetUserConversionHistoryUseCase;
