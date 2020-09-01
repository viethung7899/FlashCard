const jwt = require('jsonwebtoken')

require('dotenv').config()

function sign(payload) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      {
        expiresIn: '1d',
      },
      (error, token) => {
        if (error !== null) reject(error)
        resolve(token)
      }
    )
  })
}

function verify(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.TOKEN_SECRET, (error, payload) => {
      if (error !== null) reject(error)
      else resolve(payload)
    })
  })
}

module.exports = {
  sign,
  verify,
}
