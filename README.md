# investopedia-latency-arbitrage

A trading algorithm to destroy Investing Competitions. It isn't wise to set the stock price at a 5 minute offset to the actual price...

## Setup

+ `$ virtualenv venv` (Done with Python 3.7)
+ `$ source venv/bin/activate`
+ `$ pip install -r requirements.txt`
+ `Download Selenium WebDriver`

## Run

+ `$ source venv/bin/activate`
+ `$ jupyter notebook`

## Theory

1. Generate a list of the Fortune 100.
2. Loop through the list and compare the Investopedia stock price to the IEX stock price.
3. Detect the top 5 most volatile stocks.
4. Trade using Selenium or notify a human to trade manually.
