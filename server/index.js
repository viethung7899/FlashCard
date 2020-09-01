const express = require('express')
const app = express()

const cors = require('cors')
const sets = require('./routes/sets')
const home = require('./routes/home')
const auth = require('./routes/auth')

const middlewares = require('./middlewares')

// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/auth', auth)
app.use('/', home)
app.use('/sets', sets)

// Handlers
app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

app.listen(5000, () => {
  console.log('Listing in port 5000')
})
