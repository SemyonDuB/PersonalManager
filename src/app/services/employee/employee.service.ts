import {Injectable} from '@angular/core';
import {Career, Employee} from './employee';
import employeesJson from './employees.json';
import {TuiComparator} from "@taiga-ui/addon-table";
import {tuiDefaultSort} from "@taiga-ui/cdk";
import {BehaviorSubject, Observable, of} from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class EmployeeService {
    public sorter$: BehaviorSubject<keyof Employee | null> = new BehaviorSubject<keyof Employee | null>(null);
    public direction$: BehaviorSubject<1 | -1> = new BehaviorSubject<1 | -1>(1);
    public filterBy$: BehaviorSubject<Partial<Employee> | null> = new BehaviorSubject<Partial<Employee> | null>(null);

    constructor() {
    }

    public getData(filterBy: Partial<Employee> | null,
                   sorterKey: keyof Employee | null,
                   direction: 1 | -1): Observable<Employee[]> {
        let result: Employee[] = [];

        for (const e of employeesJson) {
            const career: Career[] = e.career.map(({date, name}: { date: string, name: string }) => <Career>{
                date: new Date(date),
                name: name
            });

            const holidays: Date[] = e.holidayHistory.map((value: string) => new Date(value));

            result.push({
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

        if (sorterKey !== null) {
            result = result.sort(this.sortBy(sorterKey!, direction));
        }

        if (filterBy !== null) {
            result = result.filter((employee: Employee) =>
                Object.keys(filterBy)
                    .filter((key: string) => !!filterBy[key as keyof Employee])
                    .every((key: string) => {
                        const employeeValue: string = employee[key as keyof Employee].toString();
                        const filterValue: string = filterBy[key as keyof Employee]!.toString();

                        return employeeValue.toLowerCase().includes(filterValue.toLowerCase());
                    })
            );
        }

        return of(result);
    }

    public sortBy(key: keyof Employee, direction: 1 | -1): TuiComparator<Employee> {
        return (a: Employee, b: Employee) => direction * tuiDefaultSort(a[key], b[key]);
    }
}
