const { BehaviorSubject, combineLatest } = require('rxjs')

const socketOpen = new BehaviorSubject(false)
const userData = new BehaviorSubject({ UserId: 0 })
const socketOpenUserData = combineLatest(socketOpen, userData)

module.exports = {
  socketOpen,
  userData,
  socketOpenUserData
}
