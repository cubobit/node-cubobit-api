const rx = require('./rx.js')
const rpc = require('./rpc.js')
const { filter, take } = require('rxjs/operators')

function subscribeLevel1 (instrument, callback = () => {}) {
  rx.socketOpen
  .pipe(filter(open => open),take(1))
  .subscribe(open => {
    rpc.call('SubscribeLevel1', {
      OMSId: rx.userData.value.OMSId || 1,
      InstrumentId: instrument
    }, callback)
    rpc.subscribe('Level1UpdateEvent', callback)
  })
}

module.exports = subscribeLevel1
