import {
    ActivatedRoute,
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot
} from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private readonly _router: Router, private readonly _route: ActivatedRoute) {
    }

    public canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): boolean {

        if (window.localStorage.getItem("jwt")) {
            return true;
        }
        this._router.navigateByUrl('employee-table/auth').then();

        return true;
    }
}
