import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ComponentHostDirective } from '../../../shared/directives/component-host.directive';
import { CabinetModalService } from '../../../core/services/cabinet-modal.service';
import { CabinetComponent } from '../../../shared/components/cabinet/cabinet.component';
import { ActivatedRoute, Router } from '@angular/router';
import { IEmployeeModel } from '../../../core/models/employee.model';
import { EmployeeTableService } from '../../../core/services/employee-table.service';
import { TuiDay } from '@taiga-ui/cdk';
import { ICareer } from '../../../core/models/career.model';
import { IHolidays } from '../../../core/models/holidays.model';

type IntervalControlNames = { startName: string, endName: string };
type SignedStartDateNames = { startName: string, titleName: string };

@Component({
    selector: 'employee-editor',
    templateUrl: './employee-editor.component.html',
    styleUrls: ['./employee-editor.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeEditorComponent implements OnInit, OnDestroy {

    @ViewChild(ComponentHostDirective, {static: true}) public cabinetHost!: ComponentHostDirective;
    public imgPath: string = "../../../assets/img/sample_photo.png";

    public age: number | undefined;
    public yearWorkExp: number | undefined;
    public monthWorkExp: number | undefined;

    public basicVacationControlNames: IntervalControlNames = {startName: "vacationStart", endName: "vacationEnd"};
    public vacationsHistory: IntervalControlNames[] = new Array<IntervalControlNames>({
        startName: this.basicVacationControlNames.startName + "0",
        endName: this.basicVacationControlNames.endName + "0"
    });
    public vacationSubs: Subscription[] = [];

    public employeeId: number = Number(this._route.snapshot.paramMap.get('id')) ?? 0;
    public employee: IEmployeeModel | undefined = undefined;

    public basicVacancyControlNames: SignedStartDateNames =
        {startName: "vacancyStart", titleName: "vacancyName"};
    public vacanciesHistory: SignedStartDateNames[] = new Array<SignedStartDateNames>({
        startName: this.basicVacancyControlNames.startName + "0",
        titleName: this.basicVacancyControlNames.titleName + "0"
    });
    public vacancySubs: Subscription[] = [];

    public employeeForm: FormGroup = new FormGroup({
        "fullName": new FormControl("", [
            Validators.required
        ]),
        "jobTitle": new FormControl("", [
            Validators.required
        ]),
        "education": new FormControl(""),
        "birthday": new FormControl(),
        "projectName": new FormControl(""),
        "wage": new FormControl(""),
        "interviewDate": new FormControl(),
        "employmentDate": new FormControl(),
        "firstWorkDay": new FormControl(),
        "success": new FormControl(),
        "vacationStart0": new FormControl(),
        "vacationEnd0": new FormControl(),
        "vacancyStart0": new FormControl(),
        "vacancyName0": new FormControl("")
    });

    constructor(private readonly _cabinetModalService: CabinetModalService,
                private _route: ActivatedRoute,
                private _router: Router,
                private _employeeTableService: EmployeeTableService) {
        this.employee = _employeeTableService.getEmployee(this.employeeId);

        this.employeeForm.get("fullName")?.setValue(this.employee?.fullName);
        this.employeeForm.get("jobTitle")?.setValue(this.employee?.jobTitle);
        this.employeeForm.get("education")?.setValue(this.employee?.education);
        this.employeeForm.get("birthday")?.setValue(this.employee?.birthday);
        this.employeeForm.get("projectName")?.setValue(this.employee?.projectName);
        this.employeeForm.get("interviewDate")?.setValue(this.employee?.interviewDate);
        this.employeeForm.get("employmentDate")?.setValue(this.employee?.employmentDate);
        this.employeeForm.get("firstWorkDay")?.setValue(this.employee?.firstWorkDay);
        this.employeeForm.get("wage")?.setValue(this.employee?.wage);
        if (this.employee?.success) {
            this.employeeForm.get("success")?.setValue(this.employee?.success);
        } else {
            this.employeeForm.get("success")?.setValue(false);
        }

        this.age = this.employee?.birthday ? this.calculateDateDifference(this.employee.birthday).year : undefined;
        this.yearWorkExp = this.employee?.firstWorkDay ?
            this.calculateDateDifference(this.employee.firstWorkDay).year : undefined;
        this.monthWorkExp = this.employee?.firstWorkDay ?
            this.calculateDateDifference(this.employee.firstWorkDay).month : undefined;
    }

    public ngOnInit(): void {
        this.initializeCabinetModal();

        this.subscribeAnnotationFields();

        this.subscribeVacationFields(this.vacationsHistory[0]!.startName, 1);
        this.subscribeVacationFields(this.vacationsHistory[0]!.endName, 1);

        this.subscribeVacancyFields(this.vacanciesHistory[0]!.startName, 1);
        this.subscribeVacancyFields(this.vacanciesHistory[0]!.titleName, 1);

        this.loadCareer();
        this.loadHolidays();
    }

    public ngOnDestroy(): void {
        this.vacationSubs.forEach((sub: Subscription) => sub.unsubscribe());
        this.vacancySubs.forEach((sub: Subscription) => sub.unsubscribe());
    }

    public subscribeAnnotationFields(): void {
        this.employeeForm.get("birthday")?.valueChanges.subscribe((newBirthDate: TuiDay) => {
            this.age = this.calculateDateDifference(newBirthDate).year;
        });

        this.employeeForm.get("firstWorkDay")?.valueChanges.subscribe((newStartDate: TuiDay) => {
            const dateDifference: TuiDay = this.calculateDateDifference(newStartDate);
            this.yearWorkExp = dateDifference.year;
            this.monthWorkExp = dateDifference.month;
        });
    }

    public loadHolidays(): void {
        if (this.employee?.holidayHistory) {
            for (let i: number = 0; i < this.employee!.holidayHistory.length; i++) {
                this.employeeForm.get("vacationStart" + i)?.setValue(this.employee!.holidayHistory[i].startDate);
                this.employeeForm.get("vacationEnd" + i)?.setValue(this.employee!.holidayHistory[i].endDate);
            }
        }
    }

    public loadCareer(): void {
        if (this.employee?.career) {
            for (let i: number = 0; i < this.employee.career.length; i++) {
                this.employeeForm.get("vacancyStart" + i)?.setValue(this.employee.career[i].date);
                this.employeeForm.get("vacancyName" + i)?.setValue(this.employee.career[i].name);
            }
        }
    }

    public initializeCabinetModal(): void {
        const context: EmployeeEditorComponent = this;
        this._cabinetModalService.isModalOpen$.subscribe(function (isModalOpening: boolean): void {
            if (isModalOpening) {
                context.renderCabinetModal();
            } else {
                context.clearCabinetModal();
            }
        });
    }

    public renderCabinetModal(): void {
        const containerRef: ViewContainerRef = this.cabinetHost.viewContainerRef;
        containerRef.clear();
        containerRef.createComponent<CabinetComponent>(CabinetComponent);
    }

    public clearCabinetModal(): void {
        this.cabinetHost.viewContainerRef.clear();
    }

    public subscribeVacationFields(controlName: string, nextIndex: number): void {
        const sub: Subscription = this.employeeForm.get(controlName)?.valueChanges.subscribe(() => {
            this.vacationSubs.forEach((oldSub: Subscription) => oldSub.unsubscribe());
            this.vacationSubs = [];
            this.generateVacationFields(nextIndex);
        })!;
        this.vacationSubs.push(sub);
    }

    public subscribeVacancyFields(controlName: string, nextIndex: number): void {
        const sub: Subscription = this.employeeForm.get(controlName)?.valueChanges.subscribe(() => {
            this.vacancySubs.forEach((oldSub: Subscription) => oldSub.unsubscribe());
            this.vacancySubs = [];
            this.generateVacancyFields(nextIndex);
        })!;
        this.vacancySubs.push(sub!);
    }

    public addFormControls(...controlNames: string[]): void {
        controlNames.forEach((name: string): void => {
            this.employeeForm.addControl(name, new FormControl());
        });
    }

    public generateVacationFields(index: number): void {
        const startName: string = this.basicVacationControlNames.startName + index.toString();
        const endName: string = this.basicVacationControlNames.endName + index.toString();
        this.addFormControls(startName, endName);
        this.vacationsHistory.push({startName: startName, endName: endName});
        this.subscribeVacationFields(this.vacationsHistory[index]!.startName, index + 1);
        this.subscribeVacationFields(this.vacationsHistory[index]!.endName, index + 1);
    }

    public generateVacancyFields(index: number): void {
        const startName: string = this.basicVacancyControlNames.startName + index.toString();
        const titleName: string = this.basicVacancyControlNames.titleName + index.toString();
        this.addFormControls(startName, titleName);
        this.vacanciesHistory.push({startName: startName, titleName: titleName});
        this.subscribeVacancyFields(this.vacanciesHistory[index]!.startName, index + 1);
        this.subscribeVacancyFields(this.vacanciesHistory[index]!.titleName, index + 1);
    }

    public calculateDateDifference(newStartDate: TuiDay): TuiDay {
        const now: Date = new Date();
        const today: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startDate: Date = new Date(newStartDate.year, newStartDate.month, newStartDate.day);
        const nextAnniversaryDay: Date = new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate());
        let yearDifference: number = today.getFullYear() - startDate.getFullYear();
        yearDifference = today < nextAnniversaryDay ? yearDifference - 1 : yearDifference;
        let monthDifference: number = Math.abs(today.getMonth() - startDate.getMonth());
        monthDifference = today.getMonth() < nextAnniversaryDay.getMonth() ? monthDifference - 1 : monthDifference;
        const dayDifference: number = Math.abs(today.getDate() - startDate.getDate()) + 1;

        return new TuiDay(yearDifference, monthDifference, dayDifference);
    }

    public getCareerValues(): ICareer[] {
        const careerValues: ICareer[] = [];
        for (let i: number = 0; i < this.vacanciesHistory.length; i++) {
            const date: TuiDay = this.employeeForm.get(this.vacanciesHistory[i].startName)?.value;
            const name: string = this.employeeForm.get(this.vacanciesHistory[i].titleName)?.value;
            if (date || name) {
                careerValues.push({date: date, name: name});
            }
        }

        return careerValues;
    }

    public getHolidayValues(): IHolidays[] {
        const holidayValues: IHolidays[] = [];
        for (let i: number = 0; i < this.vacationsHistory.length; i++) {
            const startDate: TuiDay = this.employeeForm.get(this.vacationsHistory[i].startName)?.value;
            const endDate: TuiDay = this.employeeForm.get(this.vacationsHistory[i].endName)?.value;
            if (startDate || endDate) {
                holidayValues.push({startDate: startDate, endDate: endDate});
            }
        }

        return holidayValues;
    }

    public saveEmployee(): void {
        const employee: IEmployeeModel = {
            id: this.employeeId,
            fullName: this.employeeForm.get("fullName")?.value,
            birthday: this.employeeForm.get("birthday")?.value,
            career: this.getCareerValues(),
            education: this.employeeForm.get("education")?.value,
            employmentDate: this.employeeForm.get("employmentDate")?.value,
            firstWorkDay: this.employeeForm.get("firstWorkDay")?.value,
            holidayHistory: this.getHolidayValues(),
            interviewDate: this.employeeForm.get("interviewDate")?.value,
            jobTitle: this.employeeForm.get("jobTitle")?.value,
            projectName: this.employeeForm.get("projectName")?.value,

            // TODO: Добавить контрол для success
            success: false,

            wage: this.employeeForm.get("wage")?.value,
            checked: false
        };

        if (!this.employee) {
            this._employeeTableService.addEmployee(employee);
        } else {
            this._employeeTableService.updateEmployee(employee);
        }

        this._router.navigateByUrl('').then();
    }
}
