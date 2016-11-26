var TIME = 5;
var timerRunning = false;

$(function () {

	$("#full-div").click(function (event) {
		restartTimer();
	});

	var timer = new Timer(1000, function (self, seconds) {
		if (seconds == TIME) {
			swapBack();
			self.stop();
			timerRunning = false;
		}
	});

	function restartTimer() {
		if (timerRunning == true) {
			console.log("restarting timer");
			timer.restart();
		}
	}

	function swapBack() {

		$("#interactive")
			.animate({
				opacity: 1,
				width: "100px",
				height: "100px",
				'z-index': "100"
			}, 2000, function () { }
			);

		$("#ads")
			.animate({
				opacity: 1,
				width: "100%",
				height: "100%",
				'z-index': "0"
			}, 2000, function () { }
			);
	}

	$("#click-div").click(function (event) {

		if (timerRunning == false) {
			timer.start();
			timerRunning = true;
			console.log("started timer");
		}

		$("#interactive")
			.animate({
				opacity: 1,
				width: "100%",
				height: "100%",
				'z-index': "0"
			}, 2000, function () { }
			);

		$("#ads")
			.animate({
				opacity: 1,
				width: "100%",
				height: "30%",
				'z-index': "100"
			}, 2000, function () { }
			);

	});
});