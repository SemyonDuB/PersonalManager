import {NgModule, Optional, SkipSelf} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {EmployeeTableService} from "./services/employee-table.service";
import {HttpClientModule} from "@angular/common/http";
import { RegistrationComponent } from './components/registration/registration.component';
import {LoginComponent} from "./components/login/login.component";

@NgModule({
    imports: [
        SharedModule,
        HttpClientModule
    ],
    providers: [
        EmployeeTableService
    ],
    exports: [
        RegistrationComponent,
        LoginComponent
    ],
    declarations: [
        RegistrationComponent,
        LoginComponent
    ]
})
export class CoreModule {
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error(
                'CoreModule is already loaded. Import it in the AppModule only.');
        }
    }
}
