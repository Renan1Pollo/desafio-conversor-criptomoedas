class FavoriteCrypto {
  constructor(id, userId, cryptoId, cryptoName, coinSymbol, coinImage, addedAt) {
    this.id = id
    this.userId = userId;
    this.cryptoId = cryptoId;
    this.cryptoName = cryptoName;
    this.coinSymbol = coinSymbol;
    this.coinImage = coinImage;
    this.addedAt = addedAt;
  }

}

module.exports = FavoriteCrypto;