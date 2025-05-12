const IFavoriteCryptoRepository = require('../../domain/ports/IFavoriteCryptoRepository');
const FavoriteCrypto = require('../../domain/entities/FavoriteCrypto');

class FavoriteCryptoRepositoryAdapter extends IFavoriteCryptoRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  /**
   * Salva uma criptomoeda favorita no banco de dados.
   * @param {FavoriteCrypto} favoriteCrypto
   * @returns {Promise<void>}
   */
  async save(favoriteCrypto) {
    const {
      userId,
      cryptoId,
      cryptoName,
      coinSymbol,
      coinImage,
    } = favoriteCrypto;

    const result = await this.db.query(
      `INSERT INTO favorite_cryptos
       (user_id, crypto_id, crypto_name, coin_symbol, coin_image)
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [userId, cryptoId, cryptoName, coinSymbol, coinImage]
    );

    const { id, added_at } = result.rows[0];

    return new FavoriteCrypto(
      id,
      userId,
      cryptoId,
      cryptoName,
      coinSymbol,
      coinImage,
      added_at
    );
  }

  /**
   * Verifica se uma cripto já foi favoritada pelo usuário.
   * @param {string} userId
   * @param {string} cryptoId
   * @returns {Promise<FavoriteCrypto|null>}
   */
  async findByUserAndCrypto(userId, cryptoId) {
    const result = await this.db.query(
      'SELECT * FROM favorite_cryptos WHERE user_id = $1 AND crypto_id = $2',
      [userId, cryptoId]
    );

    if (result.rows.length === 0) return null;

    const row = result.rows[0];
    return new FavoriteCrypto(
      row.id,
      row.user_id,
      row.crypto_id,
      row.crypto_name,
      row.coin_symbol,
      row.coin_image,
      row.added_at
    );
  }

  /**
   * Lista todas as criptos favoritas do usuário.
   * @param {string} userId
   * @returns {Promise<FavoriteCrypto[]>}
   */
  async findAllByUser(userId) {
    const result = await this.db.query(
      'SELECT * FROM favorite_cryptos WHERE user_id = $1 ORDER BY added_at DESC',
      [userId]
    );

    return result.rows.map(row => new FavoriteCrypto(
      row.id,
      row.user_id,
      row.crypto_id,
      row.crypto_name,
      row.coin_symbol,
      row.coin_image,
      row.added_at
    ));
  }

  /**
   * Remove uma cripto favorita do usuário.
   * @param {string} userId
   * @param {string} cryptoId
   * @returns {Promise<void>}
   */
  async delete(userId, cryptoId) {
    await this.db.query(
      'DELETE FROM favorite_cryptos WHERE user_id = $1 AND crypto_id = $2',
      [userId, cryptoId]
    );
  }
}

module.exports = FavoriteCryptoRepositoryAdapter;
