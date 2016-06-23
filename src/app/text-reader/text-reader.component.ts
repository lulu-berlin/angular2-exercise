import { Component } from '@angular/core';
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

    ngOnInit() {
        console.log('hello `TextReader` component');
        // this.title.getData().subscribe(data => this.data = data);
    }
}
