import {Injectable} from '@angular/core';
import {Career, EmployeeModel} from '../models/employee.model';
import employeesJson from '../../../assets/employees.json';
import {TuiComparator} from "@taiga-ui/addon-table";
import {tuiDefaultSort} from "@taiga-ui/cdk";
import {BehaviorSubject, Observable, of} from "rxjs";
import {EmployeeTableComponent} from "../../features/employee-table/employee-table.component";

@Injectable({
    providedIn: 'root'
})
export class EmployeeTableService {
    public sorter$: BehaviorSubject<keyof EmployeeModel | null> = new BehaviorSubject<keyof EmployeeModel | null>(null);
    public direction$: BehaviorSubject<1 | -1> = new BehaviorSubject<1 | -1>(1);
    public filterBy$: BehaviorSubject<Partial<EmployeeModel> | null> = new BehaviorSubject<Partial<EmployeeModel> | null>(null);

    constructor() {
    }

    public getData(filterBy: Partial<EmployeeModel> | null,
                   sorterKey: keyof EmployeeModel | null,
                   direction: 1 | -1): Observable<EmployeeModel[]> {
        let result: EmployeeModel[] = [];

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
            result = result.filter((employee: EmployeeModel) =>
                Object.keys(filterBy)
                    .filter((key: string) => !!filterBy[key as keyof EmployeeModel])
                    .every((key: string) => {
                        const employeeValue: string = employee[key as keyof EmployeeModel].toString();
                        const filterValue: string = filterBy[key as keyof EmployeeModel]!.toString();

                        return employeeValue.toLowerCase().includes(filterValue.toLowerCase());
                    })
            );
        }

        return of(result);
    }

    public sortBy(key: keyof EmployeeModel, direction: 1 | -1): TuiComparator<EmployeeModel> {
        return (a: EmployeeModel, b: EmployeeModel) => direction * tuiDefaultSort(a[key], b[key]);
    }
}
