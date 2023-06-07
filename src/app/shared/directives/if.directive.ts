import { Component, Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[if]' })
export class IfDirective {

    constructor(private _templateRef: TemplateRef<Component>,
                private _viewContainer: ViewContainerRef){
    }

    @Input() public set if(condition: boolean) {
        if (condition) {
            this._viewContainer.createEmbeddedView(this._templateRef);
        } else {
            this._viewContainer.clear();
        }
    }
}
