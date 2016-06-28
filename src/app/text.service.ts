import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Rx";

export interface Text {
  title: String,
  paragraphs: String[][]
}

const textFileName = "assets/texts/harry-potter.txt";

@Injectable()
export class TextService {
  constructor(http: Http) {
    http.get(textFileName)
        .map(this.extractData)
        .subscribe(
            text => { this._text = text; },
            this.handleError,
            () => { console.log('done')}
        );
  }

  private _text: Text = {
    title: "",
    paragraphs: [[]]
  };

  get title():      String     { return this._text.title; }
  get paragraphs(): String[][] { return this._text.paragraphs; }

  private extractData(response: Response): Text {
    let paragraphs =
        response.text()
            .split('\n\n')
            .map(p =>
                p.replace(/(\s+|\n|\r)/g, ' ')
                 .replace(/—/g, ' — '));
    return {
      title: paragraphs[0],
      paragraphs: paragraphs.slice(1).map(p => p.split(' '))
    }
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

}
