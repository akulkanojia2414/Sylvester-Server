require('dotenv').config({path: './default.env'})

// Get the packages we need
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

console.log(process.env.MONGO_URL)
mongoose.connect(process.env.MONGO_URL)
const loginRoutes = require('./routes/login')

const app = express()

// Use environment defined port or 3000
const port = process.env.PORT || 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.use('/',loginRoutes)
app.listen(port)
console.log('Server Started ' + port)
