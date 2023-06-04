import { Injectable, ErrorHandler } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessagingService } from './core/services/messaging.service';

@Injectable({
    providedIn: "root",
})
export class GlobalErrorHandler implements ErrorHandler {

    constructor(private readonly _messagingService: MessagingService) {
    }
    public handleError(error: Error | HttpErrorResponse): void {
        if (error.name === 'HttpErrorResponse') {
            alert('Ошибка "' + (error as HttpErrorResponse).message + '" на стороне сервера "' +
                (error as HttpErrorResponse).url + '". Возможна ошибка подключения. Проверьте соединение.');
        } else {
            console.log('Обнаружена ошибка на стороне клиента:');
            console.log(error);
        }
    }
}
