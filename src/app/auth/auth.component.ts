import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    if (this.isLoginMode) {
      // TODO: implement login
    } else {
      this.authService.signUp(email, password).subscribe({
        next: (resData) => {
          console.log(resData);
          this.isLoading = false;
        },
        error: (errorObj: Error) => {
          console.log(errorObj);
          this.errorMessage = errorObj.message;
          this.isLoading = false;
        },
      });
    }

    form.reset();
  }
}
