import {Injectable} from '@angular/core';
import {Career, Employee} from './employee';
import employeesJson from './employees.json';

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    private _employees: Employee[] = [];
    public employees: Employee[] = [];

    constructor() {
        for (let e of employeesJson) {
            let career = e.career.map((value) => <Career>{
                date: new Date(value.date),
                name: value.name
            })

            let holidays = e.holidayHistory.map((value) => new Date(value))

            this._employees.push({
                fullName: e.fullName,
                birthday: new Date(e.birthday),
                career: career,
                education: e.education,
                employmentDate: new Date(e.employmentDate),
                firstWorkDay: new Date(e.firstWorkDay),
                holidayHistory: holidays,
                interviewDate: new Date(e.interviewDate),
                jobTitle: e.jobTitle,
                projectName: e.projectName,
                success: e.success,
                wage: e.wage,
            });
        }

        this.employees = this._employees;
    }

    updateEmployees() {
        this.employees = this._employees;
    }
}
