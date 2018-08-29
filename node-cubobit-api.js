let api = function cubobit () {
  let cubobit = this
  const _ = require('lodash')
  const rx = require('./lib/rx.js')
  const rpc = require('./lib/rpc.js')
  const signale = require('signale')

  const getOMSs = require('./lib/getOMSs.js')
  const getInstruments = require('./lib/getInstruments.js')
  const subscribeLevel1 = require('./lib/subscribeLevel1.js')
  const subscribeLevel2 = require('./lib/subscribeLevel2.js')
  const subscribeTicker = require('./lib/subscribeTicker.js')
  const getAccountPositions = require('./lib/getAccountPositions.js')

  const defaultOptions = {
    apiUrl: '',
    authenticate: false,
    debug: false
  }
  cubobit.options = defaultOptions
  cubobit.user = {}

  const login = () => {
    rpc.call('AuthenticateUser', cubobit.options.authJson, (response) => {
      if (response.Authenticated === true) {
        cubobit.user = response.User
        rx.userData.next(response.User)
      } else {
        signale.warn('Auth data is not correct.')
      }
    })
  }

  rpc.events.on('open', () => {
    // Change pass only public and secret key
    if (_.has(cubobit.options, 'authJson')) {
      login()
    }
  })

  return {
    init (opts = {}, callback = false) {
      cubobit.options = { ...opts }
      rpc.connect(cubobit.options.apiUrl)

      if (_.isFunction(callback)) {
        callback()
      }
    },
    getOMSs,
    getInstruments,
    subscribeTicker,
    subscribeLevel1,
    subscribeLevel2,
    getAccountPositions
  }
}

module.exports = api()
