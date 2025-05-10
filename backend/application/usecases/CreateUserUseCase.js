const User = require('../../domain/entities/User');
const bcrypt = require('bcryptjs');

class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  /**
   * Cria um novo usuário.
   * @param {Object} userData Dados do usuário a ser criado.
   * @param {string} userData.email O e-mail do usuário.
   * @param {string} userData.password A senha do usuário.
   * @param {string} userData.name O nome do usuário.
   * @returns {Promise<User>} O usuário criado.
   */
  async createUser(userData) {
    const { email, password, name } = userData;
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error('O e-mail já está em uso');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User(null, name, email, hashedPassword);

    const createdUser = await this.userRepository.create(user);

    return createdUser;
  }
}

module.exports = CreateUserUseCase;
