class Crypto {
  constructor({ cryptoId, cryptoName, coinSymbol, coinImage, priceUSD, priceBRL }) {
    this.cryptoId = cryptoId;
    this.cryptoName = cryptoName;
    this.coinSymbol = coinSymbol;
    this.coinImage = coinImage;
    this.priceUSD = priceUSD;
    this.priceBRL = priceBRL;
  }
}

module.exports = Crypto;
