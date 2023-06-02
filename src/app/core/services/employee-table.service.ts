import { Injectable } from '@angular/core';
import { IEmployeeModel } from '../models/employee.model';
import employeesJson from '../../../assets/employees.json';
import { TuiComparator } from '@taiga-ui/addon-table';
import { TuiDay, tuiDefaultSort } from '@taiga-ui/cdk';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { ICareer } from '../models/career.model';
import { IHolidays } from '../models/holidays.model';

@Injectable({
    providedIn: 'root'
})
export class EmployeeTableService {
    public sorter$: BehaviorSubject<keyof IEmployeeModel | null> = new BehaviorSubject<keyof IEmployeeModel | null>(null);
    public direction$: BehaviorSubject<1 | -1> = new BehaviorSubject<1 | -1>(1);
    public filterBy$: BehaviorSubject<Partial<IEmployeeModel> | null> = new BehaviorSubject<Partial<IEmployeeModel> | null>(null);

    public deleteEmployees$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

    private _employees: IEmployeeModel[] = this.parseEmployeesJson();

    public getData(filterBy: Partial<IEmployeeModel> | null,
                   sorterKey: keyof IEmployeeModel | null,
                   direction: 1 | -1): Observable<IEmployeeModel[]> {
        let result: IEmployeeModel[] = this.employees;

        if (sorterKey !== null) {
            result = result.sort(this.sortBy(sorterKey!, direction));
        }

        if (filterBy !== null) {
            result = result.filter((employee: IEmployeeModel) =>
                Object.keys(filterBy)
                    .filter((key: string) => !!filterBy[key as keyof IEmployeeModel])
                    .every((key: string) => {
                        const employeeValue: string = employee[key as keyof IEmployeeModel]!.toString();
                        const filterValue: string = filterBy[key as keyof IEmployeeModel]!.toString();

                        return employeeValue.toLowerCase().includes(filterValue.toLowerCase());
                    })
            );
        }

        return of(result);
    }

    public dateStringConvertToTuiDay(dateString: string): TuiDay {
        const date: Date = new Date(dateString);

        return new TuiDay(date.getFullYear(), date.getMonth(), date.getDate());
    }

    public get employees(): IEmployeeModel[] {
        return this._employees;
    }

    public getEmployee(id: number): IEmployeeModel | undefined {
        return this.employees.find((employee: IEmployeeModel) => employee.id === id);
    }

    public sortBy(key: keyof IEmployeeModel, direction: 1 | -1): TuiComparator<IEmployeeModel> {
        return (a: IEmployeeModel, b: IEmployeeModel) => direction * tuiDefaultSort(a[key], b[key]);
    }

    public addEmployee(employee: IEmployeeModel): IEmployeeModel {
        employee.id = 1 + Math.max(...this.employees.map((e: IEmployeeModel) => e.id));
        this._employees.push(employee);

        return employee;
    }

    public updateEmployee(employee: IEmployeeModel): IEmployeeModel | undefined {
        const index: number = this._employees.findIndex((e: IEmployeeModel) => e.id === employee.id);

        if (index === -1) {
            return undefined;
        }

        this._employees[index] = employee;

        return employee;
    }

    public deleteEmployees(ids: number[]): void {
        this._employees = this._employees.filter((employee: IEmployeeModel) => !(ids.includes(employee.id)));
        this.deleteEmployees$.next();
    }

    private parseEmployeesJson(): IEmployeeModel[] {
        const result: IEmployeeModel[] = [];

        for (const e of employeesJson) {
            const career: ICareer[] = e.career.map(({date, name}: { date: string, name: string }) => <ICareer>{
                date: this.dateStringConvertToTuiDay(date),
                name: name
            });

            const holidays: IHolidays[] = e.holidayHistory.map(
                ({startDate, endDate}: {startDate: string, endDate: string}) => <IHolidays>{
                    startDate: this.dateStringConvertToTuiDay(startDate),
                    endDate: this.dateStringConvertToTuiDay(endDate)
                }
            );

            result.push({
                id: e.id,
                fullName: e.fullName,
                birthday: this.dateStringConvertToTuiDay(e.birthday),
                career: career,
                education: e.education,
                employmentDate: this.dateStringConvertToTuiDay(e.employmentDate),
                firstWorkDay: this.dateStringConvertToTuiDay(e.firstWorkDay),
                holidayHistory: holidays,
                interviewDate: this.dateStringConvertToTuiDay(e.interviewDate),
                jobTitle: e.jobTitle,
                projectName: e.projectName,
                success: e.success,
                wage: e.wage,

                checked: false
            });
        }

        return result;
    }
}
