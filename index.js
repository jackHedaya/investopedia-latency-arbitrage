const present = require("present");

const initializePuppeteer = require("./initializePuppeteer");

const getPrice = require("./stock-pricing/getPrice");
const getInvestopediaPrice = require("./stock-pricing/getInvestopediaPrice");

const buy = require("./trading/buy");

const { TICKERS, WORKING_WITH, AMOUNT_OF_STOCKS } = require("./config");

/**
 * gives the max amount of stocks with allocated funds that the amount of stocks being traded
 * @param {number} stockPrice
 */
function getQuantity(stockPrice) {
  return Math.floor(WORKING_WITH / AMOUNT_OF_STOCKS / stockPrice);
}

(async function main() {
  await initializePuppeteer();

  const t0 = present();

  const volatility = [];

  for (var ticker of TICKERS) {
    const real = await getPrice(ticker);
    const investopedia = await getInvestopediaPrice(ticker);

    if (investopedia < real) {
      volatility.push({
        ticker: ticker,
        percent: real / investopedia,
        price: investopedia,
        action: "Buy"
      });
    } else if (investopedia > real) {
      volatility.push({
        ticker: ticker,
        percent: investopedia / real,
        price: investopedia,
        action: "Sell Cover"
      });
    }
  }

  volatility.sort((stock1, stock2) => stock2.percent - stock1.percent);

  const transactions = volatility.splice(0, 4);

  for (var transaction of transactions) {
    const { ticker, action, price } = transaction;

    buy(ticker, getQuantity(price), action);
  }

  console.log("\n\n", `Performance: ${(present() - t0) / 1000} seconds `);
  global.browser.close();
})();
