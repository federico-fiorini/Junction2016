window.onload = function () {
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
        setTimeout(function () {
            const timer = new Timer(3000, take_snapshot)
            timer.start()
        }, 1000);
    })
}

function setStatus(str) {
    document.getElementById('result_status').innerHTML = str
}

function take_snapshot() {
    Webcam.snap(function (data_uri) {
        console.log('TOOK SNAP!')
        const token = 'base64,'
        const base64 = data_uri.substring(data_uri.indexOf(token) + token.length)
        const blob = b64toBlob(base64, 'image/jpeg')

        analyzeFace(blob, face => {
            console.log('Face: ', face)
            str = ''
            for (let i = 0; i < face.length; i++) {
                let attr = face[i].faceAttributes
                str += `[${i+1}] Age: ${attr.age}   Gender: ${attr.gender}<br/>`
            }
            if (str.length == 0) {str = 'Loading...'}
            setStatus(str)
        })

        analyzeEmotion(blob, emotion => {
            console.log('Emotion: ', emotion)
        })
    });
}

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

    xhr.onload = function () {
        completion(JSON.parse(this.response))
    }

    xhr.send(data)
}

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