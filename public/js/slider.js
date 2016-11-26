var TIME = 3;

var ads = [
	{ "file": "Ads_f_kid_001.jpg", "ageRange": "0-10", "gender": "female" },
	{ "file": "Ads_f_kid_002.jpg", "ageRange": "0-10", "gender": "female" },
	{ "file": "Ads_f_kid_003.jpg", "ageRange": "0-10", "gender": "female" },
	{ "file": "Ads_f_teen_001.jpg", "ageRange": "10-19", "gender": "female" },
	{ "file": "Ads_f_teen_002.jpg", "ageRange": "10-19", "gender": "female" },
	{ "file": "Ads_f_teen_003.jpg", "ageRange": "10-19", "gender": "female" },
	{ "file": "Ads_f_20s_001.jpg", "ageRange": "20-100", "gender": "female" },
	{ "file": "Ads_f_20s_002.jpg", "ageRange": "20-100", "gender": "female" },
	{ "file": "Ads_f_20s_003.jpg", "ageRange": "20-100", "gender": "female" },
	{ "file": "Ads_m_kid_001.jpg", "ageRange": "0-10", "gender": "male" },
	{ "file": "Ads_m_kid_002.jpg", "ageRange": "0-10", "gender": "male" },
	{ "file": "Ads_m_kid_003.jpg", "ageRange": "0-10", "gender": "male" },
	{ "file": "Ads_m_teen_001.jpg", "ageRange": "10-19", "gender": "male" },
	{ "file": "Ads_m_teen_002.jpg", "ageRange": "10-19", "gender": "male" },
	{ "file": "Ads_m_teen_003.jpg", "ageRange": "10-19", "gender": "male" },
	{ "file": "Ads_m_20s_001.jpg", "ageRange": "20-100", "gender": "male" },
	{ "file": "Ads_m_20s_002.jpg", "ageRange": "20-100", "gender": "male" },
	{ "file": "Ads_m_20s_003.jpg", "ageRange": "20-100", "gender": "male" },
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
	console.log(person)
	if (!person) {
		return shuffle(ads);
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
