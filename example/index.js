const cubobit = require('../node-cubobit-api.js')
const signale = require('signale')

cubobit.init({
  authJson: {
    "APIKey": "ViS9QHvQcCxcroM61LlQJko7FTQ0",
    "Signature": "awheNVFjda48BQ6tTpGHINSwkszO",
    "UserId": "0",
    "Nonce": "2405212341"
  }
})

cubobit.subscribeLevel1(1, (response) => {
  signale.info(response)
})
