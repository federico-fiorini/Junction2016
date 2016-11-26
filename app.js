var express = require('express')
var app = express()
var path = require("path")
var request = require('request')
const bodyParser = require('body-parser')
var getRawBody = require('raw-body')
const async = require('async')

app.use(function(req, res, next) {
    if (req.headers['content-type'] === 'application/octet-stream') {
        getRawBody(req, {
            length: req.headers['content-length'],
            encoding: this.charset
        }, function(err, string) {
            if (err)
                return next(err)

            req.body = string
            next()
        })
    }
    else {
        next()
    }

})

app.use('/public', express.static(__dirname + '/public'))
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    next()
})

//app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/html/index.html'));
})

/*
    { file : '___base64____', type: 'jpeg'}
*/

const face_url = 'https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=true&returnFaceAttributes=age,gender,headPose'
const face_key = '5a0884b5e2d646ea94761bdb11a0d3af'
const emotion_url = 'https://api.projectoxford.ai/emotion/v1.0/recognize'
const emotion_key = '9d7b90b6e4c74260bb66d90042e8960d'

app.post('/file', function(req, res) {
    if (req.body) {

        async.parallel(async.parallel([
            function (callback) {
                sendBlob(req.body, face_url, face_key, callback)
            },
            function (callback) {
                sendBlob(req.body, emotion_url, emotion_key, callback)
            }
        ], (err, results) => {
            res.status(200).send(results)
        }))
    } else {
        res.status(500).send({ "msg": 'Blob error' })
    }
})

function sendBlob(blob, url, key, completion) {
        request({
            url: url,
            method: 'POST',
            headers: {
                'Ocp-Apim-Subscription-Key': key,
                'Content-Type': 'application/octet-stream'
            },
            body: blob
        }, function(error, response, body) {
            completion(error, body)
        });
}

const port = process.env.PORT || 3000

app.listen(port, function() {
    console.log(`Example app listening on port ${port}!`)
})