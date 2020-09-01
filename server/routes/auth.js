const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('../jwt')

require('dotenv').config()

const Users = require('../database/user')

// GET auth/register
router.post('/register', async (req, res, next) => {
  // Verify new user existence
  const user = req.body
  const existUser = await Users.getByUserName(user.user_name)
  if (existUser) {
    res.status(403)
    return next(new Error('Email in use'))
  } else {
    const hashedPassword = await bcrypt.hash(user.password, 8)
    const newID = await Users.addNewUser({
      first_name: user.first_name,
      last_name: user.last_name,
      user_name: user.user_name,
      hash_password: hashedPassword,
    })
    console.log(newID)
    // Return user token
    const insertedUser = (await Users.getByUserId(+newID[0]));
    jwt
      .sign(insertedUser)
      .then((token) => {
        delete insertedUser.hash_password
        res.send({
          user: insertedUser,
          token,
        })
      }, next)
      .catch(next)
  }
})

// GET auth/login
router.post('/login', async (req, res, next) => {
  // Extract the body
  const { user_name, password } = req.body
  const user = await Users.getByUserName(user_name)

  // Verify username
  if (!user) {
    res.status(401)
    return next(new Error('User not found'))
  } else {
    // Verify password
    const matched = await bcrypt.compare(password, user.hash_password)
    if (!matched) {
      res.status(401)
      return next(new Error('Wrong password'))
    } else {
      // Generate token
      jwt
        .sign(user)
        .then((token) => {
          delete user.hash_password
          res.send({
            user,
            token,
          })
        }, next)
        .catch(next)
    }
  }
})

module.exports = router
