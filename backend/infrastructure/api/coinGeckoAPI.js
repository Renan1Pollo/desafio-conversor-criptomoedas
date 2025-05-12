const axios = require("axios");
require("dotenv").config();

class CoinGeckoAPI {
  constructor() {
    this.client = this.createHttpClient();
  }

  createHttpClient() {
    return axios.create({
      baseURL: process.env.COINGECKO_API_URL,
      timeout: 5000,
    });
  }

  async fetchCryptocurrencies(currency = "usd") {
    try {
      const params = {
        vs_currency: currency,
        order: "market_cap_desc",
        per_page: 100,
        page: 1,
        sparkline: false,
      };

      const { data } = await this.client.get("/coins/markets", { params });
      return data;
    } catch (error) {
      throw new Error("Unable to fetch cryptocurrencies from CoinGecko API.");
    }
  }
}

module.exports = new CoinGeckoAPI();