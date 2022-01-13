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

  data: Data;
  characters: Character[] = [];
  sortedCharacter: number = 0;
  characterIdsList: number[] = [];
  user: CharactersApiService;
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
  
  constructor(private _user: CharactersApiService) {
    this.user = _user;
    this.data = Data.prototype;
    this.characterIdsList = [];
    this.sortedCharacter = 0;
    this.characters = [];
    this.gameStart = false;

  }

  startData() {
    this.characters = [];
    this.sortedCharacter = 0;
    this.characterIdsList = [];
    this.points = 0;
    this.trys = 0;
    this.gameStart = false;
    this.answerWasMade = false;
    this.answerResponse = "";
  }

  ngOnInit(): void {
    this.getSuficientData();
  }


  start(): void {
    if (this.winGame()) {
      this.startData();
      return;
    }

    this.choosenId = -1;
    this.answerWasMade = false;
    this.getSuficientData();
    this.sortedCharacter = this.getRandomNumber(4);
    this.characters = this.selectAmountOfCharacters(4);
    this.gameStart = true;

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


  getSuficientData(): void {
    this.user.getCharactersWithLetter(this.getRandomChar(), this.getRandomOrder()).subscribe(results => { this.data = results });
    this.characters = this.data.results;
    //make it suficient
  }


  selectAmountOfCharacters(quant: number) : Character[] {
    var length: number = this.data.count;
    var charList: Character[] = [];
    for (let i = 0; i < this.characters.length; i++) {
      charList[i] = this.data.results[i];
    }

    do {
      charList = this.shuffle(charList);
      charList = charList.slice(0, 4);
    } while (this.thumbnailIsDefault(charList[this.sortedCharacter]));

    return charList;
  }



  thumbnailIsDefault(character: Character): boolean {
    if (character.thumbnail.path == "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available") {
      return true;
    } else {
      return false;
    }
    /**
    if (imageLocation.pathname == this.DEFAULT_IMAGE_URL)
      return true;
    else
      return false;
    **/
  }

  getRandomChar(): string {
    return this.ALPHABET[this.getRandomNumber(this.ALPHABET.length)];
  }

  getRandomOrder(): string {
    return this.ORDERS[this.getRandomNumber(this.ORDERS.length)] + "name";
  }

  getRandomNumber(max: number): number {
    return Math.floor(Math.random() * (max)); //+1 ?
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


  getBase64Image(img: any) {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    if (ctx == null) return;
    ctx.drawImage(img, 0, 0);

    var dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

  /*
      while (this.size < 20 && safe < 5) {
      var currentRequest: Observable<any> = this.user.getCharactersWithLetter(this.getRandomChar(), this.getRandomOrder());
      currentRequest.subscribe(results => {
        this.size = this.size + results.length;
      })
      safe += 1;
   */

}
