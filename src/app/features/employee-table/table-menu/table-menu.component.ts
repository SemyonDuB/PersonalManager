import {Component, EventEmitter, Output, Input} from '@angular/core';

@Component({
  selector: 'employee-table-menu',
  templateUrl: './table-menu.component.html',
  styleUrls: ['./table-menu.component.css']
})
export class TableMenuComponent {

    @Input() public isOpenFilters: boolean = false;

    @Output() public openFilters: EventEmitter<undefined> = new EventEmitter<undefined>();
    public onOpenFilters(): void {
        this.openFilters.emit();
    }
}
