import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthModalService {

    public isLogInType$: Subject<undefined> = new Subject<undefined>();

    public toggleAuthType(): void {
        this.isLogInType$.next(undefined);
    }
}
