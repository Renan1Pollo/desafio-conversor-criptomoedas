class AuthController {
  constructor(authUserUseCase, createUserUseCase) {
    this.authUserUseCase = authUserUseCase;
    this.createUserUseCase = createUserUseCase;
  }

  async login(req, res) {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios.' });
    }

    try {
      const token = await this.authUserUseCase.authenticate(email, password);
      return res.status(200).json({ token });
    } catch (error) {
      return res.status(401).json({ error: error.message });
    }
  }

  async register(req, res) {
    const { email, password, name } = req.body || {};
    
    if (!email || !password || !name) {
      return res.status(400).json({ error: 'Nome, email e senha são obrigatórios.' });
    }

    try {
      const user = await this.createUserUseCase.createUser({ email, password, name });
      const { id } = user;
      return res.status(201).json({ id, email, name });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }
}

module.exports = AuthController;
