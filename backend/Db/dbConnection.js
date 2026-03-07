const mongoose = require('mongoose')


const CONNECTION_STRING = process.env.connection_String

mongoose.connect(CONNECTION_STRING)
  .then(() => {
    console.log("MongoDB Atlas connected to server")
  })
  .catch((err) => {
    console.log("Connection Failed")
    console.log(err)
  })
