var TIME = 8;
var timerRunning = false;

$(function () {

	window.addEventListener('message', event => {
		if (event.data == "restartTimer") {
			restartTimer();
		}
	})

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

		$( "#interactive" )
	  		.animate({
			    opacity: 1,
			    width: "100px",
			    height: "100px",
					top: "-=20%",
					right: "-=15%"
			}, 1000, function() {}
		);

	  // 	$( "#ads" )
	  // 		.animate({
		// 	    opacity: 1,
		// 	    width: "100%",
		// 	    height: "100%"
		// 	}, 1000, function() {}
		// );
	}

	$("#click-div").click(function (event) {

		if (timerRunning == false) {
			timer.start();
			timerRunning = true;
			console.log("started timer");
		}

	  $( "#interactive" )
	  		.animate({
			    opacity: 1,
			    width: "70%",
			    height: "60%",
					top: "+=20%",
					right: "+=15%"
			}, 1000, function() {}
		);

		// $( "#ads" )
	  // 		.animate({
		// 	    opacity: 1,
		// 	    width: "100%",
		// 	    height: "30%"
		// 	}, 1000, function() {
		// 		$( "#ads-page" ).css("background", "green");
		// 	}
		// );
	});
});
