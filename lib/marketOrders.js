const sendOrder = require('./sendOrder.js')

function marketBuy (instrumentId, quantity, callback = () => {}) {
  sendOrder({
    side: 0,
    quantity: quantity,
    orderType: 1,
    instrumentId: instrumentId
  }, callback)
}

function marketSell (instrumentId, quantity, callback = () => {}) {
  sendOrder({
    side: 1,
    quantity: quantity,
    orderType: 1,
    instrumentId: instrumentId
  }, callback)
}

module.exports = {
  marketBuy,
  marketSell
}
