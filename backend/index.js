require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./Routes/router')

// import DB connection
require('./Db/dbConnection')

// create server
const server = express()

// middleware
server.use(cors())
server.use(express.json())

// routes
server.use(router)






// port
const PORT = process.env.PORT || 3000

// listen
server.listen(PORT, () => {
  console.log(`server running at port ${PORT}`)
})

// test route
server.get('/', (req, res) => {
  res
    .status(200)
    .send('<h1>server running and waiting for client request</h1>')
})
