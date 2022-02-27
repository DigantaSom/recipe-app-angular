import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { AuthComponent } from './auth.component';

const authRoutes: Routes = [{ path: 'auth', component: AuthComponent }];

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(authRoutes),
    SharedModule,
  ],
})
export class AuthModule {}
