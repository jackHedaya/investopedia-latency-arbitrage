const puppeteer = require("puppeteer");

/**
 * Sets global browser object to a puppeteer instance
 */
async function initializePuppeteer() {

  global.browser = await puppeteer.launch({
    headless: false,
    userDataDir: "/Users/jachedaya/Library/Application Support/Google/Chrome/Default"
  });
}

module.exports = initializePuppeteer;