import {Component, ViewChild, ViewContainerRef} from '@angular/core';
import {ComponentHostDirective} from "./shared/directives/component-host.directive";
import {MessagingService} from "./core/services/messaging.service";
import {MessageModalComponent} from "./shared/components/message-modal/message-modal.component";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.css']
})
export class AppComponent {

    @ViewChild(ComponentHostDirective, {static: true}) public messageModalHost!: ComponentHostDirective;

    constructor(private readonly _messagingService: MessagingService) {
        const context: AppComponent = this;
        this._messagingService.openingMessage$.subscribe((isOpen: boolean): void => {
            if (isOpen) {
                context.renderMessageModal();
                setTimeout((): void => {
                    context.clearMessageModal();
                },context._messagingService.timeOut);
            } else {
                context.clearMessageModal();
            }
        });
    }

    public renderMessageModal(): void {
        const containerRef: ViewContainerRef = this.messageModalHost.viewContainerRef;
        containerRef.clear();
        containerRef.createComponent<MessageModalComponent>(MessageModalComponent);
    }

    public clearMessageModal(): void {
        this.messageModalHost.viewContainerRef.clear();
    }
}
