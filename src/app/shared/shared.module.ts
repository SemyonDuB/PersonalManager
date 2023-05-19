import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {
    TuiAlertModule,
    TuiDialogModule,
    TuiErrorModule, TuiFormatDatePipeModule,
    TuiRootModule,
    TuiTextfieldControllerModule
} from "@taiga-ui/core";
import {
    TuiCheckboxModule,
    TuiComboBoxModule,
    TuiDataListWrapperModule,
    TuiFieldErrorPipeModule, TuiFilterByInputPipeModule,
    TuiInputDateModule,
    TuiInputModule
} from "@taiga-ui/kit";
import {TuiTableModule} from "@taiga-ui/addon-table";
import {TuiLetModule} from "@taiga-ui/cdk";
import {DeclensionPipe} from "./pipes/declension.pipe";
import {AccountButtonComponent} from "./components/account-button/account-button.component";

// eslint-disable-next-line @typescript-eslint/typedef
const modules = [
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
];

@NgModule({
    imports: [
        modules
    ],
    exports: [
        modules,
        AccountButtonComponent,
        DeclensionPipe
    ],
    declarations: [
        DeclensionPipe,
        AccountButtonComponent

    ]
})
export class SharedModule {
}
