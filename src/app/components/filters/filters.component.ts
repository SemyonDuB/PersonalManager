import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TuiDay} from '@taiga-ui/cdk';
import {EmployeeService} from "../../services/employee/employee.service";

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./styles/filters.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FiltersComponent {

    constructor( private employeeService: EmployeeService) {

    }
    readonly testFormText = new FormGroup({
        Name: new FormControl(null),
        Post: new FormControl(null),
        Project: new FormControl(null),
        Salary: new FormControl(null),
        Success: new FormControl(null),
        Date: new FormControl(new TuiDay(2023, 4, 20)),
        DateEmployment: new FormControl(new TuiDay(2023, 4, 20)),
    });

     public applyFilters(): void{
         if(!this.testFormText.pristine){
            this.employeeService.employees = this.employeeService.employees.filter(emploee => emploee.fullName.includes(this.fullNameForm) ||
                emploee.projectName.includes(this.projectNameForm) ||
                emploee.jobTitle.includes(this.jobTitleForm) ||
                (emploee.wage == this.wageForm) ||
                (emploee.success == (this.successForm == 'true'))
            );
            console.log(this.employeeService.employees)
         }
     }
     fullNameForm:any='';
     jobTitleForm: any;
     wageForm: any;
     projectNameForm: any = '';
     successForm: any;


    ngOnInit() {

        this.testFormText.valueChanges.subscribe((v) => {
            this.fullNameForm = v.Name;
            this.wageForm = v.Salary;
            this.jobTitleForm=v.Post;
            this.projectNameForm = v.Project;
            this.successForm = v.Success;


           // console.log(v.Name)

        })
    }
}









