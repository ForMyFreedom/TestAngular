import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CharactersApiService {
  SALT: string = "formyfreedom";
  PUB_KEY: string = "a7b8bc8b9193ca7e618d237211930c64";
  HASH: string = "c3c18dc6fd79807b7a28d003e6ccde9c";
  CREDENTIAL: string = `&ts=${this.SALT}&apikey=${this.PUB_KEY}&hash=${this.HASH}`;
  FIRST_URL: string = "https://gateway.marvel.com/v1/public/characters?orderBy=";
  SECOND_URL: string = "&nameStartsWith=";

  constructor(private http: HttpClient) { }


  getCharactersWithLetter(char: string, order: string): Observable<any> {
    return this.http.get<any>
      (
        this.FIRST_URL + order + this.SECOND_URL + char + this.CREDENTIAL
      ).pipe(map((data: any) => data.data.results))
  }
}
