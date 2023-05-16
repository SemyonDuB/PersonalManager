import { NgModule } from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {EditorMenuComponent} from "./editor-menu/editor-menu.component";
import {EmployeeEditorComponent} from "./employee-editor/employee-editor.component";

@NgModule({
    imports: [
        SharedModule
    ],
    declarations: [
        EmployeeEditorComponent,
        EditorMenuComponent
    ]
})
export class EmployeeEditorModule {
}
