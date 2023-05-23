import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {EmployeeEditorComponent} from "./employee-editor/employee-editor.component";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        EmployeeEditorComponent,
    ]
})
export class EmployeeEditorModule {
}
