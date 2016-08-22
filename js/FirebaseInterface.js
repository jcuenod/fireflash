/* jshint esversion: 6 */
class FirebaseInterface {
	constructor () {
		this.config = {
			apiKey: "AIzaSyBLLnuqSSA5TN5C1PW-FAEfkOmhm56SZac",
			authDomain: "fireflash-be1f4.firebaseapp.com",
			databaseURL: "https://fireflash-be1f4.firebaseio.com",
			storageBucket: "fireflash-be1f4.appspot.com",
		};
		firebase.initializeApp(this.config);// Initialize Firebase
	}

	login() {
	}
	logout() {
	}
	currentUser() {
	}

	saveCard(card_with_new_rank) {
	}
	getCards(some_kind_of_filter) {
	}
}
