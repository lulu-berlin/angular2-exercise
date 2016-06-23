import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TextService } from '../text.service';
import { Observable } from 'rxjs/Observable';
import { ClickableWord } from './clickable-word';


@Component({
    selector: 'textReader',
    providers: [ ],
    directives: [ ClickableWord ],
    pipes: [ ],
    styleUrls: [ './text-reader.style.css' ],
    templateUrl: './text-reader.template.html'
})
export class TextReader {

    title: Observable<String>;
    paragraphs: Observable<String[][]>;

    constructor(private textService: TextService) {
        this.title = textService.textTitle;
        this.paragraphs = textService.textParagraphs;
    }

    @Input('playingQuiz') playingQuiz: boolean;
    @Output() playQuiz = new EventEmitter();

    wordClicked(event) {
        this.playQuiz.emit(event);
    }
}
