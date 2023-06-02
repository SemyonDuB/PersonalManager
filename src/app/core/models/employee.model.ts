import { ICareer } from './career.model';
import { IHolidays } from './holidays.model';
import { TuiDay } from '@taiga-ui/cdk';

export interface IEmployeeModel {
    id: number;

    fullName: string;
    birthday: TuiDay;
    jobTitle: string;
    wage: number;
    employmentDate: TuiDay;
    projectName: string;
    success: boolean;

    education: string;
    interviewDate: TuiDay;
    firstWorkDay: TuiDay;

    holidayHistory: IHolidays[];
    career: ICareer[];

    checked: boolean;
}
