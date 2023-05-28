import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CabinetModalService {

    public isModalOpen$: Subject<boolean> = new Subject<boolean>();

    public changeModalOpening(isOpening: boolean): void {
        this.isModalOpen$.next(isOpening);
    }
}
