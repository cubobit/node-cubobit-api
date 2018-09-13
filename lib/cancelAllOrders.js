const rx = require('./rx.js')
const rpc = require('./rpc.js')
const { filter, take } = require('rxjs/operators')

function cancelAllOrders (instrument = 0, callback = () => {}) {

  if (typeof instrument === 'function') {
    callback = instrument
  }

  rx.socketOpenUserData
  .pipe(filter(data => {
    const [socket, user] = data
    return socket && user.UserId != 0
  }),take(1))
  .subscribe(open => {
    rpc.call('CancelAllOrders', {
      OMSId: rx.userData.value.OMSId || 1,
      AccountId: rx.userData.value.AccountId,
      UserId: rx.userData.value.UserId,
      InstrumentId: instrument || 0
    }, callback)
  })
}

module.exports = cancelAllOrders
