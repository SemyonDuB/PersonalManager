import { ChangeDetectionStrategy, Component, AfterViewInit, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TuiDay } from "@taiga-ui/cdk";
import { Subscription } from "rxjs";

type ShortDate = {year: number, month: number, day: number};
type IntervalControlNames = {startName: string, endName: string};
type NamedIntervalControlNames = IntervalControlNames & {textName: string};

@Component({
    selector: 'employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./styles/employee.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent implements AfterViewInit {

    imgPath: string = "../../../assets/img/sample_photo.png";

    defaultBirthDate: ShortDate = { year: 2000, month: 2, day: 1};
    defaultFirstWorkDate: ShortDate = { year: 2020, month: 10, day: 17};

    age: number = this.calculateDateDifference(this.defaultBirthDate).year;
    ageWord: string = this.declineYearWord(this.age);

    yearWorkExperience: number = this.calculateDateDifference(this.defaultFirstWorkDate).year;
    yearExperienceWord: string = this.declineYearWord(this.yearWorkExperience);
    monthWorkExperience: number = this.calculateDateDifference(this.defaultFirstWorkDate).month;
    monthExperienceWord: string = this.declineMonthWord(this.monthWorkExperience);

    basicVacationControlNames: IntervalControlNames = {startName: "vacationStart", endName: "vacationEnd"}
    vacationsHistory: Array<IntervalControlNames> = new Array<IntervalControlNames>({
        startName: this.basicVacationControlNames.startName + "0",
        endName: this.basicVacationControlNames.endName + "0"
    });
    vacationSubs: Subscription[] = [];

    basicVacancyControlNames: NamedIntervalControlNames =
        {startName: "vacancyStart", endName: "vacancyEnd", textName: "vacancyName"}
    vacanciesHistory: Array<NamedIntervalControlNames> = new Array<NamedIntervalControlNames>({
        startName: this.basicVacancyControlNames.startName + "0",
        endName: this.basicVacancyControlNames.endName + "0",
        textName: this.basicVacancyControlNames.textName + "0"
    });
    vacancySubs: Subscription[] = [];

    employeeForm: FormGroup = new FormGroup({
        "employeeName": new FormControl("Васий Пупупипкин Васильевич", [
            Validators.required
        ]),
        "employeeJob": new FormControl("Менеджер отдела связи №1", [
            Validators.required
        ]),
        "employeeEducation": new FormControl("Бакалавриат \"Программная инженерия\" ИРиТРТФ УРФУ"),
        "employeeBirth": new FormControl(new TuiDay(2000, 1, 1)),
        "employeeProject": new FormControl("Сайт для пиццерии \"Домашнее\""),
        "employeeInterviewDate": new FormControl(new TuiDay(2020, 10, 10)),
        "employeeEmploymentDate": new FormControl(new TuiDay(2020, 10, 13)),
        "employeeFirstWorkDay": new FormControl(new TuiDay(2020, 10, 17)),
        "vacationStart0" : new FormControl(new TuiDay(2021, 11, 20)),
        "vacationEnd0" : new FormControl(new TuiDay(2021, 11, 22)),
        "vacancyStart0" : new FormControl(new TuiDay(2021, 11, 20)),
        "vacancyEnd0" : new FormControl(new TuiDay(2021, 11, 22)),
        "vacancyName0" : new FormControl("Уборщик главного зала")
    });

    ngAfterViewInit() {
        this.employeeForm.get("employeeBirth")?.valueChanges.subscribe((newBirthDate) => {
            this.age = this.calculateDateDifference(newBirthDate).year;
            this.ageWord = this.declineYearWord(this.age);
        });

        this.employeeForm.get("employeeFirstWorkDay")?.valueChanges.subscribe((newStartDate) => {
            let dateDifference = this.calculateDateDifference(newStartDate);
            this.yearWorkExperience = dateDifference.year;
            if (this.yearWorkExperience > 0) {
                this.yearExperienceWord = this.declineYearWord(this.yearWorkExperience);
            }
            this.monthWorkExperience = dateDifference.month;
            if (this.monthWorkExperience > 0) {
                this.monthExperienceWord = this.declineMonthWord(this.monthWorkExperience);
            }
        });

        this.subscribeVacationFields(this.vacationsHistory[0]!.startName, 1);
        this.subscribeVacationFields(this.vacationsHistory[0]!.endName, 1);

        this.subscribeVacancyFields(this.vacanciesHistory[0]!.startName, 1);
        this.subscribeVacancyFields(this.vacanciesHistory[0]!.endName, 1);
        this.subscribeVacancyFields(this.vacanciesHistory[0]!.textName, 1);
    }

    subscribeVacationFields(controlName: string, nextIndex: number) {
        let sub = this.employeeForm.get(controlName)?.valueChanges.subscribe(() => {
            this.vacationSubs.forEach((sub) => sub.unsubscribe());
            this.vacationSubs = [];
            this.generateVacationFieldChanges(nextIndex);
        });
        this.vacationSubs.push(sub!);
    }

    subscribeVacancyFields(controlName: string, nextIndex: number) {
        let sub = this.employeeForm.get(controlName)?.valueChanges.subscribe(() => {
            this.vacancySubs.forEach((sub) => sub.unsubscribe());
            this.vacancySubs = [];
            this.generateVacancyFieldChanges(nextIndex);
        });
        this.vacancySubs.push(sub!);
    }

    addFormControls(...controlNames: string[]) {
        controlNames.forEach((name) => {
            this.employeeForm.addControl(name, new FormControl());
        });
    }

    generateVacationFieldChanges(index: number) {
        let startName = this.basicVacationControlNames.startName + index.toString();
        let endName = this.basicVacationControlNames.endName + index.toString();
        this.addFormControls(startName, endName);
        this.vacationsHistory.push({startName: startName, endName: endName});
        this.subscribeVacationFields(this.vacationsHistory[index]!.startName, index + 1);
        this.subscribeVacationFields(this.vacationsHistory[index]!.endName, index + 1);
    }

    generateVacancyFieldChanges(index: number) {
        let startName = this.basicVacancyControlNames.startName + index.toString();
        let endName = this.basicVacancyControlNames.endName + index.toString();
        let textName = this.basicVacancyControlNames.textName + index.toString();
        this.addFormControls(startName, endName,textName);
        this.vacanciesHistory.push({startName: startName, endName: endName, textName: textName});
        this.subscribeVacancyFields(this.vacanciesHistory[index]!.startName, index + 1);
        this.subscribeVacancyFields(this.vacanciesHistory[index]!.endName, index + 1);
        this.subscribeVacancyFields(this.vacanciesHistory[index]!.textName, index + 1);
    }

    calculateDateDifference(newStartDate: ShortDate): ShortDate {
        let now = new Date();
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let startDate = new Date(newStartDate.year, newStartDate.month, newStartDate.day);
        let nextAnniversaryDay = new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate());
        let yearDifference = today.getFullYear() - startDate.getFullYear();
        yearDifference = today < nextAnniversaryDay ? yearDifference - 1 : yearDifference;
        let monthDifference = Math.abs(today.getMonth() - startDate.getMonth());
        monthDifference = today.getMonth() < nextAnniversaryDay.getMonth() ? monthDifference - 1 : monthDifference;
        let dayDifference = Math.abs(today.getDay() - startDate.getDay());
        return {year: yearDifference, month: monthDifference, day: dayDifference};
    }

    declineNumberWord(number: number, nominative: string, parental: string, plural: string): string {
        if (number.toString().slice(number.toString().length - 1) === '1') {
            return nominative;
        } else if ('234'.includes(number.toString().slice(number.toString().length - 1))) {
            return parental;
        } else {
            return plural;
        }
    }

    declineYearWord(number: number): string {
        return this.declineNumberWord(number, 'год', 'года', 'лет');
    }

    declineMonthWord(number: number): string {
        return this.declineNumberWord(number, 'месяц', 'месяца', 'месяцев');
    }
}
