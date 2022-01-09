import { Component, OnInit } from '@angular/core';
import {CharactersApiService} from '../service/characters-api.service'
import { combineAll, Observable, EMPTY, empty, of, combineLatest, toArray, take } from 'rxjs';
import { Character } from '../models/character.model';
import { Data } from '../models/data.model';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {

  data: Data;
  characters: Character[];
  sortedCharacter: number;
  characterIdsList: number[];
  user: CharactersApiService;
  gameStart: boolean;

  ALPHABET = "abcdefghijklmnopqrstuvwxyz";
  ORDERS = ["", "-"];

  constructor(private _user: CharactersApiService) {
    this.user = _user;
    this.data = Data.prototype;
    this.characterIdsList = [];
    this.sortedCharacter = 0;
    this.characters = [];
    this.gameStart = false;
  }

  ngOnInit(): void {
    this.getSuficientData();
  }


  on_click(): void {
    this.getSuficientData();
    this.characters = this.selectAmountOfCharacters(4);
    this.sortedCharacter = this.getRandomNumber(4);
    this.gameStart = true;
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
