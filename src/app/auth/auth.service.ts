import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_KEY: string = 'demo_api_key';
  private API_ENDPOINT: string = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`;

  constructor(private http: HttpClient) {}

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http
      .post<AuthResponseData>(this.API_ENDPOINT, {
        email,
        password,
        returnSecureToken: true,
      })
      .pipe(
        catchError((errorRes: HttpErrorResponse) => {
          let errorMsg = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return throwError(() => new Error(errorMsg));
          }
          switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMsg = 'This email already exists!';
              break;
          }
          return throwError(() => new Error(errorMsg));
        })
      );
  }
}
