const rx = require('./rx.js')
const rpc = require('./rpc.js')
const { filter, take } = require('rxjs/operators')

function getProducts (callback = () => {}) {
  rx.socketOpen
  .pipe(filter(open => open),take(1))
  .subscribe(open => {
    rpc.call('GetProducts', {
      OMSId: rx.userData.value.OMSId || 1
    }, callback)
  })
}

module.exports = getProducts
