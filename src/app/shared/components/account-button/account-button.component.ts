import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CabinetModalService} from "../../../core/services/cabinet-modal.service";

@Component({
    selector: 'account-button',
    templateUrl: './account-button.component.html',
    styleUrls: ['./account-button.css']
})
export class AccountButtonComponent implements OnInit{

    public isAuthorized: boolean;
    public isOpenCabinet: boolean = false;

    constructor(private readonly _route: ActivatedRoute,
                private _router: Router,
                private _cabinetModalService: CabinetModalService) {
        this.isAuthorized = !!window.localStorage["jwt"];
    }

    public ngOnInit(): void {
        const context: AccountButtonComponent = this;
        this._cabinetModalService.isModalOpen$.subscribe(function (isModalOpening: boolean): void {
            context.isOpenCabinet = isModalOpening;
        });
    }

    public tryOpenCabinet(): void {
        if (!!window.localStorage['jwt'] && !this.isOpenCabinet) {
            this.isOpenCabinet = true;
            this._cabinetModalService.isModalOpen$.next(true);
        } else if (!!window.localStorage['jwt']) {
            this.isOpenCabinet = false;
            this._cabinetModalService.isModalOpen$.next(false);
        } else {
            this._router.navigate(['auth'], {relativeTo: this._route}).then();
        }
    }
}
