import {Component} from '@angular/core';
import {EmployeeService} from "../../services/employee/employee.service";
import {Employee} from "../../services/employee/employee";
import { Router } from '@angular/router';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css']
})
export class EmployeesComponent {
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

    employees: Employee[] = [];

    constructor(
        private _router: Router,
        private employeeService: EmployeeService
        ) {
        this.employees = employeeService.employees;
    }

    public navigateToDetailInfo(): void {
        this._router.navigateByUrl('/employee')
    }
}
