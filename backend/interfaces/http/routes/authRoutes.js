const express = require('express');
const router = express.Router();

const JwtService = require('../../../infrastructure/auth/JwtService');
const UserRepositoryAdapter = require('../../../infrastructure/repositories/UserRepository');
const CreateUserUseCase = require('../../../application/usecases/CreateUserUseCase')
const AuthUserUseCase = require('../../../application/usecases/AuthUserUseCase');
const AuthController = require('../controllers/AuthController');

const jwtConfig = require('../../../config/jwtConfig');
const db = require('../../../config/db');

const jwtService = new JwtService(jwtConfig.secret, jwtConfig.expiresIn);
const userRepository = new UserRepositoryAdapter(db);

const authUserUseCase = new AuthUserUseCase(userRepository, jwtService);
const createUserUseCase = new CreateUserUseCase(userRepository);

const authController = new AuthController(authUserUseCase, createUserUseCase);

router.post('/api/login', (req, res) => authController.login(req, res));
router.post('/api/register', (req, res) => authController.register(req, res));

module.exports = router;
