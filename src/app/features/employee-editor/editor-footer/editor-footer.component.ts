import {Component, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { IEmployeeModel } from "../../../core/models/employee.model";
import { EmployeeTableService } from "../../../core/services/employee-table.service";

@Component({
    selector: 'employee-editor-footer',
    templateUrl: './editor-footer.component.html',
    styleUrls: ['./editor-footer.css']
})
export class EditorFooterComponent {

    @Output() public saveClick: EventEmitter<undefined> = new EventEmitter<undefined>();

    constructor(private readonly _router: Router) {
    }

    public returnToTable(): void {
        this._router.navigateByUrl('').then();
    }

    public saveEmployeeChanges(): void {
        this.saveClick.emit(undefined);
    }
}
