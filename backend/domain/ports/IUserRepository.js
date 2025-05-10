class IUserRepository {

  /**
   * Busca um usuário pelo e-mail.
   * @param {string} email O e-mail do usuário a ser buscado.
   * @returns {Promise<User|null>} Retorna o usuário encontrado ou null caso não exista.
   */
  async findByEmail(email) {
    throw new Error('findByEmail method not implemented');
  }

  /**
   * Cria um novo usuário.
   * @param {Object} userData Dados do usuário a ser criado.
   * @returns {Promise<User>} O usuário criado.
   */
  async create(userData) {
    throw new Error('create method not implemented');
  }

  /**
   * Atualiza as informações de um usuário.
   * @param {User} user O usuário a ser atualizado.
   * @returns {Promise<User>} O usuário atualizado.
   */
  async update(user) {
    throw new Error('update method not implemented');
  }
}

module.exports = IUserRepository;
