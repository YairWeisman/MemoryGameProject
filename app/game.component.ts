import { Component } from '@angular/core';
import { Card } from './card';
import { Player } from './player';
import { OnInit } from '@angular/core';
import { DoCheck } from '@angular/core';
import { AppComponent } from './app.component';

@Component({
    selector: 'match-pairs',
    templateUrl: 'app/game.component.html',
  	styleUrls:  ['app/game.component.css']
})

export class GameComponent implements OnInit, DoCheck {
  	firstSelect: Card;
  	secondSelect: Card;
  	cards: Card[];
  	cardsPicked: number;
  	currentPlayer: Player;
  	computerIsPlaying: boolean;
  	showRestart: boolean;
  	selectedCard: Card;

  	CARDS = [
	  new Card(1,1,'../images/1.png','hidden'),
	  new Card(2,1,'../images/1.png','hidden'),
	  new Card(3,2,'../images/2.png','hidden'),
	  new Card(4,2,'../images/2.png','hidden'),
	  new Card(5,3,'../images/3.png','hidden'),
	  new Card(6,3,'../images/3.png','hidden'),
	  new Card(7,4,'../images/4.png','hidden'),
	  new Card(8,4,'../images/4.png','hidden'),
	  new Card(9,5,'../images/5.png','hidden'),
	  new Card(10,5,'../images/5.png','hidden'),
	  new Card(11,6,'../images/6.png','hidden'),
	  new Card(12,6,'../images/6.png','hidden'),
	  new Card(13,7,'../images/7.png','hidden'),
	  new Card(14,7,'../images/7.png','hidden'),
	  new Card(15,8,'../images/8.png','hidden'),
	  new Card(16,8,'../images/8.png','hidden'),
	  new Card(17,9,'../images/9.png','hidden'),
	  new Card(18,9,'../images/9.png','hidden'),
	  new Card(19,10,'../images/10.png','hidden'),
	  new Card(20,10,'../images/10.png','hidden')
	];

	constructor(
		private appComponent: AppComponent) {}

	// Pick between 4 to 10 cards.		
	numOfCardsPlayed = Math.floor((Math.random()*7)+4);

	ngOnInit(): void {
	    this.getCards(this.numOfCardsPlayed);
	    this.currentPlayer = this.appComponent.user;
	    this.cardsPicked = 0;
	    this.showRestart = false;
	    this.computerIsPlaying = false;
	}
	
	getCards(numOfCards: number): void {
	  	this.cards = this.shuffle(this.CARDS.slice(0, numOfCards * 2));
	}

	// Checking always...
	ngDoCheck(): void {
		// Check if game over
		if (this.appComponent.user.score + this.appComponent.computer.score == this.numOfCardsPlayed) {
			let diff = this.appComponent.user.score - this.appComponent.computer.score;
			let unit = '';
			(diff == 1)? (unit = ' point') : (unit=' points');
			// user won
			if (diff > 0) {
				alert('You Won by ' + diff + unit);
			}
			// user lost
			else if (diff < 0) {
				alert('You Lost by ' + (-1 * diff) + ' points');
			}
			// tie
			else {
				alert("It's a tie!");
			}
			this.showRestart = true;
		}

		// Check if it's the computer turn
		else if ((this.currentPlayer == this.appComponent.computer) && (!this.computerIsPlaying)) {
			this.computerIsPlaying = true;
			this.computerFirstPick();
		}
	}

	computerFirstPick(): void {
		this.firstSelect = this.getRandomeCard();
		while (!this.validPick(this.firstSelect))
			this.firstSelect = this.getRandomeCard();
		this.onSelect(this.firstSelect);
		setTimeout(() => {this.computerSecondPick();}, 1000);
	}

	computerSecondPick(): void {
		this.secondSelect = this.getRandomeCard();
		// Pick valid card that's not the same as the first choice
		while ((this.secondSelect === this.firstSelect) || (!this.validPick(this.secondSelect)))
			this.secondSelect = this.getRandomeCard();
		this.onSelect(this.secondSelect);
	}

	validPick(card: Card): boolean {
		if (card.status === 'hidden')
			return true;
		else return false;
	}

  	onSelect(card: Card): void {
  		if (this.validPick(card)){
	  		this.selectedCard = card;
	  		if (this.cardsPicked == 0) {
		  		this.firstSelect = card;
		  		this.cardsPicked = 1;
		  		this.firstSelect.changeStatus('peeked');
	  		}
	  		else {
	  			this.cardsPicked = 0;
	  			this.secondSelect = card;
	  			this.secondSelect.changeStatus('peeked');
	  			setTimeout(() => {this.getResult(card);}, 1000);
	  		}  			
  		}
	}

	getResult(card: Card): void {
		if (this.firstSelect.id == this.secondSelect.id) {
			this.firstSelect.changeStatus('shown');
			this.secondSelect.changeStatus('shown');
			this.currentPlayer.score++;
			this.firstSelect = null;
			this.secondSelect = null;
			this.selectedCard = null;
			if (this.currentPlayer == this.appComponent.computer)
				setTimeout(() => {this.computerFirstPick();}, 1000);
		}
		else {
			this.firstSelect.changeStatus('hidden');
			this.secondSelect.changeStatus('hidden');
			this.firstSelect = null;
			this.secondSelect = null;
			this.selectedCard = null;
			if (this.currentPlayer == this.appComponent.computer){
				this.currentPlayer = this.appComponent.user;
				this.computerIsPlaying = false;
			}
			else this.currentPlayer = this.appComponent.computer;	  				
		}
	}

	getRandomeCard(): Card {
		return this.cards[Math.floor(Math.random()*this.numOfCardsPlayed*2)];
	}
	
	shuffle(array : Card[]): Card[] {
		let copy: Card[] , n = array.length, i = 0;
		copy = [];
		while (n) {
		    i = Math.floor(Math.random() * n--);
		    copy.push(array.splice(i, 1)[0]);
		}
		return copy;
	}

	restartGame() : void {
		window.location.reload();
	}
}