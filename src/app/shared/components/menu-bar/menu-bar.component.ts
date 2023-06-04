import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { IEmployeeModel } from "../../../core/models/employee.model";
import { EmployeeTableService } from "../../../core/services/employee-table.service";

@Component({
    selector: 'menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.css']
})
export class MenuBarComponent{

    public isTablePage: boolean;
    private _isOpenFilters: boolean = false;

    constructor(protected readonly router: Router, private _employeeTableService: EmployeeTableService) {
        this.isTablePage = router.url === '/employee-table';
    }

    public addEmployee(): void {
        if (!window.localStorage.getItem("jwt")) {
            this.router.navigateByUrl('/employee-table/auth');

            return;
        }

        const id: number = 1 + Math.max(...this._employeeTableService.employees.map((e: IEmployeeModel) => e.id));

        this.router.navigateByUrl(`/employee-editor/${id}`).then();
    }

    public deleteEmployees(): void {
        if (!window.localStorage.getItem("jwt")) {
            this.router.navigateByUrl('/employee-table/auth');

            return;
        }

        const checked: IEmployeeModel[] = this._employeeTableService.employees.filter((e: IEmployeeModel) => e.checked);
        const ids: number[] = checked.map((e: IEmployeeModel) => e.id);

        this._employeeTableService.deleteEmployees(ids);
    }

    public onFilterClick(): void {
        this._employeeTableService.isOpenFilters$.next(!this._isOpenFilters);
        this._isOpenFilters = !this._isOpenFilters;
    }
}
