export interface Career {
    date: Date;
    name: string;
}

export interface EmployeeModel {
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
    career: Career[];
}
