const ConversionHistory = require("../../domain/entities/ConversionHistory");

class CreateConversionHistoryUseCase {
  constructor(conversionHistoryRepository) {
    this.conversionHistoryRepository = conversionHistoryRepository;
  }

  /**
   * Registra uma conversão de criptomoeda com base nos dados enviados pelo frontend.
   *
   * @param {string} userId - ID do usuário autenticado.
   * @param {Object} cryptoData - Dados da criptomoeda + quantidade.
   * @param {string} cryptoData.cryptoId
   * @param {string} cryptoData.cryptoName
   * @param {string} cryptoData.coinSymbol
   * @param {string} cryptoData.coinImage
   * @param {number} cryptoData.priceUSD
   * @param {number} cryptoData.priceBRL
   * @param {number|string} cryptoData.quantity - Quantidade da moeda a ser convertida.
   *
   * @returns {Promise<Object>} - Histórico de conversão salvo.
   */
  async createConversionHistory(userId, cryptoData) {
    const {
      cryptoId,
      cryptoName,
      priceUSD,
      priceBRL,
      quantity
    } = cryptoData;

    const convertedUsd = parseFloat((Number(quantity) * Number(priceUSD)).toFixed(4));
    const convertedBrl = parseFloat((Number(quantity) * Number(priceBRL)).toFixed(4));

    const newConversion = new ConversionHistory(
      null,
      userId,
      cryptoId,
      cryptoName,
      quantity,
      convertedBrl,
      convertedUsd,
      null
    );


    return this.conversionHistoryRepository.create(newConversion);
  }
}

module.exports = CreateConversionHistoryUseCase;
