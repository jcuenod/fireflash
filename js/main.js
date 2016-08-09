$nextCard = null;
$currentCard = null;
$timerLine = null;

function timer_play()
{
	$timerLine.css({left: "50%", right: "50%"});
	$timerLine.animate({left: "0%", right: "0%"}, 5000, "linear");
}
function timer_pause()
{
	$timerLine.stop();
}

$(document).ready(function(){
	$currentCard = $("#card");
	$nextCard = $("#card").clone();
	$nextCard.addClass("no-transition");
	$nextCard.addClass("is-offpage");
	$(".container").append($nextCard);
	$timerLine = $(".timer-line");
	timer_play();
}).on("click touchend", "body", function(){
	$(".timer-line").css("animation-play-state","paused");
	return false;
}).on("click touchend", "#card", function(){
	$(this).toggleClass("flipped");
	$(".hoverbutton").toggleClass("show");
	timer_pause();
	return false;
}).on("click touchend", ".hoverbutton", function(){
	var direction = 0;
	var classToToggle = "";
	if ($(this).hasClass("right-button"))
	{
		direction = "card-right";
		classToToggle = "is-right";
	}
	else
	{
		direction = "card-left";
		classToToggle = "is-wrong";
	}
	$("body").addClass(classToToggle);
	window.setTimeout(function(){
		$("body").removeClass(classToToggle);
	}, 400);

	$(".hoverbutton").toggleClass("show");
	$currentCard.removeClass("flipped");
	$currentCard.addClass(direction);
	$nextCard.addClass("no-transition");

	$nextCard.removeClass("is-offpage card-left card-right");
	$nextCard.addClass( direction == "card-left" ? "card-right" : "card-left" );
	// $nextCard.css("transform", "translateX(" + (-direction) + "vw)");
	window.setTimeout(function(){
		$nextCard.removeClass("no-transition");
		$nextCard.removeClass( direction == "card-left" ? "card-right" : "card-left" );
		// $nextCard.css("transform", "translateX(0)");
		$tmpCard = $currentCard;
		$currentCard = $nextCard;
		$nextCard = $tmpCard;

		timer_play();
	}, 10)

	return false;
});
