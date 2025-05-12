// backend/interfaces/http/factories/controllerFactory.js

const JwtService = require("../../../infrastructure/auth/JwtService");
const UserRepositoryAdapter = require("../../../infrastructure/repositories/UserRepository");
const FavoriteCryptoRepositoryAdapter = require("../../../infrastructure/repositories/FavoriteCryptoRepository");
const CryptoMarketProvider = require("../../../infrastructure/providers/CryptoMarketProvider");
const db = require("../../../config/db");
const jwtConfig = require("../../../config/jwtConfig");

// Use Cases
const AuthUserUseCase = require("../../../application/usecases/AuthUserUseCase");
const CreateUserUseCase = require("../../../application/usecases/CreateUserUseCase");
const AddFavoriteCryptoUseCase = require("../../../application/usecases/AddFavoriteCryptoUseCase");
const RemoveFavoriteCryptoUseCase = require("../../../application/usecases/RemoveFavoriteCryptoUseCase");
const FetchCryptosUseCase = require("../../../application/usecases/FetchCryptosUseCase");

// Controllers
const AuthController = require("../controllers/AuthController");
const FavoriteCryptoController = require("../controllers/FavoriteCryptoController");
const CryptoController = require("../controllers/CryptoController");

// Infrastructure Instances
const jwtService = new JwtService(jwtConfig.secret, jwtConfig.expiresIn);
const userRepository = new UserRepositoryAdapter(db);
const favoriteCryptoRepository = new FavoriteCryptoRepositoryAdapter(db);

// Use Case Instances
const authUserUseCase = new AuthUserUseCase(userRepository, jwtService);
const createUserUseCase = new CreateUserUseCase(userRepository);
const addFavoriteCryptoUseCase = new AddFavoriteCryptoUseCase(favoriteCryptoRepository);
const removeFavoriteCryptoUseCase = new RemoveFavoriteCryptoUseCase(favoriteCryptoRepository);
const fetchCryptosUseCase = new FetchCryptosUseCase(CryptoMarketProvider);

// Controller Instances
const authController = new AuthController(authUserUseCase, createUserUseCase);
const favoriteCryptoController = new FavoriteCryptoController(
  addFavoriteCryptoUseCase,
  removeFavoriteCryptoUseCase,
  jwtService
);
const cryptoController = new CryptoController(fetchCryptosUseCase);

module.exports = {
  authController,
  favoriteCryptoController,
  cryptoController,
};
