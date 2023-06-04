import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeTableService } from '../../../core/services/employee-table.service';
import { IEmployeeModel } from '../../../core/models/employee.model';
import { TuiDay } from '@taiga-ui/cdk';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
    selector: 'employee-table-filters',
    templateUrl: './table-filters.component.html',
    styleUrls: ['./table-filters.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [
        trigger('openClose', [
            state('open', style({
                opacity: 1
            })),
            state('closed', style({
                opacity: 0
            })),
            transition('open => closed', [
                animate('0.15s')
            ]),
            transition('closed => open', [
                animate('0.15s')
            ])
        ]),
        trigger('shift', [
            state('opening', style({
                height: '206px',
            })),
            state('closing', style({
                height: '0px',
            })),
            transition('opening => closing', [
                animate('0.3s')
            ]),
            transition('closing => opening', [
                animate('0.3s')
            ])
        ])
    ]
})

export class TableFiltersComponent {

    public isOpenFilters: boolean = false;
    public isDisabled: boolean = true;

    public readonly filterForm: FormGroup = new FormGroup({
        fullName: new FormControl(null),
        jobTitle: new FormControl(null),
        projectName: new FormControl(null),
        wage: new FormControl(null),
        success: new FormControl(null),
        birthday: new FormControl<TuiDay | null>(null),
        employmentDate: new FormControl<TuiDay | null>(null),
    });

    constructor(private _employeeTableService: EmployeeTableService, private _changeRef: ChangeDetectorRef) {
        const context: TableFiltersComponent = this;
        this._employeeTableService.isOpenFilters$.subscribe((isOpen: boolean): void => {
            if (isOpen) {
                context.isDisabled = false;
                context.isOpenFilters = isOpen;
                context._changeRef.markForCheck();
            } else {
                context.isOpenFilters = isOpen;
                context._changeRef.markForCheck();
                setTimeout((): void => {
                    context.isDisabled = true;
                    context._changeRef.markForCheck();
                }, 300);
            }
        });
    }

    public applyFilters(): void {
        this._employeeTableService.filterBy$.next(this.filterForm.value as Partial<IEmployeeModel>);
    }
}









