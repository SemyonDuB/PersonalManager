import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { EmployeeEditorComponent } from './employee-editor/employee-editor.component';
import { RouterOutlet } from '@angular/router';
import {EditorFooterComponent} from "./editor-footer/editor-footer.component";

@NgModule({
    imports: [
        SharedModule,
        RouterOutlet
    ],
    declarations: [
        EmployeeEditorComponent,
        EditorFooterComponent
    ]
})
export class EmployeeEditorModule {
}
