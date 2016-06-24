import { Component, Input, Output, EventEmitter } from '@angular/core';

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
    constructor() {}

    @Input() word: String;

    scrambledWord: String[];
    
    guessedLetters: GuessedLetter[];

    checking: boolean = false;

    @Output('done') done = new EventEmitter();

    ngOnInit() {
        // shuffle the letters
        let wordLen = this.word.length;
        let wordArray = this.word.split('');
        let i = wordLen;
        while (i > 0) {
            let j = Math.floor(Math.random() * i);
            i--;
            let tmp = wordArray[i];
            wordArray[i] = wordArray[j];
            wordArray[j] = tmp;
        }

        this.scrambledWord = wordArray.map(c => c.toUpperCase());
        this.guessedLetters = wordArray.map(() => {
            return {
                index: -1,
                isHint: false
            };
        });
    }

    clickedLetter(clickedIndex: number) {
        let index = this.guessedLetters.findIndex(i => i.index === -1);
        if (!this.checking && !this.guessedLetters[index].isHint) {
            this.guessedLetters[index].index = clickedIndex;
        }
    }

    private letterUsed(i: number) {
        return this.guessedLetters.findIndex(x => x.index === i) !== -1;
    }

    private letterHinted(i: number) {
        return this.guessedLetters.findIndex(x => x.index === i && x.isHint) !== -1;
    }

    buttonState(i: number): string {
        return !this.letterUsed(i) ? "btn-circle" :
            this.letterHinted(i) ? "btn-circle btn-hint" : "btn-circle btn-disabled";
    }

    letterState(i: number): string {
        return this.guessedLetters[i].isHint ? "hint" :
            this.checking ? (this.scrambledWord[this.guessedLetters[i].index] === this.word[i].toUpperCase() ? "correct" :
                "incorrect") :
            "";
    }

    // remove a guessed letter
    clickedGuess(i: number) {
        this.guessedLetters[i].index = -1;
    }

    hint() {
        let availableLetters = this.guessedLetters.map(g => g.index === -1);
        let nAvailableLetters = availableLetters.filter(b => b).length;
        let chosenLetter = Math.floor(Math.random() * nAvailableLetters) + 1;

        // typescript isn't letting me use findIndex with a callback that includes the index (!)
        // I have to resort to a 'for' loops.
        let wordLen = this.word.length;
        for (let i = 0; i < wordLen; i++) {
            if (this.guessedLetters[i].index === -1) {
                chosenLetter--;
                if (chosenLetter === 0) {
                    let letter = this.word[i].toUpperCase();
                    for (let j = 0; j < wordLen; j++) {
                        if (this.scrambledWord[j] === letter && !this.letterUsed(j)) {
                            this.guessedLetters[i] = {
                                index: j,
                                isHint: true
                            };
                            return;
                        }
                    }
                }
            }
        }
    }

    check() {
        if (this.checking) {
            this.checking = false;
            this.done.emit('');
        }
        else {
            this.checking = true;
        }
    }

    get score() {
        let score = 0;
        let wordLength = this.word.length;
        for (let i = 0; i < wordLength; i++) {
            let index = this.guessedLetters[i].index;
            if (index !== -1 &&
                !this.guessedLetters[i].isHint &&
                this.scrambledWord[index] === this.word[i].toUpperCase()) {
                score++;
            }
        }
        return Math.round(score * 100 / wordLength);
    }
}
