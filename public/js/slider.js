var TIME = 5;

var ads = [
	"/public/img/1.jpg",
	"/public/img/2.jpg",
	"/public/img/3.jpg"
];

var current = 0;

$(function() {
	var timer = new Timer(1000, function(self, seconds) {
		if (seconds % TIME == 0) {
			changeAd();
		}
	});

	function changeAd() {
		current = (current + 1) % ads.length;
		$( "#ads-page" ).css('background-image', 'url("' + ads[current] + '")');
	}

	timer.start();
});
