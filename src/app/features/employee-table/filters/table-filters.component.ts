import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {EmployeeTableService} from "../../../core/services/employee-table.service";
import {EmployeeModel} from "../../../core/models/employee.model";

@Component({
    selector: 'employee-table-filters',
    templateUrl: './table-filters.component.html',
    styleUrls: ['./table-filters.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TableFiltersComponent {

    public readonly filterForm: FormGroup = new FormGroup({
        fullName: new FormControl(null),
        jobTitle: new FormControl(null),
        projectName: new FormControl(null),
        wage: new FormControl(null),
        success: new FormControl(null),
        date: new FormControl<Date | null>(null),
        employmentDate: new FormControl<Date | null>(null),
    });

    constructor(private _employeeService: EmployeeTableService) {

    }

    public applyFilters(): void {
        this._employeeService.filterBy$.next(this.filterForm.value as Partial<EmployeeModel>);
    }
}








