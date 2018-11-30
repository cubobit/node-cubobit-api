const rx = require('./rx.js')
const rpc = require('./rpc.js')
const { filter, take } = require('rxjs/operators')

function customCall (func, params, callback = () => {}) {
  rx.socketOpen
  .pipe(filter(open => open),take(1))
  .subscribe(open => {
    rpc.call(func, params, callback)
  })
}

module.exports = customCall
