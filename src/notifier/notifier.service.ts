import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export class NotifierService {

  messageObservable: Observable<string>;
  private messageSubject: Subject<string>;

  constructor() {
    this.messageSubject = new Subject<string>();
    this.messageObservable = this.messageSubject.asObservable();
  }

  postMessage(message: string) {
    this.messageSubject.next(message);
  }

}
