const puppeteer = require("puppeteer");

/**
 * Gets stock prices exactly 5 minutes earlier
 * @param {string[] | string} ticker an individual ticker or multiple tickers seperated by spaces
 */
async function getInvestopediaPrice(stock) {
  if (!global.browser)
  global.browser = await puppeteer.launch({
      headless: false,
      userDataDir: "/Users/jachedaya/Library/Application Support/Google/Chrome/Default"
    });

  const page = await browser.newPage();

  const navigationPromise = page.waitForNavigation();

  await page.goto("https://www.investopedia.com/simulator/trade/tradestock.aspx");
  await page.type("input#symbolTextbox", stock);
  await page.click(".simulator-page");

  try {
    await page.waitForFunction(_ => document.querySelectorAll("td.num").length > 4);
    const price = await page.evaluate(_ => document.querySelectorAll("td.num")[4].textContent);

    await navigationPromise;

    await page.close();
    return parseFloat(price);
  } catch (x) {
    console.log(`Failed getting ${ticker} price`);
    return;
  }
}

module.exports = getInvestopediaPrice;
