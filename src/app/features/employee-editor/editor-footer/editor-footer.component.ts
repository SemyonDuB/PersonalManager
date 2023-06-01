import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployeeModel } from "../../../core/models/employee.model";
import { EmployeeTableService } from "../../../core/services/employee-table.service";

@Component({
    selector: 'employee-editor-footer',
    templateUrl: './editor-footer.component.html',
    styleUrls: ['./editor-footer.css']
})
export class EditorFooterComponent {

    @Input() public employee: IEmployeeModel | null = null;

    constructor(private readonly _router: Router, private _employeeTableService: EmployeeTableService) {
    }

    public returnToTable(): void {
        this._router.navigateByUrl('').then();
    }

    public saveEmployee(): void {
        if (this.employee) {
            this._employeeTableService.updateEmployee(this.employee);
        }

        this._router.navigateByUrl('').then();
    }
}
