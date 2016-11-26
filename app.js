var express = require('express')
var app = express()
var path = require("path")

app.use('/public', express.static(__dirname + '/public'))

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/html/index.html'));
})

const port = process.env.PORT || 3000

app.listen(port, function () {
    console.log(`Example app listening on port ${port}!`)
})