import { Component, OnInit } from '@angular/core';
import {CharactersApiService} from '../service/characters-api.service'
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

  gameStart: boolean = false;
  answerMade: boolean = false;
  answerResponse: string = "";

  GOAL = 2;
  ALPHABET = "abcdefghijklmnopqrstuvwxyz";
  ORDERS = ["", "-"];
<<<<<<< Updated upstream
=======
  DEFAULT_BLOCK = "http://i.annihil.us/u/prod/marvel/i/mg/";
  BLOCKED_URIS = ["b/40/image_not_available", "c/e0/4ce59d3a80ff7", "i/mg/6/10/4c003937c9ba4", "i/mg/6/50/4dd531d26079c", "i/mg/6/60/535febc427605", "i/mg/b/c0/52b0d25c3dbb9", "i/mg/6/b0/4ed7bd3756650"];
  //BLOCKED_URIS IS A TEMPORARY SOLUCTION [Issue #1]
>>>>>>> Stashed changes

  constructor(private _user: CharactersApiService) {
    this.user = _user;
    this.data = Data.prototype;
<<<<<<< Updated upstream
    this.characterIdsList = [];
    this.sortedCharacter = 0;
    this.characters = [];
    this.gameStart = false;
=======

    for (let i = 0; i < this.BLOCKED_URIS.length; i++) {
      this.BLOCKED_URIS[i] = this.DEFAULT_BLOCK + this.BLOCKED_URIS[i];
    }
>>>>>>> Stashed changes
  }

  startData() {
    this.characters = [];
    this.sortedCharacter = 0;
    this.characterIdsList = [];
    this.points = 0;
    this.trys = 0;
    this.gameStart = false;
    this.answerMade = false;
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

    this.answerMade = false;
    this.getSuficientData();
    this.characters = this.selectAmountOfCharacters(4);
    this.sortedCharacter = this.getRandomNumber(4);
    this.gameStart = true;

  }

  choose_character(id: number): void {
    if (this.answerMade == true) return;

    this.answerMade = true;
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

    var allIds: Character[] = [];
    for (let i = 0; i < this.characters.length; i++) {
      allIds[i] = this.data.results[i];
    }

    allIds = this.shuffle(allIds);
    allIds = allIds.slice(0, 4);

    return allIds;
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


  /*
      while (this.size < 20 && safe < 5) {
      var currentRequest: Observable<any> = this.user.getCharactersWithLetter(this.getRandomChar(), this.getRandomOrder());
      currentRequest.subscribe(results => {
        this.size = this.size + results.length;
      })
      safe += 1;
   */

}
