import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import { EmployeeTableService } from '../../../core/services/employee-table.service';
import { IEmployeeModel } from '../../../core/models/employee.model';
import { Router } from '@angular/router';
import { BehaviorSubject, combineLatest, filter, map, mergeMap, Observable, switchMap } from 'rxjs';
import { tuiIsPresent } from '@taiga-ui/cdk';
import { AuthModalService } from '../../../core/services/auth-modal.service';
import { ComponentHostDirective } from '../../../shared/directives/component-host.directive';
import { CabinetModalService } from '../../../core/services/cabinet-modal.service';
import { CabinetComponent } from '../../../shared/components/cabinet/cabinet.component';
import { FormControl } from '@angular/forms';

type DataInput = [(Partial<IEmployeeModel> | null), (keyof IEmployeeModel | null), (1 | -1)];

@Component({
    selector: 'app-employee-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './employee-table.component.html',
    styleUrls: ['./employee-table.css'],
})
export class EmployeeTableComponent implements OnInit {

    @ViewChild(ComponentHostDirective, {static: true}) public cabinetHost!: ComponentHostDirective;
    public isOpenFilters: boolean = false;
    public isOpenModal!: boolean;

    public readonly columns: string[] = [
        "checkbox",
        "fullName",
        "birthday",
        "jobTitle",
        "wage",
        "employmentDate",
        "projectName",
        "success",
    ];

    public checkedAll$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public onCheckedAll: FormControl = new FormControl<boolean>(false);

    public request$: Observable<IEmployeeModel[]> = combineLatest([
        this.employeeService.filterBy$,
        this.employeeService.sorter$,
        this.employeeService.direction$
    ]).pipe(
        switchMap((query: DataInput) => this.employeeService.getData(...query))
    );

    public data$: Observable<readonly IEmployeeModel[]> = this.request$.pipe(
        filter(tuiIsPresent),
        map((employees: IEmployeeModel[]) => employees.filter(tuiIsPresent)),
        mergeMap((employees: IEmployeeModel[]) => this.checkedAll$.pipe(map((checked: boolean) => {
                for (const employee of employees) {
                    employee.checked = checked;
                }

                return employees;
            }
        )))
    );


    constructor(
        public authModalService: AuthModalService,
        public employeeService: EmployeeTableService,
        public changeRef: ChangeDetectorRef,
        private _router: Router,
        private readonly _cabinetModalService: CabinetModalService
    ) {
        this.onCheckedAll.valueChanges.subscribe((value: boolean) => this.checkedAll$.next(value));
    }

    public loadCabinetModal(): void {
        const containerRef: ViewContainerRef = this.cabinetHost.viewContainerRef;
        containerRef.clear();
        containerRef.createComponent<CabinetComponent>(CabinetComponent);
    }

    public clearCabinetModal(): void {
        this.cabinetHost.viewContainerRef.clear();
    }

    public ngOnInit(): void {
        const context: EmployeeTableComponent = this;
        this.authModalService.isModalOpening$.subscribe(function (isModalOpening: boolean): void {
            context.isOpenModal = isModalOpening;
            context.changeRef.markForCheck();
        });
        this._cabinetModalService.isModalOpen$.subscribe(function (isModalOpening: boolean): void {
            if (isModalOpening) {
                context.loadCabinetModal();
            } else {
                context.clearCabinetModal();
            }
        });
    }

    public toggleOpeningFilters(): void {
        this.isOpenFilters = !this.isOpenFilters;
    }

    /**
     * Навигация на страницу детальной инфы
     */
    public navigateToDetailInfo(index: number): void {
        this._router.navigateByUrl(`/employee-editor/${index}`).then();
    }

}
