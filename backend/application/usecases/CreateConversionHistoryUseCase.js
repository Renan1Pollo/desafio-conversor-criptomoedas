const InvalidInputError = require("../../domain/errors/InvalidInputError");
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

    const parsedQuantity = Number(quantity);

    if (parsedQuantity < 0) {
      throw new InvalidInputError("Quantidade inválida.");
    }

    const convertedUsd = Number((parsedQuantity * Number(priceUSD)).toFixed(2));
    const convertedBrl = Number((parsedQuantity * Number(priceBRL)).toFixed(2));

    if (convertedUsd <= 0 || convertedBrl <= 0) {
      throw new InvalidInputError("Valor convertido inválido. Verifique a quantidade.");
    }

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
