import {Component, inject} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../../components/users/services/user.service';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {checkEmailAvailableValidator} from './validators/registration.validator';

@Component({
  selector: "app-registration",
  templateUrl: "./registration.component.html",
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  styleUrls: ["./registration.component.scss"]
})
export class RegistrationComponent {
  private userService: UserService = inject(UserService);
  private router: Router = inject(Router);

  credentials = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl('', {
      validators: [Validators.required],
      updateOn: 'change',
      nonNullable: true
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)],
      updateOn: 'change',
      nonNullable: true
    }),
    confirmPassword: new FormControl('', {
      validators: [Validators.required, Validators.minLength(4)],
      updateOn: 'change',
      nonNullable: true
    }),
    avatar: new FormControl('', Validators.required),
  });

  errorMessage = '';

  onSubmit(): void {

    if (this.credentials.errors) {
      this.errorMessage = 'error';
      return;
    }
    if (this.credentials.controls.password.value !== this.credentials.controls.confirmPassword.value) {
      this.errorMessage = 'Пароли не совпадают';
      return;
    }

      this.userService.createUser("test", this.credentials.controls.email.value, this.credentials.controls.email.value).subscribe(result => {
        if (!result) {
          this.errorMessage = 'Что-то пошло не так :(';
        }
        this.router.navigate(['login']);
      })

  }
}
