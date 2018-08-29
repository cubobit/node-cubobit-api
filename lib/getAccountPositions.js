const rx = require('./rx.js')
const rpc = require('./rpc.js')
const { filter, take } = require('rxjs/operators')

function getAccountPositions (instrument, callback = () => {}) {
  rx.socketOpen
  .pipe(filter(open => open),take(1))
  .subscribe(open => {
    rpc.call('GetAccountPositions', {
      OMSId: rx.userData.value.OMSId || 1,
      AccountId: cubobit.user.AccountId
    }, callback)
  })
}

module.exports = getAccountPositions
