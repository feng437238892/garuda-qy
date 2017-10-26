const express = require('express')
const compression = require('compression')
const path = require('path')
const app = express()
const opn = require('opn')

app.use(compression());

app.use(express.static(path.join(__dirname, '../dist')))

app.listen(7777, () => {
  console.log(`App listening at port: 7777`)
})
