import {ChangeDetectionStrategy, Component, Input, OnChanges} from '@angular/core';
import {EmployeeService} from "../../services/employee/employee.service";
import {Employee} from "../../services/employee/employee";
import {Router} from '@angular/router';

@Component({
    selector: 'app-employees',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnChanges {
    readonly columns = [
        "fullName",
        "birthday",
        "jobTitle",
        "wage",
        "employmentDate",
        "projectName",
        "success",
    ];

    public showFilter: boolean = false;

    @Input() employees: Employee[] = [];

    constructor(
        private _router: Router,
        private employeeService: EmployeeService
    ) {
     this.employees = employeeService.employees;
    }

    ngOnChanges() {
        this.employeeService.employees
    }
    /**
     * Навигация на страницу детальной инфы
     */
    public navigateToDetailInfo(): void {
        this._router.navigateByUrl('/employee')
    }

}
