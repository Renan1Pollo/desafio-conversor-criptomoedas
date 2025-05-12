const express = require("express");
const router = express.Router();

const { authController, favoriteCryptoController, cryptoController } = require("../factories/controllerFactory");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/api/login", (req, res) => authController.login(req, res));
router.post("/api/register", (req, res) => authController.register(req, res));
router.post("/api/addFavorite", authenticateToken, (req, res) => favoriteCryptoController.addFavorite(req, res));
router.delete("/api/removeFavorite", authenticateToken, (req, res) => favoriteCryptoController.removeFavorite(req, res));
router.get("/api/cryptos", authenticateToken, (req, res) => cryptoController.fetchCryptocurrencies(req, res));

module.exports = router;
