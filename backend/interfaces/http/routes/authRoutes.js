const express = require('express');
const router = express.Router();

const JwtService = require('../../../infrastructure/auth/JwtService');

const UserRepositoryAdapter = require('../../../infrastructure/repositories/UserRepository');
const FavoriteCryptoRepositoryAdapter = require('../../../infrastructure/repositories/FavoriteCryptoRepository');

const RemoveFavoriteCryptoUseCase = require('../../../application/usecases/RemoveFavoriteCryptoUseCase');
const AddFavoriteCryptoUseCase = require('../../../application/usecases/AddFavoriteCryptoUseCase');
const CreateUserUseCase = require('../../../application/usecases/CreateUserUseCase');
const AuthUserUseCase = require('../../../application/usecases/AuthUserUseCase');

const AuthController = require('../controllers/AuthController');

const jwtConfig = require('../../../config/jwtConfig');
const db = require('../../../config/db');
const FavoriteCryptoController = require('../controllers/FavoriteCryptoController');

const authenticateToken = require('../middleware/authMiddleware');

const jwtService = new JwtService(jwtConfig.secret, jwtConfig.expiresIn);
const userRepository = new UserRepositoryAdapter(db);
const favoriteCryptoRepository = new FavoriteCryptoRepositoryAdapter(db);

const authUserUseCase = new AuthUserUseCase(userRepository, jwtService);
const createUserUseCase = new CreateUserUseCase(userRepository);
const addFavoriteCryptoUseCase = new AddFavoriteCryptoUseCase(favoriteCryptoRepository);
const removeFavoriteCryptoUseCase = new RemoveFavoriteCryptoUseCase(favoriteCryptoRepository)

const authController = new AuthController(authUserUseCase, createUserUseCase);
const favoriteCryptoController = new FavoriteCryptoController(addFavoriteCryptoUseCase, removeFavoriteCryptoUseCase, jwtService);

router.post('/api/login', (req, res) => authController.login(req, res));
router.post('/api/register', (req, res) => authController.register(req, res));
router.post('/api/addFavorite', authenticateToken, (req, res) => favoriteCryptoController.addFavorite(req, res));
router.delete('/api/removeFavorite', authenticateToken, (req, res) => favoriteCryptoController.removeFavorite(req, res));

module.exports = router;
