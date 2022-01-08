import { Component } from '@angular/core';
import { CharactersApiService } from './service/characters-api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'MarvelQuiz';
  data: Observable<any>;
  intCharId: number;

  ALPHABET = "abcdefghijklmnopqrstuvwxyz";
  ORDERS = ["", "-"];

  constructor(private user: CharactersApiService) {
    this.data = user.getCharactersWithLetter(this.getRandomChar(), this.getRandomOrder());
    this.intCharId = 0;
  }

  getRandomChar(): string {
    return this.ALPHABET[this.getRandomNumber(this.ALPHABET.length)];
  }

  getRandomOrder(): string {
    return this.ORDERS[this.getRandomNumber(this.ORDERS.length)]+"name";
  }

  getRandomNumber(max: number): number {
    return Math.floor(Math.random() * (max + 1));
  }
}
