const jwtService = require('../../../infrastructure/auth/JwtService');
const jwtConfig = require('../../../config/jwtConfig');

const jwt = new jwtService(jwtConfig.secret, jwtConfig.expiresIn);

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido.' });
  }

  try {
    const decoded = jwt.verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};

module.exports = authenticateToken;
