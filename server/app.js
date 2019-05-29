const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const expressValidator = require('express-validator')
require('dotenv/config')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(expressValidator())
app.use(cors())

require('./routes/index')(app)

const PORT = process.env.APP_PORT || 3001

app.listen(PORT, () => {
    console.log(`App started on ${PORT}`)
})