const express = require("express");
const router = express.Router();

const { authController, favoriteCryptoController, cryptoController, conversionHistoryController } = require("../factories/controllerFactory");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/api/login", (req, res) => authController.login(req, res));
router.post("/api/register", (req, res) => authController.register(req, res));
router.post("/api/favorites", authenticateToken, (req, res) => favoriteCryptoController.addFavorite(req, res));
router.delete("/api/favorites", authenticateToken, (req, res) => favoriteCryptoController.removeFavorite(req, res));
router.get("/api/favorites", authenticateToken, (req, res) => favoriteCryptoController.getFavorites(req, res));
router.get("/api/cryptos", authenticateToken, (req, res) => cryptoController.fetchCryptocurrencies(req, res));
router.get("/api/history", authenticateToken, (req, res) => conversionHistoryController.getUserHistory(req, res));
router.post("/api/history", authenticateToken, (req, res) => conversionHistoryController.createConversionHistory(req, res));

module.exports = router;
