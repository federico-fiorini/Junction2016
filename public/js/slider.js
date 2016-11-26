var TIME = 3;

var ads = [
	{ "file": "w_1.jpg", "ageRange": "20-100", "gender": "female" },
	{ "file": "w_2.gif", "ageRange": "20-100", "gender": "female" },
	{ "file": "w_3.jpg", "ageRange": "20-100", "gender": "female" },
	{ "file": "w_4.png", "ageRange": "0-14", "gender": "female" },
	{ "file": "w_5.png", "ageRange": "0-14", "gender": "female" },
	{ "file": "w_6.jpg", "ageRange": "13-20", "gender": "female" },
	{ "file": "m_1.jpeg", "ageRange": "20-100", "gender": "male" },
	{ "file": "m_2.png", "ageRange": "20-100", "gender": "male" },
	{ "file": "m_3.jpg", "ageRange": "0-14", "gender": "male" },
	{ "file": "m_4.jpg", "ageRange": "0-14", "gender": "male" },
	{ "file": "m_5.jpg", "ageRange": "0-14", "gender": "male" },
	{ "file": "m_6.jpg", "ageRange": "0-14", "gender": "male" },
	{ "file": "m_7.png", "ageRange": "14-20", "gender": "male" },
];

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
		if (dict.gender !== person.gender) { return }
		if (ageInInterval(person.age, dict.ageRange)) {
			imgs.push(dict)
		}
	})

	function ageInInterval(age, interval) {
		const values = interval.split('-').map(val => { return parseInt(val) })
		return age >= values[0] && age <= values[1]
	}
	return shuffle(imgs)
}

function personChanged(person) {
	return person != previousPerson
}

var imageSet = ads;

var current = 0;

$(function () {
	var timer = new Timer(1000, function (self, seconds) {
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
		$("#ads-page").css('background-image', `url(/public/img/${imageSet[current].file})`);
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