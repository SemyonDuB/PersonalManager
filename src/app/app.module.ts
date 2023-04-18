import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TuiTextfieldControllerModule, TUI_SANITIZER } from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
import {TuiInputDateModule, TuiInputModule} from "@taiga-ui/kit";

import { AppComponent } from './components/app/app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { EmployeeComponent } from "./components/employee/employee.component";

const components = [
    AppComponent,
    PageNotFoundComponent,
    EmployeeComponent
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
        TuiTextfieldControllerModule,
        TuiInputDateModule
    ],
    declarations: components,
    providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
