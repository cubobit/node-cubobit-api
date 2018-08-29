const rx = require('./rx.js')
const rpc = require('./rpc.js')
const { filter, take } = require('rxjs/operators')

function getOMSs (callback = () => {}) {
  rx.socketOpen
  .pipe(filter(open => open),take(1))
  .subscribe(open => {
    rpc.call('GetOMSs', {
      OperatorId: rx.userData.value.OperatorId || 1
    }, callback)
  })
}

module.exports = getOMSs
