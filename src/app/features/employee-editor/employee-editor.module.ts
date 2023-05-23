import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {EmployeeEditorComponent} from "./employee-editor/employee-editor.component";
import {RouterOutlet} from "@angular/router";

@NgModule({
    imports: [
        SharedModule,
        RouterOutlet
    ],
    declarations: [
        EmployeeEditorComponent,
    ]
})
export class EmployeeEditorModule {
}
