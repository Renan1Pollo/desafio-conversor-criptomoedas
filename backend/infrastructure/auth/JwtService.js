const jwt = require('jsonwebtoken');
const config = require('../../config/jwtConfig');

class JwtService {

  constructor(secret, expiresIn) {
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  generateToken(user) {
    if (!user?.id || !user?.email) {
      throw new Error('Invalid user payload: ID and email are required.');
    }

    const payload = this._buildTokenPayload(user);

    return jwt.sign(payload, this.secret, { expiresIn: this.expiresIn });
  }

  verifyToken(token) {
    return jwt.verify(token, this.secret);
  }

  _buildTokenPayload(user) {
    return {
      sub: user.id,
      email: user.email,
      name: user.name,
    };
  }
}

module.exports = JwtService;