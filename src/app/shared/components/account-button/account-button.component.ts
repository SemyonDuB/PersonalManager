import {Component, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'account-button',
    templateUrl: './account-button.component.html',
    styleUrls: ['./account-button.css']
})
export class AccountButtonComponent{

    public isAuthorized: boolean;

    constructor(private _route: ActivatedRoute, private _router: Router) {
        this.isAuthorized = !!window.localStorage["jwt"];
    }

    public navigateToAuth(): void {
        this._router.navigate(['auth'], {relativeTo: this._route}).then();
    }
}
