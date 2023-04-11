import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './components/app/app.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const components = [
    AppComponent,
    PageNotFoundComponent
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
        path: '**',
        pathMatch: 'full',
        component: PageNotFoundComponent
    }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        BrowserModule
    ],
    declarations: components,
    providers: [],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
