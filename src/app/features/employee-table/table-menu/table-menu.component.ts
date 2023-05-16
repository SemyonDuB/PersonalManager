import { Component } from '@angular/core';

@Component({
  selector: 'employee-table-menu',
  templateUrl: './table-menu.component.html',
  styleUrls: ['./table-menu.component.css']
})
export class TableMenuComponent {

    public isOpenFilters: boolean = false;

    constructor() {
    }

    public toggleOpeningFilters(): void {
        this.isOpenFilters = !this.isOpenFilters;
    }
}
