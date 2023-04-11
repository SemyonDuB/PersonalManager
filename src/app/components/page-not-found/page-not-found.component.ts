import { Component } from '@angular/core';

@Component({
    selector: 'page-not-found',
    templateUrl: './page-not-found.component.html',
    styleUrls: ['./styles/page-not-found.css']
})
export class PageNotFoundComponent {

    public pageTitle = '404';
    public description = 'Page not found';

}
