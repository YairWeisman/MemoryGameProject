export class Card {

	constructor(public uid: number, public id: number, public image: string, public status: string) {}

	changeStatus(newStatus: string) : void {
		this.status = newStatus;
	}
}