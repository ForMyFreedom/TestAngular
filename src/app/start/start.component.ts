import { Component, OnInit } from '@angular/core';
import { CharactersApiService} from '../service/characters-api.service'
import { combineAll, Observable, EMPTY, empty, of, combineLatest, toArray, take } from 'rxjs';
import { Character } from '../models/character.model';
import { Data } from '../models/data.model';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  charApi: CharactersApiService;
  data: Data;
  characters: Character[] = [];

  sortedCharacter: number = 0;
  points: number = 0;
  trys: number = 0;
  choosenId: number = -1;

  gameStart: boolean = false;
  answerWasMade: boolean = false;
  answerResponse: string = "";

  GOAL = 3;
  ALPHABET = "abcdefghijklmnopqrstuvwxyz";
  ORDERS = ["", "-"];
  DEFAULT_IMAGE_URL = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
  
  constructor(private _charApi: CharactersApiService) {
    this.charApi = _charApi;
    this.data = Data.prototype;
  }

  startData() {
    this.characters = [];
    this.sortedCharacter = 0;
    this.points = 0;
    this.trys = 0;
    this.gameStart = false;
    this.answerWasMade = false;
    this.answerResponse = "";
  }

  ngOnInit(): void {
    this.start();
  }


  start(): void {
    if (this.winGame()) {
      this.startData();
      return;
    }

    this.choosenId = -1;
    this.answerWasMade = false;

    this.getSuficientData();
    if (this.characters.length == 0) return;

    this.sortedCharacter = this.getRandomNumber(4);
    this.characters = this.selectAmountOfCharacters(4);
    this.gameStart = true;
  }



  getSuficientData(): void {
    var actualIndex: number = 0;
    var safe: number = 0;
    do {
      this.charApi.getCharactersWithLetter(
        this.getRandomChar(), this.getRandomOrder(), this.getRandomOffset()
      ).subscribe(results => { this.data = results });

      actualIndex = this.addAllCharacters(actualIndex);
      safe++;
    } while (this.characters.length < 30 && safe < 5)
  }


  selectAmountOfCharacters(quant: number): Character[] {
    var lowList: Character[] = [];

    do {
      this.characters = this.shuffle(this.characters);
      lowList = this.characters.slice(0, 4);
    } while (this.thumbnailIsDefault(lowList[this.sortedCharacter]));

    return lowList;
  }



  choose_character(id: number): void {
    if (this.answerWasMade == true) return;
    this.choosenId = id;
    this.answerWasMade = true;
    this.trys++;

    if (id == this.sortedCharacter) {
      this.answerResponse = "Você acertou!";
      this.points++;
    } else {
      this.answerResponse = "Você errou...";
    }

    if (this.winGame()) {
      this.answerResponse = `Você venceu com ${this.trys} tentativas`;
    }
  }



  winGame(): boolean {
    return this.points >= this.GOAL;
  }



  addAllCharacters(actualIndex: number): number {
    if (this.data.results == undefined) return actualIndex;
    for (let i = 0; i < this.data.results.length; i++) {
      this.characters[actualIndex] = this.data.results[i];
      actualIndex++;
    }
    return actualIndex;
  }



  thumbnailIsDefault(character: Character): boolean {
    if (character.thumbnail.path == this.DEFAULT_IMAGE_URL) {
      return true;
    } else {
      return false;
    }
  }



  getRandomChar(): string {
    return this.ALPHABET[this.getRandomNumber(this.ALPHABET.length)];
  }

  getRandomOrder(): string {
    return this.ORDERS[this.getRandomNumber(this.ORDERS.length)] + "name";
  }

  getRandomOffset(): number {
    return this.getRandomNumber(50);
  }

  getRandomNumber(max: number): number {
    return Math.floor(Math.random() * max);
  }

  shuffle(array: any[]): any[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  counter(i: number) {
    return new Array(i);
  }

}
