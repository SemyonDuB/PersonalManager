import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {EmployeeTableService} from "../../../core/services/employee-table.service";
import {EmployeeModel} from "../../../core/models/employee.model";
import {Router} from '@angular/router';
import {combineLatest, filter, map, Observable, switchMap} from "rxjs";
import {tuiIsPresent} from "@taiga-ui/cdk";
import {AuthModalService} from "../../../core/services/auth-modal.service";

type DataInput = [(Partial<EmployeeModel> | null), (keyof EmployeeModel | null), (1 | -1)];

@Component({
    selector: 'app-employee-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './employee-table.component.html',
    styleUrls: ['./employee-table.css'],
})
export class EmployeeTableComponent implements OnInit{

    public isOpenFilters: boolean = false;
    public isOpenModal!: boolean;

    public readonly columns: string[] = [
        "fullName",
        "birthday",
        "jobTitle",
        "wage",
        "employmentDate",
        "projectName",
        "success",
    ];

    public request$: Observable<EmployeeModel[]> = combineLatest([
        this.employeeService.filterBy$,
        this.employeeService.sorter$,
        this.employeeService.direction$
    ]).pipe(
        switchMap((query: DataInput) =>
            this.employeeService.getData(...query))
    );

    public readonly data$: Observable<readonly EmployeeModel[]> = this.request$.pipe(
        filter(tuiIsPresent),
        map((employees: EmployeeModel[]) => employees.filter(tuiIsPresent)),
    );

    constructor(
        public authModalService: AuthModalService,
        public employeeService: EmployeeTableService,
        private _router: Router,
        public changeRef: ChangeDetectorRef
    ) {
    }

    public ngOnInit(): void {
        const context: EmployeeTableComponent = this;
        this.authModalService.isModalOpening$.subscribe(function(isModalOpening: boolean): void {
            context.isOpenModal = isModalOpening;
            context.changeRef.markForCheck();
        });
    }

    public toggleOpeningFilters(): void {
        this.isOpenFilters = !this.isOpenFilters;
    }

    /**
     * Навигация на страницу детальной инфы
     */
    public navigateToDetailInfo(): void {
        this._router.navigateByUrl('/employee-editor').then();
    }

}
