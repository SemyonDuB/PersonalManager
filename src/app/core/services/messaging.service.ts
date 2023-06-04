import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class MessagingService {

    public newMessage$: Subject<string> = new Subject<string>();
    public message: string = '';

    public sendModalMessage(message: string): void {
        this.newMessage$.next(message);
        this.message = message;
    }
}
