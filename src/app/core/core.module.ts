import {NgModule, Optional, SkipSelf} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {MenuBarComponent} from "./components/menu-bar/menu-bar.component";
import {EmployeeTableService} from "./services/employee-table.service";

@NgModule({
    imports: [
        SharedModule,
    ],
    exports: [
        MenuBarComponent,
    ],
    declarations: [
        MenuBarComponent,
    ],
    providers: [
        EmployeeTableService
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
