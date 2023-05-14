import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TUI_SANITIZER } from "@taiga-ui/core";


import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './features/page-not-found/page-not-found.component';
import {EmployeeEditorComponent} from "./features/employee-editor/employee-editor.component";
import {EmployeeTableComponent} from "./features/employee-table/employee-table.component";
import {FiltersComponent} from "./features/filters/filters.component";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {AppRoutingModule} from "./app-routing.module";

const components = [
    AppComponent,
    PageNotFoundComponent,
    FiltersComponent,
    EmployeeEditorComponent,
    EmployeeTableComponent
];

@NgModule({
    imports: [
        BrowserModule,
        SharedModule,
        CoreModule,
        AppRoutingModule
    ],
    declarations: components,
    providers: [
        {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
