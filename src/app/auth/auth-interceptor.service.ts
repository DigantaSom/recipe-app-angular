import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { Observable, exhaustMap, take } from 'rxjs';

import { AuthService } from './auth.service';

// Note: This interceptor is used to make sure that we add the auth-token to every HTTP request we send.
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // We wanna take only one value from this observable, then immediately unsubscribe form it.
    // exhaustMap() waits for the first (user) observable to get completed, then it gives us that user.
    // Then the higher-order observable (user) will be replaced by the lower-order observable (http.get())
    // This modification is basically done because we had to return two observables (not possible).
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        // no need to attach token if we don't have a logged in user
        if (!user) {
          return next.handle(req);
        }
        // attach the token only if we have a user logged in
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
