const puppeteer = require("puppeteer");
const fs = require("mz/fs");

/**
 * Async function that gets S&P 100 Index, caches to s&p.js, and returns the tickers.
 * @returns {string} tickers
 */
module.exports = (async function() {
  return (await fs.exists("./s&p-cache.js")) ? require("./s&p-cache.js") : await pullSaP();
})();

async function pullSaP() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const navigationPromise = page.waitForNavigation();

  await page.goto("https://en.wikipedia.org/wiki/S%26P_100");

  const tickers = await page.evaluate(() => {
    let tickers = [];

    for (const elem of document.querySelector("#mw-content-text > div > table:nth-child(14) > tbody").children) {
      tickers.push(elem.children[0].textContent.replace("\n", ""));
    }

    tickers.splice(0, 1);
    return tickers;
  });

  await fs.writeFile("./s&p-cache.js", `module.exports = [${tickers.map(x => `"${x}"`)}]`);

  await navigationPromise;

  await browser.close();
  return tickers;
}
