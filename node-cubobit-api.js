let api = function cubobit () {
  let cubobit = this
  const _ = require('lodash')
  const rx = require('./lib/rx.js')
  const rpc = require('./lib/rpc.js')
  const signale = require('signale')
  const sha256 = require('crypto-js/hmac-sha256')

  const getOMSs = require('./lib/getOMSs.js')
  const getInstruments = require('./lib/getInstruments.js')
  const getProducts = require('./lib/getProducts.js')
  const subscribeLevel1 = require('./lib/subscribeLevel1.js')
  const subscribeLevel2 = require('./lib/subscribeLevel2.js')
  const subscribeTicker = require('./lib/subscribeTicker.js')
  const getAccountPositions = require('./lib/getAccountPositions.js')
  const sendOrder = require('./lib/sendOrder.js')
  const marketOrders = require('./lib/marketOrders.js')
  const limitOrders = require('./lib/limitOrders.js')
  const cancelAllOrders = require('./lib/cancelAllOrders.js')

  const defaultOptions = {
    apiUrl: '',
    authenticate: false,
    debug: false
  }
  cubobit.options = defaultOptions

  const generateSignature = () => {
    const nonce = parseInt(Math.floor(Math.random() * (9999999999 - 1) + 1), 10)
    const signature = sha256(
      `${nonce}${cubobit.options.USERID}${cubobit.options.APIKEY}`,
      cubobit.options.APISECRET
    ).toString()
    const response = {
      APIKey: cubobit.options.APIKEY,
      Signature: signature,
      UserId: cubobit.options.USERID,
      Nonce: `${nonce}`
    }
    return response
  }

  const login = (signature) => {
    rpc.call('AuthenticateUser', signature, (response) => {
      if (response.Authenticated === true) {
        rx.userData.next(response.User)
        signale.success('authenticated')
      } else {
        signale.warn('Auth data is not correct.')
      }
    })
  }

  rpc.events.on('open', () => {
    if (_.has(cubobit.options, 'CUSTOMSIGNATURE')) {
      login(cubobit.options.CUSTOMSIGNATURE)
    } else if (_.has(cubobit.options, 'APIKEY') && _.has(cubobit.options, 'APISECRET') && _.has(cubobit.options, 'USERID')) {
      login(generateSignature())
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
    getProducts,
    getInstruments,
    subscribeTicker,
    subscribeLevel1,
    subscribeLevel2,
    getAccountPositions,
    sendOrder,
    ...marketOrders,
    ...limitOrders,
    cancelAllOrders
  }
}

module.exports = api()
