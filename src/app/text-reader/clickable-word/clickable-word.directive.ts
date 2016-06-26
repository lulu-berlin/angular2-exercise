import { Directive, ElementRef, Input, HostListener } from '@angular/core';

import { AppState, Word } from '../../app-state';

@Directive({
    selector: '[clickableWord]'
})
export class ClickableWord {
    constructor(private element: ElementRef, private state: AppState) {}

    @Input('clickableWord') wordData: Word;

    private underline() {
        // only underline if it is an actual word
        if (/[a-zA-Z]/.test(this.wordData.wordText)) {
            this.element.nativeElement.style.borderBottom = '5px solid #3fd17f';
        }
    }

    private removeUnderline() {
        this.element.nativeElement.style.borderBottom = '';
    }

    @HostListener('mouseenter')  onMouseEnter()  { this.underline(); }
    @HostListener('touchstart')  onTouchStart()  { this.underline(); }
    @HostListener('mouseleave')  onMouseLeave()  { this.removeUnderline(); }
    @HostListener('touchend')    onTouchEnd()    { this.removeUnderline(); }
    @HostListener('touchcancel') onTouchCancel() { this.removeUnderline(); }

    @HostListener('click') onClick() {
        // only start quiz if it is an actual word
        if (/[a-zA-Z]/.test(this.wordData.wordText)) {
            this.state.startQuiz(this.wordData);
        }
    }
}
