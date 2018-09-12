const sendOrder = require('./sendOrder.js')

function limitBuy (instrumentId, quantity, limitPrice, callback = () => {}) {
  sendOrder({
    side: 0,
    quantity: quantity,
    orderType: 2,
    instrumentId: instrumentId,
    limitPrice: limitPrice
  }, callback)
}

function limitSell (instrumentId, quantity, limitPrice, callback = () => {}) {
  sendOrder({
    side: 1,
    quantity: quantity,
    orderType: 2,
    instrumentId: instrumentId,
    limitPrice: limitPrice
  }, callback)
}

module.exports = {
  limitBuy,
  limitSell
}
