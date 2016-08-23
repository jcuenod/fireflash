var cards = [
	{
		"side_one": 'ἀνοίγω',
		"side_two": 'to open'
	},{
		"side_one": "ἐρῶ",
		"side_two": "I shall say"
	},{
		"side_one": "ὧδε",
		"side_two": "hither, here"
	},{
		"side_one": "εἶδον",
		"side_two": "I saw (idea)"
	},{
		"side_one": "ἤδη",
		"side_two": "now, already"
	},{
		"side_one": "ἐνώπιον",
		"side_two": "with the gen., before"
	},{
		"side_one": "ἐγείρω",
		"side_two": "I raise up"
	},{
		"side_one": "θεωρέω",
		"side_two": "I look at, behold (theorem; theory)"
	},{
		"side_one": "πλείων, -ονος",
		"side_two": "larger, more (pleonasm)"
	},{
		"side_one": "ὅπως",
		"side_two": "in order that, that"
	},{
		"side_one": "ὅπου",
		"side_two": "where, whither"
	}
];
var card_index = 0;

var $nextCard = null;
var $currentCard = null;
var $timerLine = null;

function timer_play()
{
	$timerLine.css({width: "0%"});
	$timerLine.animate({width: "100%"}, 5000, "linear");
}
function timer_pause()
{
	$timerLine.stop();
}

function set_next_card_data()
{
	card_index++;
	card_index = card_index % cards.length;
	$nextCard.find(".front div").text(cards[card_index].side_one);
	$nextCard.find(".back div").text(cards[card_index].side_two);
}
function next_card(got_it_right)
{
	var direction = got_it_right ? "card-right" : "card-left";
	var classToToggle = got_it_right ? "is-right" : "is-wrong";

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
		set_next_card_data();

		timer_play();
	}, 100);
}
