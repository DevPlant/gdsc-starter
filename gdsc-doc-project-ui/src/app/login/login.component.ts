import {Component, inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private readonly auth = inject(AuthService)

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor() { }

  onLogin() {
    if (this.loginForm.valid) {
      console.log('Form Submitted!', this.loginForm.value);
      // @ts-ignore
      this.auth.login(this.loginForm.value.username, this.loginForm.value.password);
    } else {
      console.log('Form Not Valid');
    }
  }
}
