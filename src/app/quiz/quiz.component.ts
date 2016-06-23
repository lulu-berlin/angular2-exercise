import { Component, Input } from '@angular/core';
import { BUTTON_DIRECTIVES } from 'ng2-bootstrap';

@Component({
    selector: 'quiz',
    providers: [ ],
    directives: [ BUTTON_DIRECTIVES ],
    pipes: [ ],
    styleUrls: [ './quiz.style.css' ],
    templateUrl: './quiz.template.html'
})
export class Quiz {
    constructor() {}

    @Input() word: String;

    scrambledWord: String[];
    
    guessedLetters: Number[];

    ngOnInit() {
        // shuffle the letters
        let wordArray = this.word.split('');
        let i = this.word.length;
        while (i > 0) {
            let j = Math.floor(Math.random() * i);
            i--;
            let tmp = wordArray[i];
            wordArray[i] = wordArray[j];
            wordArray[j] = tmp;
        }

        this.scrambledWord = wordArray.map(c => c.toUpperCase());
        this.guessedLetters = wordArray.map(() => -1);
    }

    clickedLetter(clickedIndex: number) {
        this.guessedLetters[this.guessedLetters.findIndex(i => i === -1)] = clickedIndex;
    }

    buttonState(i: number): string {
        return this.guessedLetters.indexOf(i) === -1 ? "btn-circle" : "btn-circle btn-disabled";
    }

    clickedGuess(i: number) {

    }

    hint() {
        console.log("hint");
    }

    check() {
        console.log('check');
    }
}
