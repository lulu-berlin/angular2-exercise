/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

import { TextService } from './text.service';
//import { Router } from "@angular/router";

import { TextReader } from './text-reader';
import { Quiz } from './quiz';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  providers: [ TextService ],
  styleUrls: [ './app.style.css' ],
  directives: [ TextReader, Quiz ],
  template: `
    <textReader [playingQuiz]="playingQuiz" (playQuiz)="playQuiz($event);"></textReader>
    <quiz *ngIf="playingQuiz" [word]="quizWord"></quiz>
  `
  /*template: `
    <nav>
      <span>
        <a [routerLink]=" ['./'] ">
          Index
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./home'] ">
          Home
        </a>
      </span>
      |
      <span>
        <a [routerLink]=" ['./text'] ">
          Text
        </a>
      </span>
    </nav>

    <main>
      <router-outlet></router-outlet>
    </main>
  `*/
})
export class App {
  playingQuiz: boolean = false;
  quizWord: String;

  constructor() {}

  ngOnInit() {
    //console.log('Initial App State', this.appState.state);
    //this.router.navigate(['home']);
  }

  playQuiz(event) {
    this.playingQuiz = true;
    this.quizWord = event.word.trim().replace(/^[^a-zA-Z]*(.*?)[^a-zA-Z]*$/, '$1');
  }

}
