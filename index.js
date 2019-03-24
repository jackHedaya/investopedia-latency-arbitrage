const getPrice = require("./alpha-vantage/getPrice");
const getOldPrice = require("./alpha-vantage/getOldPrice");
const oldTime = require("./date/oldTime");

// console.log(oldTime())

getPrice(["MSFT", "AAPL", "NIO"]).then(r => console.log(r));
getOldPrice(["MSFT", "AAPL", "NIO"]).then(r => console.log(r));
