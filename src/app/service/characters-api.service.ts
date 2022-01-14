import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Character } from '../models/character.model';

@Injectable({
  providedIn: 'root'
})
export class CharactersApiService {
  SALT: string = "formyfreedom";
  PUB_KEY: string = "9a4b2e3b34e7f06577202aec17b86206";
  HASH: string = "9a86812375a1e887231a05fb7c7465e3";
  CREDENTIAL: string = `&ts=${this.SALT}&apikey=${this.PUB_KEY}&hash=${this.HASH}`;
  FIRST_URL: string = "https://gateway.marvel.com/v1/public/characters?orderBy=";
  SECOND_URL: string = "&nameStartsWith=";

  constructor(private http: HttpClient) { }


  getCharactersWithLetter(char: string, order: string): Observable<any> {
    return this.http.get<any>
      (
        this.FIRST_URL + order + this.SECOND_URL + char + this.CREDENTIAL
      ).pipe(map((result: any) => result.data));
  }
}
