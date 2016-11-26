var TIME = 5;

var ads = [
 	{"file":"ad_001.jpg", "ageRange":"6-12",  "gender":"female"},
    {"file":"ad_002.jpg", "ageRange":"6-40",  "gender":"mix"},
    {"file":"ad_003.jpg", "ageRange":"17-45", "gender":"female"},
    {"file":"ad_004.jpg", "ageRange":"17-45", "gender":"female"},
    {"file":"ad_005.jpg", "ageRange":"18-99", "gender":"male"},
    {"file":"ad_006.jpg", "ageRange":"40-99", "gender":"mix"},
    {"file":"ad_007.jpg", "ageRange":"16-45", "gender":"female"},
    {"file":"ad_008.jpg", "ageRange":"17-45", "gender":"mix"},
    {"file":"ad_009.jpg", "ageRange":"17-45", "gender":"female"},
    {"file":"ad_010.jpg", "ageRange":"18-99", "gender":"male"},
    {"file":"ad_011.jpg", "ageRange":"17-45", "gender":"mix"},
    {"file":"ad_012.jpg", "ageRange":"21-40", "gender":"mix"},
    {"file":"ad_013.jpg", "ageRange":"6-55",  "gender":"mix"},
    {"file":"ad_014.jpg", "ageRange":"18-45", "gender":"male"},
    {"file":"ad_015.jpg", "ageRange":"18-45", "gender":"female"},
    {"file":"ad_016.jpg", "ageRange":"6-45",  "gender":"mix"},
    {"file":"ad_017.jpg", "ageRange":"6-45",  "gender":"mix"},
    {"file":"ad_018.jpg", "ageRange":"17-45", "gender":"mix"},
    {"file":"ad_019.jpg", "ageRange":"18-65", "gender":"male"},
    {"file":"ad_020.png", "ageRange":"18-45", "gender":"mix"},
    {"file":"ad_021.png", "ageRange":"6-45",  "gender":"mix"},
    {"file":"ad_022.jpg", "ageRange":"25-99", "gender":"female"},
    {"file":"ad_023.jpg", "ageRange":"18-45", "gender":"male"},
    {"file":"ad_024.jpg", "ageRange":"18-45", "gender":"female"}
];

//fdfds

var previousPerson = null
function getLastPerson() {
	if (people.faces.length == 1) {
		return {
				 'age': people.faces[0].faceAttributes.age,
				 'gender': people.faces[0].faceAttributes.gender
				}
	}
	return null
}

function computeImageSet(person) {
	if (!person) {
		imageSet = ads;
		return;
	}

	var imgs = []

	ads.forEach(dict => {
		if (dict.gender != 'mix' && dict.gender != person.gender) { return }
		if (ageInInterval(person.age, dict.ageRange)) {
			imgs.push(dict)
		}
	})

	function ageInInterval(age, interval) {
		const values = interval.split('-').map(val => {return parseInt(val)})
		return age >= values[0] && age <= values[1]
	}
	return shuffle(imgs)
}

function personChanged(person) {
	return person != previousPerson
}

var imageSet = ads;

var current = 0;

$(function() {
	var timer = new Timer(1000, function(self, seconds) {
		if (seconds % TIME == 0) {
			changeAd();
		}
	});

	function changeAd() {
		let person = getLastPerson()
		if (personChanged(person)) {
			imageSet = computeImageSet(person)
			current = 0
		} else {
			current = (current + 1) % ads.length;
		}
		$( "#ads-page" ).css('background-image', `url(/public/img/${imageSet[current].file})`);
		previousPerson = person
		console.log(imageSet)
	}

	timer.start();
});


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}