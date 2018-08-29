var _ = require('lodash')

const format = {
  orders (arrayOrders) {
    let orders = arrayOrders.length ? _.map(arrayOrders, (data) => {
      return {
        UpdateId: data[0],
        Account: data[1],
        TimeStamp: data[2],
        ActionType: data[3],
        LastTradePrice: data[4],
        Orders: data[5],
        Price: +data[6],
        ProductPairCode: data[7],
        Quantity: +data[8],
        Side: data[9]
      }
    }) : []
    return orders
  },
  trades (arrayTrades) {
    let trades = arrayTrades.length ? _.map(arrayTrades, (data) => {
      return {
        TradeId: data[0],
        ProductPairCode: data[1],
        Quantity: +data[2],
        Price: +data[3],
        Order1: data[4],
        Order2: data[5],
        TradeTime: data[6],
        Direction: data[7],
        Side: data[8],
        IsBlockTrade: data[9] === 1
      }
    }) : []
    return trades
  },
  ticker (arrayTicker) {
    let tickers = arrayTicker.length ? _.map(arrayTicker, (data) => {
      return {
        time: data[0],
        high: data[1],
        low: data[2],
        open: data[3],
        close: data[4],
        volume: data[5]
      }
    }) : []
    return tickers
  }
}

module.exports = format
