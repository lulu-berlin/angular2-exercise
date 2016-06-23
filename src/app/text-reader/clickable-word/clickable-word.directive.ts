import { Directive, ElementRef, Renderer, Input, HostListener } from '@angular/core';

@Directive({
    selector: '[clickableWord]'
})
export class ClickableWord {
    constructor(private element: ElementRef, private renderer: Renderer) {}

    @Input('clickableWord') word: string;

    private isWord: boolean;

    ngAfterContentInit() {
        this.isWord = /[a-zA-Z]/.test(this.word);
        console.log(this.isWord);
    }

    @HostListener('mouseenter') onMouseEnter() {
        if (this.isWord) {
            this.element.nativeElement.style.borderBottom = '5px solid #3fd17f';
        }
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.element.nativeElement.style.borderBottom = '';
    }

    @HostListener('click') onClick() {
        console.log(this.word);
    }
}
