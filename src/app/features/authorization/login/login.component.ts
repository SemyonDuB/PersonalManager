import {Component} from '@angular/core';
import {AuthService} from "../../../core/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthModalService} from "../../../core/services/auth-modal.service";

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
                private readonly _authModalService: AuthModalService) {
    }

    public onSubmit(): void {
        this._authService
            .login(this.loginForm.value.username!, this.loginForm.value.password!)
            .subscribe();
        this._authModalService.changeModalOpening(false);
    }

    public changeAuthType(): void {
        this._authModalService.toggleAuthType();
    }
}
