const Alpha = require("alpha_vantage_api_wrapper").Alpha;

const alpha = new Alpha(require("./creds"));

/**
 *
 * @param {string[] | string} ticker an individual ticker or multiple tickers seperated by spaces
 */
module.exports = ticker => (ticker.constructor === Array ? getPrices(ticker) : getPrice(ticker));

async function getPrice(ticker) {
  return alpha.stocks.quote(ticker).then(t => t["Global Quote"]["05. price"]);
}

async function getPrices(tickers) {
  let prices = {};

  for (ticker of tickers) {
    prices[`${ticker}`] = await getPrice(ticker);
  }

  return prices;
}
