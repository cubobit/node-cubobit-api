const rx = require('./rx.js')
const rpc = require('./rpc.js')
const { filter, take } = require('rxjs/operators')

function subscribeTicker (instrument, callback = () => {}) {
  rx.socketOpen
  .pipe(filter(open => open),take(1))
  .subscribe(open => {
    rpc.call('SubscribeTicker', {
      OMSId: rx.userData.value.OMSId || 1,
      InstrumentId: instrument,
      Interval: 60,
      IncludeLastCount: 100
    }, callback)
  })
}

module.exports = subscribeTicker
