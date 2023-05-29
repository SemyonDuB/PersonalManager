import {ICareer} from './career.model';

export interface IEmployeeModel {
    id: number;

    fullName: string;
    birthday: Date;
    jobTitle: string;
    wage: number;
    employmentDate: Date;
    projectName: string;
    success: boolean;

    education: string;
    interviewDate: Date;
    firstWorkDay: Date;

    holidayHistory: Date[];
    career: ICareer[];

    checked: boolean;
}
