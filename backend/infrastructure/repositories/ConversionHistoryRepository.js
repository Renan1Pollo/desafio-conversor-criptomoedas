const IConversionHistoryRepository = require('../../domain/ports/IConversionHistoryRepository');
const ConversionHistory = require('../../domain/entities/ConversionHistory');

class ConversionHistoryRepositoryAdapter extends IConversionHistoryRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  /** 
   * Cria um novo histórico de conversão no banco de dados.
   * @param {Object} conversionHistoryData - Dados da conversão.
   * @returns {Promise<ConversionHistory>} - Instância da conversão persistida.
   */
  async create(conversionHistoryData) {
    const {
      userId,
      cryptoId,
      cryptoName,
      quantity,
      convertedBrl,
      convertedUsd,
    } = conversionHistoryData;

    const result = await this.db.query(`
      INSERT INTO conversion_history  
      (user_id, crypto_id, crypto_name, quantity, converted_brl, converted_usd)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, created_at `,
      [userId, cryptoId, cryptoName, quantity, convertedBrl, convertedUsd]
    );

    const { id, created_at } = result.rows[0];

    return new ConversionHistory(
      id,
      userId,
      cryptoId,
      cryptoName,
      quantity,
      convertedBrl,
      convertedUsd,
      created_at
    );
}

  /**
   * Retorna o histórico de conversões do usuário.
   * @param {string} userId - ID do usuário.
   * @returns {Promise<ConversionHistory[]>}
   */
  async findHistoryByUserId(userId) {
    const result = await this.db.query(
      'SELECT * FROM conversion_history WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );

    return result.rows.map((row) => new ConversionHistory(
      row.id,
      row.user_id,
      row.crypto_id,
      row.crypto_name,
      row.quantity,
      row.converted_brl,
      row.converted_usd,
      row.created_at
    ));
  }
}

module.exports = ConversionHistoryRepositoryAdapter;
