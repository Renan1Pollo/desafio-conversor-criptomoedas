const bcrypt = require('bcryptjs');

class AuthUserUseCase {
  constructor(userRepository, jwtService) {
    this.userRepository = userRepository;
    this.jwtService = jwtService;
  }

  /**
   * Autentica um usuário.
   * @param {string} email O e-mail do usuário.
   * @param {string} password A senha do usuário.
   * @returns {Promise<string>} O token JWT gerado.
   */
  async authenticate(email, password) {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Senha incorreta');
    }

    const token = this.jwtService.generateToken(user);

    return token;
  }
}

module.exports = AuthUserUseCase;
