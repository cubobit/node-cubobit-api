const rx = require('./rx.js')
const rpc = require('./rpc.js')
const { filter, take } = require('rxjs/operators')

function subscribeTicker (instrument, interval = 60, count = 100, callback = () => {}) {
  rx.socketOpen
  .pipe(filter(open => open),take(1))
  .subscribe(open => {
    rpc.call('SubscribeTicker', {
      OMSId: rx.userData.value.OMSId || 1,
      InstrumentId: instrument,
      Interval: interval,
      IncludeLastCount: count
    }, callback)
  })
}

module.exports = subscribeTicker
