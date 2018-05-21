function card(value, name, suit){
	this.value = value;
	this.name = name;
	this.suit = suit;
}

function deck(){
	this.names = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
	this.suits = ['Hearts','Diamonds','Spades','Clubs'];
	var cards = [];

    for( var s = 0; s < this.suits.length; s++ ) {
        for( var n = 0; n < this.names.length; n++ ) {
            cards.push( new card( n+1, this.names[n], this.suits[s] ) );
        }
    }
    return cards;
}

function shuffledDeck(){
	var Deck = new deck();
	for (var i = Deck.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = Deck[i];
			Deck[i] = Deck[j];
			Deck[j] = temp;
	}
	return Deck
}

module.exports = {
	deck: shuffledDeck
}
