import {Component} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AbstractControl, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";

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

    constructor(private _authService: AuthService) {
    }

    public onSubmit(): void {
        const username: string = this.registerForm.value.username ?? "";
        const password: string = this.registerForm.value.password ?? "";

        this._authService
            .register(username, password)
            .subscribe();
    }

    private checkPasswords(group: AbstractControl): ValidationErrors | null {
        const pass: string | null = group.get('password')?.value;
        const confirmPass: string | null = group.get('confirmPassword')?.value;

        if (confirmPass === null || confirmPass !== pass) {
            return {notSame: true};
        }

        return null;
    }
}
