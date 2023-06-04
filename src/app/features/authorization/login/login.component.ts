import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthModalService } from '../../../core/services/auth-modal.service';
import {MessagingService} from "../../../core/services/messaging.service";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.css']
})
export class LoginComponent {
    public loginForm: FormGroup<{
        password: FormControl<string | null>;
        username: FormControl<string | null>
    }> = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required)
    });

    constructor(private readonly _authService: AuthService,
                private readonly _authModalService: AuthModalService,
                private readonly _messagingService: MessagingService) {
    }

    public onSubmit(): void {
        this._authService
            .login(this.loginForm.value.username!, this.loginForm.value.password!)
            .subscribe((isSuccess: boolean): void => {
                if (isSuccess) {
                    this._authModalService.changeModalOpening(false);
                } else {
                    this._messagingService.sendModalMessage('Неверные имя или пароль', 5000);
                }
            });
    }

    public changeAuthType(): void {
        this._authModalService.toggleAuthType();
    }
}
