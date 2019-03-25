# shiryah-stock

A trading algorithm to destroy the Shiryah Investing Competition. It isn't wise to set the stock price at a 5 minute offset to the actual price...

## Theory

1. Generate a list of the Fortune 100.
2. Loop through the list and compare the Investopedia stock price to the Yahoo Finance stock price.
3. Detect the top 5 most volatile stocks.
4. Trade using Puppeteer or notify a human to trade manually.
