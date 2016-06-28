import { Component } from '@angular/core';

import { AppState } from '../app-state';
import { ClickableWord } from './clickable-word';
import { TextService } from "../text.service";

@Component({
    selector: 'textReader',
    providers: [ ],
    directives: [ ClickableWord ],
    pipes: [ ],
    styleUrls: [ './text-reader.style.css' ],
    templateUrl: './text-reader.template.html'
})
export class TextReader {
    constructor(private state: AppState, private text: TextService) {}
}
