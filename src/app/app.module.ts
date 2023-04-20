import {NgDompurifySanitizer} from "@tinkoff/ng-dompurify";
import {
    TUI_SANITIZER,
    TuiAlertModule,
    TuiDialogModule, TuiFormatDatePipeModule,
    TuiRootModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrowserModule} from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
import {TuiCheckboxModule, TuiInputDateModule, TuiInputModule} from "@taiga-ui/kit";
import {TuiTableModule} from '@taiga-ui/addon-table';

import {AppComponent} from './components/app/app.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {EmployeeComponent} from "./components/employee/employee.component";
import {MenuBarComponent} from "./components/menu-bar/menu-bar.component";
import {EmployeesComponent} from "./components/employees/employees.component";

const components = [
    AppComponent,
    PageNotFoundComponent,
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
        path: '**',
        pathMatch: 'full',
        component: PageNotFoundComponent
    },
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
        TuiTextfieldControllerModule,
        TuiInputDateModule,
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
