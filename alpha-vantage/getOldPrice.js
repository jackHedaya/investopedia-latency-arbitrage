const oldTime = require("../date/oldTime");

const Alpha = require("alpha_vantage_api_wrapper").Alpha;
const alpha = new Alpha(require("./creds"));

/**
 * Gets stock prices exactly 5 minutes earlier
 * @param {string[] | string} ticker an individual ticker or multiple tickers seperated by spaces
 */
module.exports = ticker => (ticker.constructor === Array ? getPrices(ticker) : getPrice(ticker));

async function getPrice(ticker) {
  return alpha.stocks.intraday(ticker).then(e => e["Time Series (1min)"][oldTime()]["4. close"]);
}

async function getPrices(tickers) {
  let prices = {};

  for (ticker of tickers) {
    prices[`${ticker}`] = await getPrice(ticker);
  }

  return prices;
}
