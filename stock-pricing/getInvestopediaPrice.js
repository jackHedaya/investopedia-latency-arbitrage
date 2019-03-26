/**
 * Gets investopedia stock price
 * @param {string} ticker a stock ticker
 * @returns {Promise<Number>} the stock price
 */
async function getInvestopediaPrice(ticker) {
  /**
   * @type {import("puppeteer").Browser}
   */
  let browser = global.browser;

  const page = await browser.newPage();

  const navigationPromise = page.waitForNavigation();

  await page.goto("https://www.investopedia.com/simulator/trade/tradestock.aspx");
  await page.type("input#symbolTextbox", ticker);
  await page.click(".simulator-page");

  try {
    await page.waitForFunction(_ => document.querySelectorAll("td.num").length > 4);
    const price = (await page.evaluate(_ => document.querySelectorAll("td.num")[4].textContent)).replace(/,/g, "");

    await navigationPromise;

    await page.close();
    return parseFloat(price);
  } catch (x) {
    console.log(`Failed getting investopedia ${ticker} price`);

    return;
  }
}

module.exports = getInvestopediaPrice;
