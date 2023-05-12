import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {EmployeeService} from "../../services/employee/employee.service";
import {Employee} from "../../services/employee/employee";

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./styles/filters.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FiltersComponent {

    constructor(private employeeService: EmployeeService) {

    }

    readonly filterForm = new FormGroup({
        fullName: new FormControl(null),
        jobTitle: new FormControl(null),
        projectName: new FormControl(null),
        wage: new FormControl(null),
        success: new FormControl(null),
        date: new FormControl<Date | null>(null),
        employmentDate: new FormControl<Date | null>(null),
    });

    public applyFilters(): void {
        this.employeeService.filterBy$.next(this.filterForm.value as Partial<Employee>);
    }
}









