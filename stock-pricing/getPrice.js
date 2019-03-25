const cheerio = require("cheerio");
const request = require("request-promise");

/**
 *
 * @param {string} ticker an valid ticker 
 * @returns {Promise<Number>}
 */
async function getPrice(ticker) {
  try {
    const r = await request.get(`https://finance.yahoo.com/quote/${ticker}`);

    const $ = cheerio.load(r);

    const price = parseFloat(
      $("#mrt-node-Lead-3-QuoteHeader * span")
        .eq(3)
        .text()
    );

    return price;
  } catch (e) {
    console.error(`${ticker} failed`);
  }
}
module.exports = getPrice;
