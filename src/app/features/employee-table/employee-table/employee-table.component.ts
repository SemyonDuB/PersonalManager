import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {EmployeeTableService} from '../../../core/services/employee-table.service';
import {EmployeeModel} from '../../../core/models/employee.model';
import {Router} from '@angular/router';
import {combineLatest, filter, map, Observable, switchMap} from 'rxjs';
import {tuiIsPresent} from '@taiga-ui/cdk';
import {AuthModalService} from '../../../core/services/auth-modal.service';
import {ComponentHostDirective} from '../../../shared/directives/component-host.directive';
import {CabinetModalService} from '../../../core/services/cabinet-modal.service';
import {CabinetComponent} from '../../../shared/components/cabinet/cabinet.component';

type DataInput = [(Partial<EmployeeModel> | null), (keyof EmployeeModel | null), (1 | -1)];

@Component({
    selector: 'app-employee-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './employee-table.component.html',
    styleUrls: ['./employee-table.css'],
})
export class EmployeeTableComponent implements OnInit{

    @ViewChild(ComponentHostDirective, {static: true}) public cabinetHost!: ComponentHostDirective;
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
        public changeRef: ChangeDetectorRef,
        private _router: Router,
        private readonly _cabinetModalService: CabinetModalService
    ) {
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
        this.authModalService.isModalOpening$.subscribe(function(isModalOpening: boolean): void {
            context.isOpenModal = isModalOpening;
            context.changeRef.markForCheck();
        });
        this._cabinetModalService.isModalOpen$.subscribe(function(isModalOpening: boolean): void {
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
    public navigateToDetailInfo(): void {
        this._router.navigateByUrl('/employee-editor').then();
    }

}
