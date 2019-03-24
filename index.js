const getPrice = require("./alpha-vantage/getPrice");

require('events').EventEmitter.defaultMaxListeners = 125;

(async function main() {
  const tickers = await require("./getSaP");
  
  for (var ticker of tickers) {
    getPrice(ticker)
  }

})()