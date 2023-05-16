import {ChangeDetectionStrategy, Component, AfterViewInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TuiDay} from "@taiga-ui/cdk";
import {Subscription} from "rxjs";

type ShortDate = {year: number, month: number, day: number};
type IntervalControlNames = {startName: string, endName: string};
type NamedIntervalControlNames = IntervalControlNames & {textName: string};

@Component({
    selector: 'employee-editor',
    templateUrl: './employee-editor.component.html',
    styleUrls: ['./employee-editor.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeEditorComponent implements AfterViewInit {

    public imgPath: string = "../../../assets/img/sample_photo.png";

    public age: number | undefined;
    public ageWord: string | undefined;

    public yearWorkExp: number | undefined;
    public yearExpWord: string | undefined;
    public monthWorkExp: number | undefined;
    public monthExpWord: string | undefined;

    public basicVacationControlNames: IntervalControlNames = {startName: "vacationStart", endName: "vacationEnd"};
    public vacationsHistory: IntervalControlNames[] = new Array<IntervalControlNames>({
        startName: this.basicVacationControlNames.startName + "0",
        endName: this.basicVacationControlNames.endName + "0"
    });
    public vacationSubs: Subscription[] = [];

    public basicVacancyControlNames: NamedIntervalControlNames =
        {startName: "vacancyStart", endName: "vacancyEnd", textName: "vacancyName"};
    public vacanciesHistory: NamedIntervalControlNames[] = new Array<NamedIntervalControlNames>({
        startName: this.basicVacancyControlNames.startName + "0",
        endName: this.basicVacancyControlNames.endName + "0",
        textName: this.basicVacancyControlNames.textName + "0"
    });
    public vacancySubs: Subscription[] = [];

    public employeeForm: FormGroup = new FormGroup({
        "employeeName": new FormControl("", [
            Validators.required
        ]),
        "employeeJob": new FormControl("", [
            Validators.required
        ]),
        "employeeEducation": new FormControl(""),
        "employeeBirth": new FormControl(),
        "employeeProject": new FormControl(""),
        "employeeInterviewDate": new FormControl(),
        "employeeEmploymentDate": new FormControl(),
        "employeeFirstWorkDay": new FormControl(),
        "vacationStart0" : new FormControl(),
        "vacationEnd0" : new FormControl(),
        "vacancyStart0" : new FormControl(),
        "vacancyEnd0" : new FormControl(),
        "vacancyName0" : new FormControl("")
    });

    public ngAfterViewInit(): void {
        this.employeeForm.get("employeeBirth")?.valueChanges.subscribe((newBirthDate: ShortDate) => {
            this.age = this.calculateDateDifference(newBirthDate).year;
            this.ageWord = this.declineYearWord(this.age);
        });

        this.employeeForm.get("employeeFirstWorkDay")?.valueChanges.subscribe((newStartDate: ShortDate) => {
            const dateDifference: ShortDate = this.calculateDateDifference(newStartDate);
            this.yearWorkExp = dateDifference.year;
            if (this.yearWorkExp > 0) {
                this.yearExpWord = this.declineYearWord(this.yearWorkExp);
            }
            this.monthWorkExp = dateDifference.month;
            if (this.monthWorkExp > 0) {
                this.monthExpWord = this.declineMonthWord(this.monthWorkExp);
            }
        });

        this.subscribeVacationFields(this.vacationsHistory[0]!.startName, 1);
        this.subscribeVacationFields(this.vacationsHistory[0]!.endName, 1);

        this.subscribeVacancyFields(this.vacanciesHistory[0]!.startName, 1);
        this.subscribeVacancyFields(this.vacanciesHistory[0]!.endName, 1);
        this.subscribeVacancyFields(this.vacanciesHistory[0]!.textName, 1);
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
        controlNames.forEach((name: string) => {
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
        const endName: string = this.basicVacancyControlNames.endName + index.toString();
        const textName: string = this.basicVacancyControlNames.textName + index.toString();
        this.addFormControls(startName, endName,textName);
        this.vacanciesHistory.push({startName: startName, endName: endName, textName: textName});
        this.subscribeVacancyFields(this.vacanciesHistory[index]!.startName, index + 1);
        this.subscribeVacancyFields(this.vacanciesHistory[index]!.endName, index + 1);
        this.subscribeVacancyFields(this.vacanciesHistory[index]!.textName, index + 1);
    }

    public calculateDateDifference(newStartDate: ShortDate): ShortDate {
        const now: Date = new Date();
        const today: Date = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const startDate: Date = new Date(newStartDate.year, newStartDate.month, newStartDate.day);
        const nextAnniversaryDay: Date = new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate());
        let yearDifference: number = today.getFullYear() - startDate.getFullYear();
        yearDifference = today < nextAnniversaryDay ? yearDifference - 1 : yearDifference;
        let monthDifference: number = Math.abs(today.getMonth() - startDate.getMonth());
        monthDifference = today.getMonth() < nextAnniversaryDay.getMonth() ? monthDifference - 1 : monthDifference;
        const dayDifference: number = Math.abs(today.getDay() - startDate.getDay());

        return {year: yearDifference, month: monthDifference, day: dayDifference};
    }

    public declineNumberWord(number: number, nominative: string, parental: string, plural: string): string {
        if (number.toString().slice(number.toString().length - 1) === '1') {
            return nominative;
        } else if ('234'.includes(number.toString().slice(number.toString().length - 1))) {
            return parental;
        } else {
            return plural;
        }
    }

    public declineYearWord(number: number): string {
        return this.declineNumberWord(number, 'год', 'года', 'лет');
    }

    public declineMonthWord(number: number): string {
        return this.declineNumberWord(number, 'месяц', 'месяца', 'месяцев');
    }
}
