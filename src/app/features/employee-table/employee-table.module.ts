import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {EmployeeTableComponent} from "./employee-table/employee-table.component";
import {TableFiltersComponent} from "./filters/table-filters.component";

@NgModule({
    imports: [
        SharedModule,
    ],
    declarations: [
        EmployeeTableComponent,
        TableFiltersComponent
    ]
})
export class EmployeeTableModule{
}
