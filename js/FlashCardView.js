/* jshint esversion: 6 */
class FlashCardView {
	constructor(score_report_handler) {
		this.$timerLine = null;
		this.$currentCard = null;
		this.$nextCard = null;
		this.score_report_handler = score_report_handler;

		var self = this;

		$(document).ready(function(){
			self.$timerLine = $(".timer-line");
			self.$body = $("body");
			self.$hoverbutton = $(".hoverbutton");
			self.$currentCard = $("#card");
			self.$nextCard = $("#card").clone();
			self.$nextCard.addClass("no-transition");
			self.$nextCard.addClass("is-offpage");

			$(".main").append(self.$nextCard);
			self.timer_play();
		})
		.on("click touchend", "#card", this.event_card_hit(this))
		.on("click touchend", ".hoverbutton", this.event_score_button_hit(this));
	}

	timer_play() {
		this.$timerLine.css({width: "0%"});
		this.$timerLine.animate({width: "100%"}, 5000, "linear");
	}

	event_score_button_hit(context) {
		return function(e) {
			var got_it_right = $(e.target).hasClass("right-button");
			var score = 2;
			//TODO: figre out the score (based on the width of timerline)
			context.score_report_handler(got_it_right, score, context);
			return false;
		};
	}
	event_card_hit(context) {
		return function(e) {
			context.flip_card(context);
			context.timer_pause(context);
			return false;
		};
	}

	set_imminent_card_data(side_one, side_two) {
		this.$nextCard.find(".front div").text(side_one);
		this.$nextCard.find(".back div").text(side_two);
	}

	slide_card(direction_is_right, context) {
		context.cardDirection = direction_is_right ? "card-right" : "card-left";
		var classToToggle = direction_is_right ? "is-right" : "is-wrong";

		context.$body.addClass(classToToggle);
		window.setTimeout(function(){
			context.$body.removeClass(classToToggle);
		}, 400);

		context.$hoverbutton.toggleClass("show");
		context.$currentCard.removeClass("flipped");
		context.$currentCard.addClass(context.cardDirection);
		context.$nextCard.addClass("no-transition");

		context.$nextCard.removeClass("is-offpage card-left card-right");
		context.$nextCard.addClass( context.cardDirection == "card-left" ? "card-right" : "card-left" );

		window.setTimeout(function(){
			context.$nextCard.removeClass("no-transition");
			context.$nextCard.removeClass( context.cardDirection == "card-left" ? "card-right" : "card-left" );
			context.$tmpCard = context.$currentCard;
			context.$currentCard = context.$nextCard;
			context.$nextCard = context.$tmpCard;
			context.timer_play();
		}, 100);
	}
	flip_card(context) {
		context.$currentCard.toggleClass("flipped");
		$(".hoverbutton").toggleClass("show");
	}

	timer_pause(context) {
		//TODO: check whether this first line is necessary
		$(".timer-line").css("animation-play-state","paused");
		context.$timerLine.stop();
	}
}
