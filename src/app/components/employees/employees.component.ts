import {ChangeDetectionStrategy, Component} from '@angular/core';
import {EmployeeService} from "../../services/employee/employee.service";
import {Employee} from "../../services/employee/employee";
import {Router} from '@angular/router';
import {combineLatest, filter, map, Observable, switchMap} from "rxjs";
import {tuiIsPresent} from "@taiga-ui/cdk";

type DataInput = [(Partial<Employee> | null), (keyof Employee | null), (1 | -1)];

@Component({
    selector: 'app-employees',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.css'],
})
export class EmployeesComponent {
    public readonly columns: string[] = [
        "fullName",
        "birthday",
        "jobTitle",
        "wage",
        "employmentDate",
        "projectName",
        "success",
    ];

    public showFilter: boolean = false;


    public request$: Observable<Employee[]> = combineLatest([
        this.employeeService.filterBy$,
        this.employeeService.sorter$,
        this.employeeService.direction$
    ]).pipe(
        switchMap((query: DataInput) =>
            this.employeeService.getData(...query))
    );

    public readonly data$: Observable<readonly Employee[]> = this.request$.pipe(
        filter(tuiIsPresent),
        map((employees: Employee[]) => employees.filter(tuiIsPresent)),
    );

    constructor(
        private _router: Router,
        public employeeService: EmployeeService
    ) {
    }

    /**
     * Навигация на страницу детальной инфы
     */
    public navigateToDetailInfo(): void {
        this._router.navigateByUrl('/employee');
    }

}
