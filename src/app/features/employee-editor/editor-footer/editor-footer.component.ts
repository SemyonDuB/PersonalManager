import {Component, EventEmitter, Output} from '@angular/core';
import { Router } from '@angular/router';
import { IEmployeeModel } from "../../../core/models/employee.model";
import { EmployeeTableService } from "../../../core/services/employee-table.service";
import {MessagingService} from "../../../core/services/messaging.service";

@Component({
    selector: 'employee-editor-footer',
    templateUrl: './editor-footer.component.html',
    styleUrls: ['./editor-footer.css']
})
export class EditorFooterComponent {

    @Output() public saveClick: EventEmitter<undefined> = new EventEmitter<undefined>();

    constructor(private readonly _router: Router, private readonly _messagingService: MessagingService) {
    }

    public returnToTable(): void {
        this._messagingService.sendModalMessage('Изменения не сохранены');
        this._router.navigateByUrl('').then();
    }

    public saveEmployeeChanges(): void {
        this._messagingService.sendModalMessage('Изменения сохранены');
        this.saveClick.emit(undefined);
    }
}
