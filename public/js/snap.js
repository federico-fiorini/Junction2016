window.onload = function() {
    document.getElementById('my_camera').style.display = 'none'
    Webcam.set({
        width: 640,
        height: 480,
        image_format: 'jpeg',
        jpeg_quality: 90
    });
    Webcam.attach('#my_camera');
    Webcam.on('live', () => {
        setStatus('Connected!')
        setTimeout(function() {
            const timer = new Timer(3000, take_snapshot)
            timer.start()
        }, 1000);
    })
}

var people = { faces: [], emotions: [] }

function setStatus(str) {
    const node = document.getElementById('result_status')
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
    node.innerHTML = str
}

function getDominantEmotion(dict) {
    var emotion = ''
    var value = 0.0
    for (var key in dict) {
        if (dict[key] > value) {
            value = dict[key]
            emotion = key
        }
    }
    return emotion
}

function getAgeGroup(age) {
    const ages = ['1 - 8', '8 - 12', '12 - 15', '15 - 20', '20 - 30', '30 - 40', '40 - 50']
    var ag = '50 +'
    ages.forEach(group => {
        var values = group.split(' - ').map(str => {
            return parseInt(str)
        })
        if (age >= values[0] && age <= values[1]) {
            return ag = group
        }
    })
    return ag
}

function applyEmojis(status) {
    const node = document.getElementById('result_status')
    node.innerHTML = ''
    while (node.hasChildNodes()) {
        node.removeChild(node.lastChild);
    }
    
    console.log(`===: ${status.length}`)
    console.log(status[0])
   
    var emojiDiv = document.createElement('div')
    var i = 0;
    for (i = 0; i < status.length; i++) {
        var img = document.createElement('img')
        var dict = status[i]
        img.url = `/public/img/${dict.gender}_${dict.emotion}.png`
        var textDiv = document.createElement('div')
        textDiv.innerHTML = `${dict.age}`
        var statusDiv = document.createElement('div')
        statusDiv.appendChild(img)
        //statusDiv.appendChild(textDiv)
        emojiDiv.appendChild(statusDiv)
    }
    node.appendChild(emojiDiv)
}

function computeStatus() {
    var status = []
    for (var i = 0; i < people.faces.length; i++) {
        
        console.log(people.faces[i])

        let attr = people.faces[i].faceAttributes
        var emotion = ''
        if (people.emotions.length > i) {
            emotion = getDominantEmotion(people.emotions[i].scores)
        }

        if (emotion.length == 0) {
            emotion = 'neutral'
        }
        latestAge = Math.ceil(attr.age)
        if (latestAge > 30) {
            latestAge -= 5;
        }
        let dict = { gender: attr.gender, emotion: emotion, age: getAgeGroup(latestAge) }
        status.push(dict)
    }

    if (status.length > 0) {
        return applyEmojis(status)
    }
    setStatus('Loading...')
}

function take_snapshot() {
    Webcam.snap(function(data_uri) {
        console.log('TOOK SNAP!')
        const token = 'base64,'
        const base64 = data_uri.substring(data_uri.indexOf(token) + token.length)
        const blob = b64toBlob(base64, 'image/jpeg')

        post(blob, res => {
            people['faces'] = JSON.parse(res[0])
            people['emotions'] = JSON.parse(res[1])
            computeStatus()
        })
    });
}

function post(data, completion) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://futurebusstation/file/')
    xhr.setRequestHeader('Content-Type', 'application/octet-stream')

    xhr.onload = function() {
        completion(JSON.parse(this.response))
    }
    xhr.send(data)
}

/*
function analyzeEmotion(data, completion) {
    const key = '63609cc73858437f9cadcd3e503c25b9'
    const url = 'https://api.projectoxford.ai/emotion/v1.0/recognize'
    post(url, data, key, completion)
}

function analyzeFace(data, completion) {
    const key = '21a3cbe1e9c74b6882f0a21e02477fd4'
    const url = 'https://api.projectoxford.ai/face/v1.0/detect?returnFaceId=true&returnFaceAttributes=age,gender,headPose'
    post(url, data, key, completion)
}

function post(url, data, key, completion) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url)
    xhr.setRequestHeader('Content-Type', 'application/octet-stream')
    xhr.setRequestHeader('Ocp-Apim-Subscription-Key', key)

    xhr.onload = function() {
        completion(JSON.parse(this.response))
    }

    xhr.send(data)
}
*/

function b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        var slice = byteCharacters.slice(offset, offset + sliceSize);

        var byteNumbers = new Array(slice.length);
        for (var i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        var byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
}