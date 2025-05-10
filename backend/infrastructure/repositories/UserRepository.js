const IUserRepository = require('../../domain/ports/IUserRepository');
const User = require('../../domain/entities/User');

class UserRepositoryAdapter extends IUserRepository {
  constructor(db) {
    super();
    this.db = db;
  }

  /**
   * Busca um usuário pelo e-mail no banco de dados.
   * @param {string} email O e-mail do usuário a ser buscado.
   * @returns {Promise<User|null>} O usuário encontrado ou null.
   */
  async findByEmail(email) {
    const result = await this.db.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length === 0) return null;
    const { id, name, email: userEmail, password } = result.rows[0];
    return new User(id, name, userEmail, password);
  }

  /**
   * Cria um novo usuário no banco de dados.
   * @param {Object} userData Dados do usuário a ser criado.
   * @returns {Promise<User>} O usuário criado.
   */
  async create(userData) {
    const { name, email, password} = userData;
    const result = await this.db.query(
      'INSERT INTO users (name, email, password ) VALUES ($1, $2, $3) RETURNING id, name, email, password',
      [name, email, password]
    );
    const { id } = result.rows[0];
    return new User(id, name, email, password);
  }
}

module.exports = UserRepositoryAdapter;
