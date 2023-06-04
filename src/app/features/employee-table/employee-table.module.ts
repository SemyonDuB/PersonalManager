import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {EmployeeTableComponent} from "./employee-table/employee-table.component";
import {TableMenuComponent} from "./table-menu/table-menu.component";
import {TableFiltersComponent} from "./filters/table-filters.component";

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        EmployeeTableComponent,
        TableMenuComponent,
        TableFiltersComponent
    ]
})
export class EmployeeTableModule{
}
