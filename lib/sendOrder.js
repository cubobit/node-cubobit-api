const rx = require('./rx.js')
const rpc = require('./rpc.js')
const { filter, take } = require('rxjs/operators')

function sendOrder (order, callback = () => {}) {
  // let order = {
  //   side: 0,
  //   quantity: 0,
  //   orderType: 1,
  //   instrumentId: 1,
  //   limitPrice: 0,
  //   stopPrice: 0,
  //   peg: 0,
  //   trailingAmount: 0,
  //   limitOffset: 0,
  //   displayQuantity: 0
  // }
  rx.socketOpenUserData
  .pipe(filter(data => {
    const [socket, user] = data
    return socket && user.UserId != 0
  }),take(1))
  .subscribe(open => {
    const limitPrice = order.orderType % 2 === 0 && order.limitPrice
    const stopPrice = order.stopPrice || 0
    const commonPayload = {
      AccountId: rx.userData.value.AccountId,
      ClientOrderId: 0,
      Side: order.side,
      Quantity: order.quantity,
      OrderIdOCO: 0,
      OrderType: order.orderType,
      InstrumentId: order.instrumentId,
      TimeInForce: 0,
      OMSId: rx.userData.value.OMSId || 1,
      UseDisplayQuantity: false
    }

    let payload

    switch (order.orderType) {
      case 2: {
        payload = {
          ...commonPayload,
          LimitPrice: +limitPrice
        }
        break
      }
      case 3: {
        payload = {
          ...commonPayload,
          StopPrice: +stopPrice,
          PegPriceType: order.side == 0 ? 3 : 2
        }
        break
      }
      case 4: {
        payload = {
          ...commonPayload,
          LimitPrice: +order.limitPrice,
          StopPrice: +stopPrice,
          PegPriceType: order.side == 0 ? 3 : 2
        }
        break
      }
      case 5: {
        payload = {
          ...commonPayload,
          PegPriceType: order.peg || 0,
          TrailingAmount: order.trailingAmount
        }
        break
      }
      case 6: {
        payload = {
          ...commonPayload,
          TrailingAmount: order.trailingAmount,
          LimitOffset: order.limitOffset,
          PegPriceType: order.peg || 0
        }
        break
      }
      case 8: {
        payload = {
          ...commonPayload,
          LimitPrice: +limitPrice,
          OrderType: 2,
          TimeInForce: 4
        }
        break
      }
      case 10: {
        payload = {
          ...commonPayload,
          LimitPrice: +limitPrice,
          OrderType: 2,
          TimeInForce: 3
        }
        break
      }
      case 12: {
        payload = {
          ...commonPayload,
          DisplayQuantity: order.displayQuantity,
          LimitPrice: +limitPrice,
          OrderType: 2,
          UseDisplayQuantity: true
        }
        break
      }
      case 1:
      case 7:
      default: {
        payload = commonPayload
      }
    }

    console.log(payload)

    rpc.call('SendOrder', {
      ...payload
    }, callback)
  })
}

module.exports = sendOrder
