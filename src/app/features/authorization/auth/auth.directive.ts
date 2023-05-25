import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[authHost]',
})
export class AuthDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
