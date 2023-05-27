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
import {AccountButtonComponent} from "./components/account-button/account-button.component";
import {MenuBarComponent} from "./components/menu-bar/menu-bar.component";
import {RouterLink} from "@angular/router";
import {CommonModule} from "@angular/common";
import {ComponentHostDirective} from "./directives/component-host.directive";

const modules: TuiRootModule[] = [
    CommonModule,
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
        modules,
        RouterLink
    ],
    exports: [
        modules,
        AccountButtonComponent,
        MenuBarComponent,
        ComponentHostDirective
    ],
    declarations: [
        AccountButtonComponent,
        MenuBarComponent,
        ComponentHostDirective
    ]
})
export class SharedModule {
}
