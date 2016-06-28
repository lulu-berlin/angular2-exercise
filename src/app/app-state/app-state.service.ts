import { Injectable } from '@angular/core';

import { LocalStorageService } from "angular2-localstorage/LocalStorageEmitter";
import { LocalStorage } from "angular2-localstorage/WebStorage";

export interface Word {
    nParagraph: number,
    nWord: number,
    wordText: string
}

interface GuessedLetter {
    index: number,      // index pointing to scrambledWord; -1 means not guessed yet
    isHint: boolean
}

interface QuizState {
    scrambledWord: String[],
    guessedLetters: GuessedLetter[],
    checking: boolean
}

interface State {
    selectedWord?: Word,
    quiz?: QuizState
}

@Injectable()
export class AppState {
    constructor(storageService: LocalStorageService) {}

    @LocalStorage() state: State = {};

    reset(): void { this.state = {}; }

    get playingQuiz(): boolean { return this.state.quiz !== undefined; }

    get selectedWord(): string {
        return this.state.selectedWord.wordText.trim().replace(/^[^a-zA-Z]*(.*?)[^a-zA-Z]*$/, '$1');
    }

    get nParagraph(): number { return this.state.selectedWord.nParagraph; }

    get nWord(): number { return this.state.selectedWord.nWord; }

    startQuiz(wordData: Word): void {
        this.state.selectedWord = wordData;

        // shuffle the letters
        let word        = this.selectedWord;
        let wordArray   = word.split('');
        let i           = word.length;

        while (i > 0) {
            let j = Math.floor(Math.random() * i);
            i--;
            let tmp = wordArray[i];
            wordArray[i] = wordArray[j];
            wordArray[j] = tmp;
        }

        this.state.quiz = {
            scrambledWord:  wordArray.map(c => c.toUpperCase()),
            guessedLetters: wordArray.map(() => ({
                index: -1,
                isHint: false
            })),
            checking: false
        };
    }

    get quizChecking(): boolean         { return this.state.quiz.checking; }
    set quizChecking(checking: boolean) { this.state.quiz.checking = checking; }

    get guessedLetters(): String[] {
        return this.state.quiz.guessedLetters
            .map(i => i.index === -1 ? ' ' : this.state.quiz.scrambledWord[i.index]);
    }

    get scrambledWord(): String[] { return this.state.quiz.scrambledWord; }

    /*
     * Checks whether a letter-button (specified by its index) was already pressed.
     */
    letterButtonUsed(i: number): boolean {
        return this.state.quiz.guessedLetters.findIndex(x => x.index === i) !== -1;
    }

    /*
     * Checks whether a letter-button (specified by its index) was used for a hint.
     */
    letterButtonHinted(i: number): boolean {
        return this.state.quiz.guessedLetters.findIndex(x => x.index === i && x.isHint) !== -1;
    }

    /*
     * Checks whether a guessed letter (above; specified by its index) is a hint.
     */
    letterHinted(i: number): boolean { return this.state.quiz.guessedLetters[i].isHint; }

    /*
     * User guessed a letter.
     */
    guessLetter(i: number): void {
        let emptyIndex = this.state.quiz.guessedLetters.findIndex(i => i.index === -1);
        this.state.quiz.guessedLetters[emptyIndex].index = i;
    }

    /*
     * Remove a guessed letter.
     */
    removeGuess(i: number): void { this.state.quiz.guessedLetters[i].index = -1; }
    
    /*
     * remove a guessed letter by clicking again on its button.
     */
    removeGuessByButton(i: number): void {
        this.state.quiz.guessedLetters[this.state.quiz.guessedLetters.findIndex(g => g.index === i)].index = -1;
    }

    /*
     * Was the letter guessed correctly?
     */
    isCorrectlyGuessed(i: number): boolean {
        return this.scrambledWord[this.state.quiz.guessedLetters[i].index] === this.selectedWord[i].toUpperCase();
    }

    hint() {
        let word: string = this.selectedWord.toUpperCase();

        let hints = this.state.quiz.guessedLetters
            .map((g, gIndex, guessedLetters) => g.index === -1 && this.scrambledWord.some((l, sIndex) =>
                l === word[gIndex] && guessedLetters.every(g => g.index !== sIndex)) ? {
                    guessedLetterIndex: gIndex,
                    scrambledIndex: this.scrambledWord
                        .map((c, i) => ({char: c, index: i}))
                        .findIndex(({char, index}) => char === word[gIndex] && !this.letterButtonUsed(index))
                } : undefined)
            .filter(hint => hint !== undefined);

        if (hints.length === 0) {
            // no possible hints found (happens when too many wrong guesses were made)
            return;
        }

        let hint = hints[Math.floor(Math.random() * hints.length)];

        this.state.quiz.guessedLetters[hint.guessedLetterIndex] = {
            index: hint.scrambledIndex,
            isHint: true
        };
    }
}
