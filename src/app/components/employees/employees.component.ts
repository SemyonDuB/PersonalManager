import {Component} from '@angular/core';
import {EmployeeService} from "../../services/employee/employee.service";
import {Employee} from "../../services/employee/employee";

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

    employees: Employee[] = [];

    constructor(private employeeService: EmployeeService) {
        this.employees = employeeService.employees;
    }
}
