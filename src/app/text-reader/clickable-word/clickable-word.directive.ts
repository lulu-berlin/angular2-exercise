import { Directive, ElementRef, Renderer, Input, Output, HostListener, EventEmitter } from '@angular/core';

export interface WordData {
    nParagraph: number,
    nWord: number,
    word: string
}

@Directive({
    selector: '[clickableWord]'
})
export class ClickableWord {
    constructor(private element: ElementRef, private renderer: Renderer) {}

    @Input('clickableWord') wordData: WordData;

    get word() {
        return this.wordData.word;
    }

    @Output('wordClicked') wordClicked = new EventEmitter();

    private isWord: boolean;

    ngAfterContentInit() {
        this.isWord = /[a-zA-Z]/.test(this.word);
    }

    private underline() {
        if (this.isWord) {
            this.element.nativeElement.style.borderBottom = '5px solid #3fd17f';
        }
    }

    private removeUnderline() {
        this.element.nativeElement.style.borderBottom = '';
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.underline();
    }

    @HostListener('touchstart') onTouchStart() {
        this.underline();
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.removeUnderline();
    }

    @HostListener('touchend') onTouchEnd() {
        this.removeUnderline()
    }

    @HostListener('touchcancel') onTouchCancel() {
        this.removeUnderline()
    }

    @HostListener('click') onClick() {
        this.wordClicked.emit(this.wordData);
    }

}
