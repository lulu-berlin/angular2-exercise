import { Component } from '@angular/core';

import { AppState } from '../app-state';

interface GuessedLetter {
    index: number, // index pointing to scrambledWord; -1 means not guessed yet
    isHint: boolean
}

@Component({
    selector: 'quiz',
    providers: [ ],
    directives: [ ],
    viewProviders: [ ],
    pipes: [ ],
    styleUrls: [ './quiz.style.css' ],
    templateUrl: './quiz.template.html'
})
export class Quiz {
    constructor(private state: AppState) {}

    /*
     * One of the letter-buttons was clicked.
     */
    letterButtonClicked(i: number): void {
        if (!this.state.quizChecking) {
            if (!this.state.letterButtonUsed(i)) {
                this.state.guessLetter(i);
            }
            else if (!this.state.letterButtonHinted(i)) {
                this.state.removeGuessByButton(i);
            }
        }
    }

    /*
     * The CSS selector for the letter-button
     */
    buttonSelector(i: number): string {
        return !this.state.letterButtonUsed(i) ? "btn-circle" :
            this.state.letterButtonHinted(i) ? "btn-circle btn-hint" : "btn-circle btn-used";
    }

    /*
     * the CSS selector for the guessed-letter
     */
    letterSelector(i: number): "hint" | "correct" | "incorrect" | "" {
        return this.state.letterHinted(i) ? "hint" :
            this.state.quizChecking ? (this.state.isCorrectlyGuessed(i) ? "correct" : "incorrect") : "";
    }

    // remove a guessed letter
    clickedGuess(i: number) {
        if (!this.state.letterHinted(i)) {
            this.state.removeGuess(i);
        }
    }

    check(): void {
        if (this.state.quizChecking) {
            this.state.reset();
        }
        else {
            this.state.quizChecking = true;
        }
    }

    get score(): number {
        let score = 0, wordLength = this.state.guessedLetters.length;
        for (let i = 0; i < wordLength; i++) {
            if (!this.state.letterHinted(i) && this.state.isCorrectlyGuessed(i)) {
                score++;
            }
        }
        return Math.round(score * 100 / wordLength);
    }
}
