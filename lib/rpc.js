let rpc = function rpc () {

  const WebSocket = require('ws')
  const signale = require('signale')
  const EventEmitter = require('events')
  const rx = require('./rx.js')

  let ws = null
  let nextIvalue = 2
  let replyWaitObjects = []
  let eventWaitObjects = []

  const events = new EventEmitter()

  const handleSocketOpen = () => {
    rx.socketOpen.next(true)
    events.emit('open')
  }

  const handleSocketHeartbeat = () => {
    // signale.info('socket:pong')
  }

  const handleSocketError = (error) => {
    signale.error(error)
  }

  const handleSocketClose = () => {
    rx.socketOpen.next(false)
    events.emit('close')
  }

  const handleSocketMessage = (message) => {
    const frame = JSON.parse(message)
    const rpcCallback = replyWaitObjects[frame.i]

    if (rpcCallback) {
      if (frame.o != '') {
        try {
          rpcCallback(JSON.parse(frame.o))
        } catch (exception) {
          signale.error(`Can not execute the callback for ${frame.n} ${frame.o} ${exception}`)
        }
      } else {
        rpcCallback()
      }
      delete replyWaitObjects[frame.i]
    }

    if (eventWaitObjects[frame.n]) {
      if (frame.o !== '') {
        for (let i = 0; i < eventWaitObjects[frame.n].length; ++i) {
          try {
            eventWaitObjects[frame.n][i](JSON.parse(frame.o))
          } catch (exception) {
            signale.error(`Can not execute the callback for ${frame.n} ${exception}`)
          }
        }
      } else {
        for (let i = 0; i < eventWaitObjects[frame.n].length; ++i) {
          eventWaitObjects[frame.n][i]()
        }
      }
    }
  }

  return {
    events,
    connect (url) {
        ws = new WebSocket(url)
        ws.on('open', handleSocketOpen)
        ws.on('pong', handleSocketHeartbeat)
        ws.on('error', handleSocketError)
        ws.on('close', handleSocketClose)
        ws.on('message', handleSocketMessage)
    },
    call (functionName, paramObject, callback = () => { }, level) {
      const frame = {
        m: level || 0,
        i: nextIvalue,
        n: functionName,
        o: paramObject ? JSON.stringify(paramObject) : ''
      }
      ws.send(JSON.stringify(frame))
      replyWaitObjects[nextIvalue] = callback
      nextIvalue += 2
    },
    subscribe (eventName, callback) {
      if (eventWaitObjects[eventName] === undefined) {
        eventWaitObjects[eventName] = []
      }
      eventWaitObjects[eventName].push(callback)
    }
  }
}

module.exports = rpc()
