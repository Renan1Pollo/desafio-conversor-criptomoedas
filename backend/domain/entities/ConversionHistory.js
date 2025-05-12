class ConversionHistory {
  constructor(id, userId, cryptoId, cryptoName, quantity, convertedBrl, convertedUsd, createdAt) {
    this.id = id;
    this.userId = userId;
    this.cryptoId = cryptoId;
    this.cryptoName = cryptoName;
    this.quantity = quantity;
    this.convertedBrl = convertedBrl;
    this.convertedUsd = convertedUsd;
    this.createdAt = createdAt;
  }
}

module.exports = ConversionHistory;