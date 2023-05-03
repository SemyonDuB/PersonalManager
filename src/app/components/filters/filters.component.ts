import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {TuiDay} from '@taiga-ui/cdk';
@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./styles/filters.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FiltersComponent {
    readonly testFormText = new FormGroup({
        Name: new FormControl(),
        Post: new FormControl(),
        Project: new FormControl(),
        Salary: new FormControl(),
        Success: new FormControl(),
        Date: new FormControl(new TuiDay(2023, 4, 20)),
        DateEmployment: new FormControl(new TuiDay(2023, 4, 20)),

    });
    readonly items = [
        'По дате рождения',
        'По дате трудоустройства',
        'По успешности'
    ];


    readonly form = new FormGroup({
        sort: new FormControl()
    });

}






