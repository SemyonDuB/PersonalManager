import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule} from "@angular/forms";


import {
    TUI_SANITIZER,
    TuiAlertModule,
    TuiDialogModule,
    TuiErrorModule,
    TuiFormatDatePipeModule,
    TuiRootModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";

import {TuiCheckboxModule, TuiInputDateModule, TuiInputModule} from "@taiga-ui/kit";
import {TuiTableModule} from '@taiga-ui/addon-table';

import {AppComponent} from './components/app/app.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {EmployeeComponent} from "./components/employee/employee.component";
import {MenuBarComponent} from "./components/menu-bar/menu-bar.component";
import {EmployeesComponent} from "./components/employees/employees.component";
import {FiltersComponent} from "./components/filters/filters.component";
import {
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiFieldErrorPipeModule, TuiFilterByInputPipeModule,
} from "@taiga-ui/kit";
import {TuiLetModule} from "@taiga-ui/cdk";

const components = [
    AppComponent,
    PageNotFoundComponent,
    FiltersComponent,
    EmployeeComponent,
    MenuBarComponent,
    EmployeesComponent
];

const routes: Routes = [
    {
        path: '',
        redirectTo: '/employees',
        pathMatch: 'full',
    },
    {
        /** Таблица юзеров */
        path: 'employees',
        pathMatch: 'full',
        component: EmployeesComponent
    },

    {
        /** Таблица детальной инфы о юзере */
        path: 'employee',
        pathMatch: 'full',
        component: EmployeeComponent
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
        RouterModule.forRoot(routes),
        BrowserModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        TuiRootModule,
        TuiDialogModule,
        TuiAlertModule,
        TuiInputModule,
        TuiInputDateModule,
        TuiErrorModule,
        TuiTextfieldControllerModule,
        TuiFieldErrorPipeModule,
        TuiComboBoxModule,
        TuiDataListWrapperModule,
        TuiFilterByInputPipeModule,
        TuiCheckboxModule,
        TuiTableModule,
        TuiFormatDatePipeModule,
        TuiLetModule
    ],
    declarations: components,
    providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
