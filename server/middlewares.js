const jwt = require('./jwt')

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if (token === null) {
    res.status(401)
    return next(new Error('Unathorized request'))
  }

  jwt.verify(token).then((payload) => {
    if (!payload) {
      res.status(401)
      return next(new Error('Unathorized request'))
    } else {
      req.body.userID = payload.user_id
      next()
    }
  }).catch(next)
}

function notFound(req, res, next) {
  const error = new Error(`Not found ${req.originalUrl}`)
  res.status(404)
  next(error)
}

function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.json({
    message: err.message,
  })
}

module.exports = {
  verifyToken,
  notFound,
  errorHandler,
}
