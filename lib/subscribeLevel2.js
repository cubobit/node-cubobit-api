const rx = require('./rx.js')
const rpc = require('./rpc.js')
const format = require('./../utils/format.js')
const { filter, take } = require('rxjs/operators')

function subscribeLevel2 (instrument, depth, callback = () => {}) {
  rx.socketOpen
  .pipe(filter(open => open),take(1))
  .subscribe(open => {
    rpc.call('SubscribeLevel2', {
      OMSId: rx.userData.value.OMSId || 1,
      InstrumentId: instrument,
      Depth: depth
    }, (response) => {
      const orders = format.orders(response)
      callback(orders)
    })
    rpc.subscribe('Level2UpdateEvent', (response) => {
      const orders = format.orders(response)
      callback(orders)
    })
  })
}

module.exports = subscribeLevel2
