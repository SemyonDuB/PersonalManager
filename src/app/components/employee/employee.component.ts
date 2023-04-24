import { ChangeDetectionStrategy, Component, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { TuiDay } from "@taiga-ui/cdk";

type ShortDate = {year: number, month: number, day: number};

@Component({
    selector: 'employee',
    templateUrl: './employee.component.html',
    styleUrls: ['./styles/employee.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeComponent implements AfterViewInit {

    imgPath: string = "../../../assets/img/sample_photo.png";
    defaultBirthDate: ShortDate = { year: 2000, month: 2, day: 1};
    age: number = this.calculateAgeDifference(this.defaultBirthDate).year;
    ageWord: string = this.declineYearWord(this.age);
    defaultFirstWorkDate: ShortDate = { year: 2020, month: 10, day: 17};
    yearWorkExperience: number = this.calculateAgeDifference(this.defaultFirstWorkDate).year;
    yearExperienceWord: string = this.declineYearWord(this.yearWorkExperience);
    monthWorkExperience: number = this.calculateAgeDifference(this.defaultFirstWorkDate).month;
    monthExperienceWord: string = this.declineMonthWord(this.monthWorkExperience);
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
    });

    ngAfterViewInit() {
        this.employeeForm.get("employeeBirth")?.valueChanges.subscribe((newBirthDate) => {
            this.age = this.calculateAgeDifference(newBirthDate).year;
            this.ageWord = this.declineYearWord(this.age);
        })
        this.employeeForm.get("employeeFirstWorkDay")?.valueChanges.subscribe((newStartDate) => {
            let dateDifference = this.calculateAgeDifference(newStartDate);
            this.yearWorkExperience = dateDifference.year;
            if (this.yearWorkExperience > 0) {
                this.yearExperienceWord = this.declineYearWord(this.yearWorkExperience);
            }
            this.monthWorkExperience = dateDifference.month;
            if (this.monthWorkExperience > 0) {
                this.monthExperienceWord = this.declineMonthWord(this.monthWorkExperience);
            }
        })
    }

    calculateAgeDifference(newStartDate: ShortDate): ShortDate {
        let now = new Date();
        let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        let startDate = new Date(newStartDate.year, newStartDate.month, newStartDate.day);
        let nextAnniversaryDay = new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate());
        let yearDifference = today.getFullYear() - startDate.getFullYear();
        if (today < nextAnniversaryDay) {
            yearDifference -= 1;
        }
        let monthDifference = Math.abs(today.getMonth() - startDate.getMonth());
        if (today.getMonth() < nextAnniversaryDay.getMonth()) {
            monthDifference -= 1;
        }
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
