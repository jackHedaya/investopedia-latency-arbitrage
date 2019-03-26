/**
 * Makes a sale or a short
 * @param {string} ticker an individual ticker or multiple tickers seperated by spaces
 * @param {Number} quantity number of shares being purchased
 * @param {"Buy" | "Sell Cover"} action
 */
async function transact(ticker, quantity, action) {
  let browser = global.browser;

  const page = await browser.newPage();

  const navigationPromise = page.waitForNavigation();

  await page.goto("https://www.investopedia.com/simulator/trade/tradestock.aspx");
  await page.type("input#symbolTextbox", ticker);

  const selectElem = await page.$("select#transactionTypeDropDown");
  await selectElem.type(action);

  await page.type("input#quantityTextbox", quantity.toString());

  await page.click("#previewButton");

  await page.waitFor("#submitOrder")
  await page.click("#submitOrder");

  await navigationPromise;

  // await page.close();
}

module.exports = transact;
