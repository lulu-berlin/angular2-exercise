import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

export interface Text {
  title: String,
  paragraphs: String[][]
}

@Injectable()
export class TextService {
  constructor(private http: Http) {}

  private text: Observable<Text>;

  private getText(): Observable<Text> {
    if (!this.text) {
      this.text = this.http.get("assets/texts/harry-potter.txt")
                      .map(this.extractData);
    }
    return this.text;
  }

  get textTitle(): Observable<String> {
    return this.getText().map(t => t.title);
  }

  get textParagraphs(): Observable<String[][]> {
    return this.getText().map(t => t.paragraphs);
  }

  private extractData(response: Response): Text {
    let paragraphs = response.text()
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
