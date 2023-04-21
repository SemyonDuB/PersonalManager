import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import {
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    TUI_SANITIZER,
    TuiErrorModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import {FiltersComponent} from "./components/filters/filters.component";
import {ReactiveFormsModule} from "@angular/forms";
import {
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiFieldErrorPipeModule, TuiFilterByInputPipeModule,
    TuiInputDateModule,
    TuiInputModule
} from "@taiga-ui/kit";

const components = [
    AppComponent,
    PageNotFoundComponent,
    FiltersComponent
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
    ],
    declarations: components,
    providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
