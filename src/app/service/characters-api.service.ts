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

  constructor(private http: HttpClient) { }


  getCharactersWithLetter(char: string, order: string, offset: number): Observable<any> {
    return this.http.get<any>
      (
        `https://gateway.marvel.com/v1/public/characters?orderBy=${order}&nameStartsWith=${char}&offset=${offset}${this.CREDENTIAL}`
      ).pipe(map((result: any) => result.data));
  }
}
