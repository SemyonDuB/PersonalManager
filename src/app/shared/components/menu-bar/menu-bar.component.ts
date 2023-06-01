import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployeeModel } from "../../../core/models/employee.model";
import { EmployeeTableService } from "../../../core/services/employee-table.service";
import { TuiDay } from "@taiga-ui/cdk";

@Component({
    selector: 'menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.css']
})
export class MenuBarComponent{

    public isTablePage: boolean;
    @Input() public isOpenFilters: boolean = false;
    @Output() public clickFilter: EventEmitter<undefined> = new EventEmitter<undefined>();

    constructor(protected readonly router: Router, private _employeeTableService: EmployeeTableService) {
        this.isTablePage = router.url === '/employee-table';
    }

    public addEmployee(): void {
        const employee: IEmployeeModel = this._employeeTableService.addEmployee({
            id: 0,
            fullName: '',
            wage: 0,
            jobTitle: '',
            education: '',
            birthday: new TuiDay(2000, 0, 0),
            projectName: '',
            interviewDate: new TuiDay(2000, 0, 0),
            employmentDate: new TuiDay(2000, 0, 0),
            firstWorkDay: new TuiDay(2000, 0, 0),
            success: false,
            checked: false,
            career: [],
            holidayHistory: []
        });

        this.router.navigateByUrl(`/employee-editor/${employee.id}`).then();
    }

    public onFilterClick(): void {
        this.clickFilter.emit();
    }
}
