import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import {ReactiveFormsModule} from "@angular/forms";
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
import {EmployeeEditorComponent} from "./components/employee-editor/employee-editor.component";
import {MenuBarComponent} from "./components/menu-bar/menu-bar.component";
import {EmployeeTableComponent} from "./components/employee-table/employee-table.component";
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
    EmployeeEditorComponent,
    MenuBarComponent,
    EmployeeTableComponent
];

const routes: Routes = [
    {
        path: '',
        redirectTo: '/employee-table',
        pathMatch: 'full',
    },
    {
        /** Таблица юзеров */
        path: 'employee-table',
        pathMatch: 'full',
        component: EmployeeTableComponent
    },

    {
        /** Таблица детальной инфы о юзере */
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
