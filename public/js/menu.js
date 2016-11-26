$(function() {

  var menu1_clicked = false;
  var menu2_clicked = false;
  var menu3_clicked = false;
  var menu4_clicked = false;

  $( "#menu-001" ).click(function(event) {
		// $(this).attr("src", "/public/img/content_001.png");
    parent.postMessage("restartTimer", "*");
	});

  $( "#menu-002" ).click(function(event) {

    parent.postMessage("restartTimer", "*");

    if (menu2_clicked == true) {
      return;
    }

    menu2_clicked = true;
		$(this).attr("src", "/public/img/content_002.png");
    $(this).css('z-index', '+=10')
      .animate({
			    opacity: 1,
			    width: "100%",
			    height: "100%"
			}, 1000, function() {}
		);

    setTimeout(function() {
      $("#menu-002").animate({
  			    opacity: 1,
  			    width: "50%",
  			    height: "50%"
  			}, 1000, function() {
          $(this).css('z-index', '-=10');
          $(this).attr("src", "/public/img/menu_002.png");
          menu2_clicked = false;
        }
  		)
    }, 4000);
	});

  $( "#menu-003" ).click(function(event) {
    parent.postMessage("restartTimer", "*");

    if (menu2_clicked == true) {
      return;
    }

    menu2_clicked = true;
		$(this).attr("src", "/public/img/content_003.png");
    $(this).css('z-index', '+=10')
      .animate({
			    opacity: 1,
			    width: "100%",
			    height: "100%"
			}, 1000, function() {}
		);

    setTimeout(function() {
      $("#menu-003").animate({
  			    opacity: 1,
  			    width: "50%",
  			    height: "50%"
  			}, 1000, function() {
          $(this).css('z-index', '-=10');
          $(this).attr("src", "/public/img/menu_003.png");
          menu2_clicked = false;
        }
  		)
    }, 4000);
	});

  $( "#menu-004" ).click(function(event) {
    parent.postMessage("restartTimer", "*");

    if (menu2_clicked == true) {
      return;
    }

    menu2_clicked = true;
		$(this).attr("src", "/public/img/content_004.png");
    $(this).css('z-index', '+=10')
      .animate({
			    opacity: 1,
			    width: "100%",
			    height: "100%"
			}, 1000, function() {}
		);

    setTimeout(function() {
      $("#menu-004").animate({
  			    opacity: 1,
  			    width: "50%",
  			    height: "50%"
  			}, 1000, function() {
          $(this).css('z-index', '-=10');
          $(this).attr("src", "/public/img/menu_004.png");
          menu2_clicked = false;
        }
  		)
    }, 4000);
	});
});
