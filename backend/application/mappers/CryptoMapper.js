const Crypto = require("../../domain/entities/Crypto");

class CryptoMapper {
  static toEntity(apiData, brlRate = 5.64) {
    return new Crypto({
      cryptoId: apiData.id,
      cryptoName: apiData.name,
      coinSymbol: apiData.symbol,
      coinImage: apiData.image,
      priceUSD: apiData.current_price,
      priceBRL: parseFloat((apiData.current_price * brlRate).toFixed(2)),
    });
  }

  static toEntityList(apiList, brlRate = 5.64) {
    return apiList.map((coin) => this.toEntity(coin, brlRate));
  }
}

module.exports = CryptoMapper;
