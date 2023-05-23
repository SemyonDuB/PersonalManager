import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

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

    constructor(private _authService: AuthService) {
    }

    public onSubmit(): void {
        this._authService
            .login(this.loginForm.value.username!, this.loginForm.value.password!)
            .subscribe();
    }
}
