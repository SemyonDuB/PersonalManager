import {ChangeDetectionStrategy, Component} from '@angular/core';
import {EmployeeTableService} from "../../services/employee/employee-table.service";
import {Employee} from "../../services/employee/employee";
import {Router} from '@angular/router';
import {combineLatest, filter, map, Observable, switchMap} from "rxjs";
import {tuiIsPresent} from "@taiga-ui/cdk";

type DataInput = [(Partial<Employee> | null), (keyof Employee | null), (1 | -1)];

@Component({
    selector: 'app-employee-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './employee-table.component.html',
    styleUrls: ['./employee-table.component.css'],
})
export class EmployeeTableComponent {
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
        public employeeService: EmployeeTableService
    ) {
    }

    /**
     * Навигация на страницу детальной инфы
     */
    public navigateToDetailInfo(): void {
        this._router.navigateByUrl('/employee');
    }

}
