import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule} from "@angular/forms";


import {
    TUI_SANITIZER,
    TuiAlertModule,
    TuiDialogModule, TuiFormatDatePipeModule,
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
        redirectTo: '/login',
        pathMatch: 'full',
    },
    {
        /** TODO Модуль неавторизованной зоны (находимся до авторизации)*/
        path: 'login',
        pathMatch: 'full',
        component: AppComponent
        // loadChildren: () => import('./children/account/account.web.routing-module')
        //     .then((m: any) => m.AccountWebRoutingModule)
    },
    {
        /** TODO Модуль авторизованной зоны (попадаем после авторизации) */
        path: 'cabinet',
        component: AppComponent
        // canActivate: [AuthorizationGuardService],
        // loadChildren: () => import('./children/cabinet/cabinet.web.routing-module')
        //     .then((m: any) => m.CabinetWebRoutingModule),
    },
    /** TODO переместить в анторизированную зону*/
    {
        path: 'employee',
        pathMatch: 'full',
        component: EmployeeComponent
    },
    {
        path: 'employees',
        pathMatch: 'full',
        component: EmployeesComponent
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
        TuiFilterByInputPipeModule
        TuiCheckboxModule,
        TuiTableModule,
        TuiFormatDatePipeModule
    ],
    declarations: components,
    providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
