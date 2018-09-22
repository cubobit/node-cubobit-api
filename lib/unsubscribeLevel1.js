const rx = require('./rx.js')
const rpc = require('./rpc.js')
const { filter, take } = require('rxjs/operators')

function unsubscribeLevel1 (instrument, callback = () => {}) {
  rx.socketOpen
  .pipe(filter(open => open),take(1))
  .subscribe(open => {
    rpc.call('UnsubscribeLevel1', {
      OMSId: rx.userData.value.OMSId || 1,
      InstrumentId: instrument
    }, callback)
  })
}

module.exports = unsubscribeLevel1
