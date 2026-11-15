import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { NotifierService } from './notifier.service';

@Component({
  selector: 'shark-table-aria-notifier',
  template: `<div id="shark-table-aria-notifier-{{ tableId }}" class="notification-area screen-reader" aria-atomic="true" aria-live="polite">{{ status }}</div>`
})
export class AriaNotifierComponent implements OnChanges, OnDestroy {

  private readonly cdr = inject(ChangeDetectorRef);

  status = '';

  @Input()
  tableId: string;

  @Input()
  notifierService: NotifierService;

  private notifierSubscription: Subscription | undefined;

  private clearTimer: ReturnType<typeof setTimeout> | undefined;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['notifierService']) {
      this.notifierSubscription?.unsubscribe();
      this.notifierSubscription = this.notifierService?.messageObservable.subscribe((message) => {
        this.status = message;
        this.cdr.markForCheck();

        clearTimeout(this.clearTimer);
        this.clearTimer = setTimeout(() => {
          this.status = '';
          this.cdr.markForCheck();
        }, 1000);
      });
    }
  }

  ngOnDestroy(): void {
    this.notifierSubscription?.unsubscribe();
    clearTimeout(this.clearTimer);
  }
}
