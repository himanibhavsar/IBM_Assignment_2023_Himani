import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { ErrorHandlingService } from '../services/error-handling.service';

interface RegistrationResponse {
  success: boolean;
}

interface RegistrationForm {
  name: string;
  email: string;
  password: string;
  bio: string;
}

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  hidePassword = true;
  registrationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private userService: UserService,
    private errorHandlingService: ErrorHandlingService,
  ) { }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      bio: ['', Validators.required]
    });
  }

  submitRegisterButton(): void {
    if (this.registrationForm.valid) {
      const formData: RegistrationForm = this.registrationForm.value;
      this.userService.registerUser(formData).subscribe(
        (response: RegistrationResponse) => {
          if (response.success) {
            this.router.navigate(['/profile']);
          }
        },
        error => {
          this.errorHandlingService.handleError('There was an error during the registration process', error);
        }
      );
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

}
