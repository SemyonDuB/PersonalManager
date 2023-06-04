import { Component, OnInit } from '@angular/core';
import { MessagingService } from '../../../core/services/messaging.service';

@Component({
    selector: 'message-modal',
    templateUrl: './message-modal.component.html',
    styleUrls: ['./message-modal.css']
})
export class MessageModalComponent implements OnInit{

    public message: string = '';

    constructor(public messagingService: MessagingService) {

        const context: MessageModalComponent = this;
        setTimeout((): void => {
            console.log(context.messagingService.message);
            context.message = context.messagingService.message;
        }, 100);
    }

    public ngOnInit(): void {
    }
}
