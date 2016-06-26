import { Component, ViewEncapsulation } from '@angular/core';
import { LocalStorageService } from "angular2-localstorage/LocalStorageEmitter";
import { LocalStorage } from "angular2-localstorage/WebStorage";


import { TextService } from './text.service';
import { TextReader } from './text-reader';
import { Quiz } from './quiz';
import { AppState } from './app-state';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  providers: [ LocalStorageService, TextService, AppState ],
  styleUrls: [ './app.style.css' ],
  directives: [ TextReader, Quiz ],
  template: `
    <textReader></textReader>
    <quiz *ngIf="state.playingQuiz"></quiz>
  `
})
export class App {
  constructor(storageService: LocalStorageService, private state: AppState) {}
  
}
