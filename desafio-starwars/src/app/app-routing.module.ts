import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// importa todos os componentes para o qual o serviço da navegação para ser ativado.

import {SignInComponent} from '../../src/app/components/sign-in/sign-in.component';
import {SignUpComponent} from '../../src/app/components/sign-up/sign-up.component';
import {DashboardComponent} from '../../src/app/components/dashboard/dashboard.component';
import {ForgotPasswordComponent} from '../../src/app/components/forgot-password/forgot-password.component';
import { AuthGuard } from "../../shared/guard/auth.guard";
import {VerifyEmailComponent} from '../../src/app/components/verify-email/verify-email.component';

const routes: Routes = [
  {path: '', redirectTo: '/sign-in', pathMatch: 'full'},
  {path: 'sign-in', component: SignInComponent},
  {path: 'register-user', component: SignUpComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'verify-email-address', component: VerifyEmailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
