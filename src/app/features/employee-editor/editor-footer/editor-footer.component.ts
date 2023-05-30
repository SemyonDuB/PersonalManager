import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'employee-editor-footer',
    templateUrl: './editor-footer.component.html',
    styleUrls: ['./editor-footer.css']
})
export class EditorFooterComponent {

    constructor(private readonly _router: Router) {
    }
    public returnToTable(): void {
        this._router.navigateByUrl('').then();
    }
}
