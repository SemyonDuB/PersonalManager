import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthComponent} from "./auth/auth.component";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        LoginComponent,
        RegistrationComponent,
        AuthComponent
    ],
    exports: [
        RegistrationComponent
    ]
})
export class AuthorizationModule{
}
