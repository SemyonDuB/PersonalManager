import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessagingService {

    public newMessage$: Subject<string> = new Subject<string>();
    public message: string = '';
    public timeOut: number = 0;

    public sendModalMessage(message: string, timeOut: number): void {
        this.newMessage$.next(message);
        this.message = message;
        this.timeOut = timeOut;
    }
}
