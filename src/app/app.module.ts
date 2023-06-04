import { NgDompurifySanitizer } from '@tinkoff/ng-dompurify';
import {ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TUI_SANITIZER } from '@taiga-ui/core';

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { EmployeeEditorModule } from './features/employee-editor/employee-editor.module';
import { EmployeeTableModule } from './features/employee-table/employee-table.module';
import { AuthorizationModule } from './features/authorization/authorization.module';
import {GlobalErrorHandler} from "./global-error-handler";

@NgModule({
    imports: [
        BrowserModule,
        SharedModule,
        CoreModule,
        AppRoutingModule,
        EmployeeEditorModule,
        EmployeeTableModule,
        AuthorizationModule
    ],
    declarations: [
        AppComponent,
        PageNotFoundComponent,
    ],
    providers: [
        {provide: TUI_SANITIZER, useClass: NgDompurifySanitizer},
        {provide: ErrorHandler, useClass: GlobalErrorHandler}
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {
}
