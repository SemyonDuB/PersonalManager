import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[authHost]',
})
export class ComponentHostDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
