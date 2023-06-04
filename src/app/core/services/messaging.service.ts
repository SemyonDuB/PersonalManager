import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessagingService {

    public openingMessage$: Subject<boolean> = new Subject<boolean>();
    public message: string = '';
    public timeOut: number = 0;

    public sendModalMessage(message: string, timeOut: number): void {
        this.message = message;
        this.timeOut = timeOut;
        this.changeMessageOpening(true);
    }

    public changeMessageOpening(isOpen: boolean): void {
        this.openingMessage$.next(isOpen);
    }
}
