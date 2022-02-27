import {
  Component,
  ComponentRef,
  OnDestroy,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  errorMessage: string | null = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeAlertSub: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnDestroy(): void {
    if (this.closeAlertSub) {
      this.closeAlertSub.unsubscribe();
    }
  }

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    let authObs: Observable<AuthResponseData>;

    this.isLoading = true;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signUp(email, password);
    }
    authObs.subscribe({
      next: (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (errorObj: Error) => {
        console.log(errorObj);
        this.errorMessage = errorObj.message;
        this.showErrorAlert(errorObj.message);
        this.isLoading = false;
      },
    });

    form.reset();
  }

  onCloseErrorAlert(): void {
    this.errorMessage = null;
  }

  private showErrorAlert(message: string): void {
    const hostViewContainerRef: ViewContainerRef =
      this.alertHost.viewContainerRef;

    hostViewContainerRef.clear();

    const componentRef: ComponentRef<AlertComponent> =
      hostViewContainerRef.createComponent<AlertComponent>(AlertComponent);

    componentRef.instance.message = message;
    this.closeAlertSub = componentRef.instance.close.subscribe(() => {
      this.closeAlertSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
