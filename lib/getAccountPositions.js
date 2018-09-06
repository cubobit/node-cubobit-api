const rx = require('./rx.js')
const rpc = require('./rpc.js')
const { filter, take } = require('rxjs/operators')

function getAccountPositions (callback = () => {}) {
  rx.socketOpenUserData
  .pipe(filter(data => {
    const [socket, user] = data
    return socket && user.UserId != 0
  }),take(1))
  .subscribe(open => {
    rpc.call('GetAccountPositions', {
      OMSId: rx.userData.value.OMSId || 1,
      AccountId: rx.userData.value.AccountId
    }, callback)
  })
}

module.exports = getAccountPositions
