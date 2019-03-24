const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false, userDataDir: "/Users/jachedaya/Library/Application Support/Google/Chrome/Default" })
  const page = await browser.newPage()
  
  const navigationPromise = page.waitForNavigation()

  await page.goto('https://www.investopedia.com/accounts/login.aspx?returnurl=https%3A%2F%2Fwww.investopedia.com%2Fsimulator%2Fgame%2F')
  
  await page.setViewport({ width: 1099, height: 648 })
  
  await page.waitForSelector('.row > .column-12 > .form-box > .form-item > #edit-email')
  await page.click('.row > .column-12 > .form-box > .form-item > #edit-email')
  
  await page.waitForSelector('.row > .column-12 > .form-box > .form-item > #edit-email')
  await page.click('.row > .column-12 > .form-box > .form-item > #edit-email')
  
  await page.type('.row > .column-12 > .form-box > .form-item > #edit-email', 'lchen@nshahs.org')
  
  await page.click('.row > .column-12 > .form-box > .form-item > #edit-password')
  await page.type('.row > .column-12 > .form-box > .form-item > #edit-password', 'Crest4Kids!')
  
  await navigationPromise
})()