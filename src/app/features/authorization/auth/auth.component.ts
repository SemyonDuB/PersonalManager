import {
    Component, OnDestroy,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {RegistrationComponent} from "../registration/registration.component";
import {AuthDirective} from "./auth.directive";
import {AuthModalService} from "../../../core/services/auth-modal.service";

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.css']
})
export class AuthComponent implements OnInit {

    @ViewChild(AuthDirective, {static: true}) public authHost!: AuthDirective;

    public isRenderedLogIn: boolean = false;
    constructor(private readonly _authModalService: AuthModalService) {
    }

    public loadAuthComponent(): void {
        const containerRef: ViewContainerRef = this.authHost.viewContainerRef;
        containerRef.clear();
        if (this.isRenderedLogIn) {
            containerRef.createComponent<RegistrationComponent>(RegistrationComponent);
        } else {
            containerRef.createComponent<LoginComponent>(LoginComponent);
        }
    }

    public ngOnInit(): void {
        this._authModalService.isLogInType$.subscribe((): void => {
            this.isRenderedLogIn = !this.isRenderedLogIn;
            this.loadAuthComponent();
        });
        this.loadAuthComponent();
    }
}
