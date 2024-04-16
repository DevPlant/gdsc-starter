// src/app/register/register.component.ts
import {Component, inject} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  private readonly auth = inject(AuthService)

  registerForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor() { }

  onRegister() {
    if (this.registerForm.valid) {
      console.log('Registration data:', this.registerForm.value);
      // @ts-ignore
      this.auth.register(this.registerForm.value.email, this.registerForm.value.password);
      // You can integrate Firebase authentication or any other server-side authentication here
    } else {
      console.error('Form is not valid');
    }
  }
}
