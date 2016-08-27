import { Component } from '@angular/core';
import { Card } from './card';
import { Player } from './player';
import { CardService } from './card.service';
import { OnInit } from '@angular/core';
import { DoCheck } from '@angular/core';

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
  	didntPlay: boolean;
  	
	constructor(
	  private cardService: CardService) {}

	ngOnInit(): void {
	    this.getCards(Math.floor((Math.random()*10)+1));
	    this.currentPlayer = AppComponent.user;
	}
		
	getCards(numOfCards: number): void {
	  	this.cardService.getCards().then(cards => this.cards = cards.slice(0, numOfCards));
	}

	ngDoCheck(): void {
		if ((this.currentPlayer == AppComponent.computer) && (this.didntPlay)) {

			this.didntPlay = false;

			let card1 = CardService.getCard(getRandomNum());
			let card2 = CardService.getCard(getRandomNum());

			while (!validPick(card1))
				card1 = CardService.getCard(getRandomNum());
			this.onSelect(card1);

			while (!validPick(card2))
				card2 = CardService.getCard(getRandomNum());
			this.onSelect(card2);

			this.didntPlay = true;
		}
	}

	validPick(card: Card): boolean {
		if (card.status === 'hidden')
			return true;
		else return false;
	}

  	onSelect(card: Card): void {
  		if (validPick(card)){
	  		if (cardsPicked === 0) {
		  		this.firstSelect = card;
		  		this.cardsPicked++;
		  		card.status = 'peeked';
	  		}
	  		else {
	  			this.cardsPicked = 0;
	  			this.secondSelect = card;
	  			card.status = 'peeked';
	  			
	  			setTimeout(2000);
	  			
	  			if (this.firstSelect === this.secondSelect) {
	  				this.firstSelect.status = 'shown';
	  				this.secondSelect = 'shown';
	  				this.currentPlayer.score++;
	  			}
	  			else {
	  				this.firstSelect.status = 'hidden';
	  				this.secondSelect = 'hidden';
	  				if (this.currentPlayer == AppComponent.computer)
	  					this.currentPlayer = AppComponent.user;
	  				else this.currentPlayer = AppComponent.computer;	  				
	  			}
	  		}  			
  		}
	}

	getRandomNum(): number {
		return Math.floor((Math.random()*numOfCards)+1);
	}

	random(): number {
		return Math.random();
	}
}


