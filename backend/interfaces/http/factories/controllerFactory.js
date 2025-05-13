const JwtService = require("../../../infrastructure/auth/JwtService");
const UserRepositoryAdapter = require("../../../infrastructure/repositories/UserRepository");
const FavoriteCryptoRepositoryAdapter = require("../../../infrastructure/repositories/FavoriteCryptoRepository");
const ConversionHistoryRepositoryAdapter = require("../../../infrastructure/repositories/ConversionHistoryRepository");
const CryptoMarketProvider = require("../../../infrastructure/providers/CryptoMarketProvider");
const RedisCryptoCache = require('../../../infrastructure/cache/RedisCryptoCache');
const db = require("../../../config/db");
const jwtConfig = require("../../../config/jwtConfig");

// Use Cases
const AuthUserUseCase = require("../../../application/usecases/AuthUserUseCase");
const CreateUserUseCase = require("../../../application/usecases/CreateUserUseCase");
const AddFavoriteCryptoUseCase = require("../../../application/usecases/AddFavoriteCryptoUseCase");
const RemoveFavoriteCryptoUseCase = require("../../../application/usecases/RemoveFavoriteCryptoUseCase");
const FetchCryptosUseCase = require("../../../application/usecases/FetchCryptosUseCase");
const GetFavoriteCryptosUseCase = require("../../../application/usecases/GetFavoriteCryptosUseCase");
const GetUserConversionHistoryUseCase = require("../../../application/usecases/GetUserConversionHistoryUseCase");
const CreateConversionHistoryUseCase = require("../../../application/usecases/CreateConversionHistoryUseCase");

// Controllers
const AuthController = require("../controllers/AuthController");
const FavoriteCryptoController = require("../controllers/FavoriteCryptoController");
const CryptoController = require("../controllers/CryptoController");
const ConversionHistoryController = require("../controllers/ConversionHistoryController");

// Infrastructure Instances
const jwtService = new JwtService(jwtConfig.secret, jwtConfig.expiresIn);
const userRepository = new UserRepositoryAdapter(db);
const favoriteCryptoRepository = new FavoriteCryptoRepositoryAdapter(db);
const conversionHistoryRepository = new ConversionHistoryRepositoryAdapter(db);
const cryptoCache = new RedisCryptoCache(600);

// Use Case Instances
const authUserUseCase = new AuthUserUseCase(userRepository, jwtService);
const createUserUseCase = new CreateUserUseCase(userRepository);
const addFavoriteCryptoUseCase = new AddFavoriteCryptoUseCase(favoriteCryptoRepository);
const removeFavoriteCryptoUseCase = new RemoveFavoriteCryptoUseCase(favoriteCryptoRepository);
const fetchCryptosUseCase = new FetchCryptosUseCase(CryptoMarketProvider, cryptoCache);
const getFavoriteCryptosUseCase = new GetFavoriteCryptosUseCase(favoriteCryptoRepository);

const getUserConversionHistoryUseCase = new GetUserConversionHistoryUseCase(conversionHistoryRepository);
const createConversionHistoryUseCase = new CreateConversionHistoryUseCase(conversionHistoryRepository);

// Controller Instances
const authController = new AuthController(authUserUseCase, createUserUseCase);

const conversionHistoryController = new ConversionHistoryController(
  createConversionHistoryUseCase,
  getUserConversionHistoryUseCase
);

const favoriteCryptoController = new FavoriteCryptoController(
  addFavoriteCryptoUseCase,
  removeFavoriteCryptoUseCase,
  getFavoriteCryptosUseCase
);


const cryptoController = new CryptoController(fetchCryptosUseCase);

module.exports = {
  authController,
  favoriteCryptoController,
  cryptoController,
  conversionHistoryController
};
