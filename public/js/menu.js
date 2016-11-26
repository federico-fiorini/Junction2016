$(function() {

  var menu1_clicked = false;
  var menu2_clicked = false;
  var menu3_clicked = false;
  var menu4_clicked = false;

  $( "#menu-001" ).click(function(event) {
    parent.postMessage("restartTimer", "*");

    if (menu1_clicked == true) {
      return;
    }

    menu1_clicked = true;
    $("#bus-frame")
      .css('z-index', '+=10')
      .css('visibility', 'visible')
      .animate({
			    opacity: 1,
			    width: "100%",
			    height: "100%"
			}, 1000, function() {}
		);

    setTimeout(function() {
      $("#bus-frame").animate({
  			    opacity: 1,
  			    width: "50%",
  			    height: "50%"
  			}, 1000, function() {
          $(this).css('z-index', '-=10')
          .css('visibility', 'hidden');
          menu1_clicked = false;
        }
  		)
    }, 10000);
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

    if (menu3_clicked == true) {
      return;
    }

    menu3_clicked = true;
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
          menu3_clicked = false;
        }
  		)
    }, 4000);
	});

  $( "#menu-004" ).click(function(event) {
    parent.postMessage("restartTimer", "*");

    if (menu4_clicked == true) {
      return;
    }

    menu4_clicked = true;
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
          menu4_clicked = false;
        }
  		)
    }, 4000);
	});
});
