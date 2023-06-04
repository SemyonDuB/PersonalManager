import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthModalService } from '../../../core/services/auth-modal.service';
import {MessagingService} from "../../../core/services/messaging.service";

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.css']
})
export class RegistrationComponent {
    public registerForm: FormGroup<{
        password: FormControl<string | null>;
        confirmPassword: FormControl<string | null>;
        username: FormControl<string | null>
    }> = new FormGroup({
        username: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        confirmPassword: new FormControl('', Validators.required)
    }, this.checkPasswords);

    constructor(private readonly _authService: AuthService,
                private readonly _changeAuthTypeService: AuthModalService,
                private readonly _authModalService: AuthModalService,
                private readonly _messagingService: MessagingService) {
    }

    public onSubmit(): void {
        const username: string = this.registerForm.value.username ?? "";
        const password: string = this.registerForm.value.password ?? "";
        const confirmPassword: string = this.registerForm.value.confirmPassword ?? "";

        this._authService
            .register(username, password, confirmPassword)
            .subscribe((result: {isSuccess: boolean, message: string}): void => {
                if (result.isSuccess) {
                    this._messagingService.sendModalMessage(result.message, 5000);
                    this._authModalService.changeModalOpening(false);
                } else {
                    this._messagingService.sendModalMessage(result.message,
                        5000);
                }
            });
    }

    public changeAuthType(): void {
        this._changeAuthTypeService.toggleAuthType();
    }

    private checkPasswords(group: AbstractControl): ValidationErrors | null {
        const pass: string | null = group.get('password')?.value;
        const confirmPass: string | null = group.get('confirmPassword')?.value;

        if (confirmPass === null || confirmPass !== pass) {
            this._messagingService.sendModalMessage('Пароль повторён неврено', 10000);

            return {notSame: true};
        }

        return null;
    }
}
