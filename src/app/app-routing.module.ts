import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {PageNotFoundComponent} from "./features/page-not-found/page-not-found.component";
import {FiltersComponent} from "./features/filters/filters.component";
import {EmployeeEditorComponent} from "./features/employee-editor/employee-editor.component";
import {EmployeeTableComponent} from "./features/employee-table/employee-table.component";

const routes: Routes = [
    {
        path: '',
        redirectTo: '/employee-table',
        pathMatch: 'full',
    },
    {
        /** Таблица работников */
        path: 'employee-table',
        pathMatch: 'full',
        component: EmployeeTableComponent
    },

    {
        /** Редактирование работника */
        path: 'employee-editor',
        pathMatch: 'full',
        component: EmployeeEditorComponent
    },
    {
        path: 'filters',
        pathMatch: 'full',
        component:FiltersComponent
    },
    {
        path: '**',
        pathMatch: 'full',
        component: PageNotFoundComponent
    }

];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule{
}
