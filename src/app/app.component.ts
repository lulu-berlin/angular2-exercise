import { Component, ViewEncapsulation } from '@angular/core';

import { TextService } from './text.service';
import { TextReader } from './text-reader';
import { Quiz } from './quiz';
import { WordData } from './text-reader/clickable-word'

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  providers: [ TextService ],
  styleUrls: [ './app.style.css' ],
  directives: [ TextReader, Quiz ],
  template: `
    <textReader [playingQuiz]="playingQuiz" [wordData]="wordData" (playQuiz)="playQuiz($event);"></textReader>
    <quiz *ngIf="playingQuiz" [word]="quizWord" (done)="donePlayingQuiz();"></quiz>
  `
})
export class App {
  playingQuiz: boolean = false;
  quizWord: String = "";
  wordData: WordData;

  constructor() {}

  playQuiz(event) {
    this.playingQuiz = true;
    this.wordData = event;
    this.quizWord = this.wordData.word.trim().replace(/^[^a-zA-Z]*(.*?)[^a-zA-Z]*$/, '$1');
  }

  donePlayingQuiz() {
    this.playingQuiz = false;
    this.quizWord = "";
  }

}
