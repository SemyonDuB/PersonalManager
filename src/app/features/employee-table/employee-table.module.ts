import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { EmployeeTableComponent } from './employee-table/employee-table.component';
import { TableFiltersComponent } from './filters/table-filters.component';
import { AuthorizationModule } from '../authorization/authorization.module';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        RouterModule,
        SharedModule,
        AuthorizationModule,
        FormsModule
    ],
    declarations: [
        EmployeeTableComponent,
        TableFiltersComponent
    ],
    exports: [
        EmployeeTableComponent
    ]
})
export class EmployeeTableModule{
}
