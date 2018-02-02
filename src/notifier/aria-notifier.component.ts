import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { NotifierService } from './notifier.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'shark-table-aria-notifier',
  template: `<div class="notification-area screen-reader" aria-atomic="true" aria-live="polite">{{ status }}</div>`
})
export class AriaNotifierComponent implements OnChanges, OnDestroy {

  status: string;

  @Input()
  notifierService: NotifierService;

  private notifierSubscription: Subscription;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hasOwnProperty('notifierService')) {
      if (!this.notifierSubscription) {
        this.subscribeToNotifier();
      } else {
        this.notifierSubscription.unsubscribe();
        this.subscribeToNotifier();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.notifierSubscription) {
      this.notifierSubscription.unsubscribe();
    }
  }

  private subscribeToNotifier() {
    this.notifierSubscription = this.notifierService.messageObservable.subscribe((message) => this.status = message);
  }
}
