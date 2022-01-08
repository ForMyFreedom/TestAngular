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

  constructor(private user: CharactersApiService) {
    this.data = user.getAllCharacters();
    this.intCharId = 0;
  }

  sortCharacter(): void {
  }
}
