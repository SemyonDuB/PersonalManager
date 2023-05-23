import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ChangeAuthTypeService {
    public type$: Subject<undefined> = new Subject<undefined>();

    public changeAuthType(): void {
        this.type$.next(undefined);
    }
}
