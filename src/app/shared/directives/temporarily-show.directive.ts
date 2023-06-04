import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[temporarilyShow]' })
export class TemporarilyShowDirective {

    constructor(private _templateRef: TemplateRef<any>,
                private _viewContainer: ViewContainerRef){
    }

    @Input() public set if(timeOut: number) {
        this._viewContainer.createEmbeddedView(this._templateRef);
        setTimeout((): void => {
            this._viewContainer.clear();
        }, timeOut);
    }
}
