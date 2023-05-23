import {Component, EventEmitter, Input, Output} from "@angular/core";
import {Router} from "@angular/router";

@Component({
    selector: 'menu-bar',
    templateUrl: './menu-bar.component.html',
    styleUrls: ['./menu-bar.css']
})
export class MenuBarComponent{

    public isTablePage: boolean;
    @Input() public isOpenFilters: boolean = false;
    @Output() public clickFilter: EventEmitter<undefined> = new EventEmitter<undefined>();

    constructor(protected readonly router: Router) {
        this.isTablePage = router.url === '/employee-table';
    }

    public onFilterClick(): void {
        this.clickFilter.emit();
    }
}
