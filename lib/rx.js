const { BehaviorSubject } = require('rxjs')

const socketOpen = new BehaviorSubject(false)
const userData = new BehaviorSubject({})

module.exports = {
  socketOpen,
  userData
}
