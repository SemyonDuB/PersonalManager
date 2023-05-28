import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class AuthModalService {

    public isLogInType$: Subject<undefined> = new Subject<undefined>();
    public isModalOpening$: Subject<boolean> = new Subject<boolean>();

    public toggleAuthType(): void {
        this.isLogInType$.next(undefined);
    }

    public changeModalOpening(isOpen: boolean): void {
        this.isModalOpening$.next(isOpen);
    }
}
