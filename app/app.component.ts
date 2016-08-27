import { Component } from '@angular/core';
import { Player } from './player';
import { OnInit } from '@angular/core';

@Component({
	selector: 'my-app',
	templateUrl: 'app/components/app.component.html',
	styleUrls: ['app/app.component.css']
})
export class AppComponent implements OnInit {
  	start: boolean;
  	user: Player = {
  		score: 0,
  		name: ''
  	};
  	computer: Player = {
  		score: 0,
  		name: 'Computer'
  	}

    ngOnInit(): void {
      this.start = false;
  }

  	startGame() {
  		this.start = true;
  	}
}

