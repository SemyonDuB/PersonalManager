import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { CabinetModalService } from '../../../core/services/cabinet-modal.service';
import { fromEvent, Observable, Subscription } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'app-cabinet',
    templateUrl: './cabinet.component.html',
    styleUrls: ['./cabinet.css'],
    animations: [
        trigger('openClose', [
            state('open', style({
                opacity: 1
            })),
            state('closed', style({
                opacity: 0
            })),
            transition('open => closed', [
                animate('0.15s')
            ]),
            transition('closed => open', [
                animate('0.15s')
            ])
        ])
    ]
})
export class CabinetComponent implements OnInit {

    public userName: string;
    public isOpen: boolean = false;

    private _documentClick$: Observable<Event> = fromEvent(document, 'click');
    private _documentKeyDown$: Observable<Event> = fromEvent(document, 'keydown');
    private _subscriptions: Subscription[] = [];

    constructor(private readonly _cabinetModalService: CabinetModalService, private _changeRef: ChangeDetectorRef) {
        this.userName = window.localStorage['name'];
    }

    public ngOnInit(): void {
        const context: CabinetComponent = this;
        setTimeout(function(): void {
            context.clickOutsideSubscribe(context);
            context.keyDownSubscribe(context);
            context.isOpen = true;
            context._changeRef.markForCheck();
        }, 100);
    }

    public exitFromAccount(): void {
        window.localStorage.clear();
        this.closeAccountModal();
    }

    public clickOutsideSubscribe(context: CabinetComponent): void {
        const clickSubscription: Subscription =
            context._documentClick$.subscribe((evt: Event): void => {
                const cabinetRef: Element = document.querySelector('.cabinet')!;
                if (!evt.composedPath().includes(cabinetRef!)) {
                    context.closeAccountModal();
                }
            });
        context._subscriptions.push(clickSubscription);
    }

    public keyDownSubscribe(context: CabinetComponent): void {
        const keyDownSubscription: Subscription =
            context._documentKeyDown$.subscribe((evt: Event): void => {
                    if ((evt as KeyboardEvent).code === 'Escape') {
                        context.closeAccountModal();
                    }
                }
            );
        context._subscriptions.push(keyDownSubscription);
    }

    public closeAccountModal(): void {
        this.isOpen = false;
        const context: CabinetComponent = this;
        context._subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
        context._cabinetModalService.isModalOpen$.next(false);
    }
}
