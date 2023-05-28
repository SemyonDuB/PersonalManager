import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
    selector: '[componentsHost]',
})
export class ComponentHostDirective {
    constructor(public viewContainerRef: ViewContainerRef) { }
}
