import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthComponent} from "./auth/auth.component";
import {AuthDirective} from "./auth/auth.directive";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        LoginComponent,
        RegistrationComponent,
        AuthComponent,
        AuthDirective
    ],
    exports: [
        RegistrationComponent
    ]
})
export class AuthorizationModule{
}
