/* jshint esversion: 6 */
class FlashCardController {
	constructor(firebase_interface) {
		this.currentCard = {};
		this.cardHistory = [];
		// this.cardFuture = []; (for if we go backwards - then we should also be able to go forwards - we just empty this if we go forwards in a way that doesn't use this but it actually exists)
		this.card_index = 0;
		this.firebase_interface = firebase_interface;
	}
	getNextCard() {
		this.nextCard();
		return this.currrentCard;
	}
	completeCard(rank) {
		rankCurrentCard(rank);
		this.cardHistory.push(this.currentCard);
		this.currentCard = getNewCard();
	}
	rankCurrentCard(rank) {
		// do fancy supermemo calc on card and save using firebase...
		// this.firebase_interface.saveCard(card_with_new_rank)
		//TODO: figure out how to store the newranked card in localstorage for next time there's a connection
	}
	getNewCard() {
		// use firebase to fetch a new one (or just cache a bunch of them...)
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
		return cards[this.card_index++ % cards.length];
	}
}
