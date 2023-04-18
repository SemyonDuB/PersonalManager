import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TuiDay } from "@taiga-ui/cdk";

@Component({
    selector: 'employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./styles/employee.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent {
    employeeForm : FormGroup = new FormGroup({
        "employeeName": new FormControl("Васий Пупупипкин Васильевич", [
            Validators.required
        ]),
        "employeeJob": new FormControl("Менеджер отдела связи №1", [
            Validators.required
        ]),
        "employeeEducation": new FormControl("Бакалавриат \"Программная инженерия\" ИРиТРТФ УРФУ"),
        "employeeBirth": new FormControl(new TuiDay(2001, 2, 15)),
        "employeeProject": new FormControl("Сайт для пиццерии \"Домашнее\""),
        "employeeInterviewDate": new FormControl(new TuiDay(2022, 10, 10)),
        "employeeEmploymentDate": new FormControl(new TuiDay(2022, 10, 13)),
        "employeeFirstWorkDay": new FormControl(new TuiDay(2022, 10, 17)),
    });
}
