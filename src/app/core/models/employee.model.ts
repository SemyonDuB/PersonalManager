import {ICareer} from './career.model';
import {TuiDay} from '@taiga-ui/cdk';

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

    holidayHistory: TuiDay[];
    career: ICareer[];

    checked: boolean;
}
