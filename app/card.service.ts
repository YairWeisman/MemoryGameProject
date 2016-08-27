import { Injectable } from '@angular/core';

import { Card } from './card';
import { CARDS } from './cards';

@Injectable()
export class CardService {
	getCards(): Promise<Card[]> {
		return Promise.resolve(CARDS);
	}	

	getCard(id: number): Promise<Card> {
	  	return this.getCards()
	             .then(cards => cards.find(card => card.id === id));
	}

}
