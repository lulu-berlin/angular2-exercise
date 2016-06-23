import { Directive, ElementRef, Renderer, Input, Output, HostListener, EventEmitter } from '@angular/core';

@Directive({
    selector: '[clickableWord]'
})
export class ClickableWord {
    constructor(private element: ElementRef, private renderer: Renderer) {}

    @Input('clickableWord') word: string;

    @Output('wordClicked') wordClicked = new EventEmitter();

    private isWord: boolean;

    ngAfterContentInit() {
        this.isWord = /[a-zA-Z]/.test(this.word);
        console.log(this.isWord);
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
        this.wordClicked.emit({
            word: this.word
        })
    }

}
