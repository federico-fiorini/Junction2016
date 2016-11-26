$(function() {
	
	$( "#top-left" ).click(function(event) {

		console.log("clicked");

	  	$( "#ads" )
	  		.animate({
			    opacity: 1,
			    width: "100%",
			    height: "100%",
			    'z-index': "0"
			}, 2000, function() {}
		);

	  	$( "#interactive" )
	  		.animate({
			    opacity: 1,
			    width: "100px",
			    height: "100px",
			    'z-index': "100"
			}, 2000, function() {}
		);

	});
});