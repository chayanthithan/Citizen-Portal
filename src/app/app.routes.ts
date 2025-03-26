import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegistrationComponent } from './pages/registration/registration.component';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import { NgModule } from '@angular/core';
import { ForgotPasswordComponent } from './pages/forgot-password/forgot-password.component';
import { CertificatesComponent } from './pages/certificates/certificates.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { GsDetailsComponent } from './pages/gs-details/gs-details.component';
import { AuthGuard } from './auth.guard';
import { GenerateCertificatesComponent } from './pages/generate-certificates/generate-certificates.component';
import { GnDivisionComponent } from './pages/gn-division/gn-division.component';
import { JobComponent } from './job/job.component';
import { EmployeementComponent } from './pages/employeement/employeement.component';
import { TabsComponent } from './pages/tabs/tabs.component';
import { IncomeComponent } from './pages/income/income.component';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'index', component: IndexComponent, canActivate: [AuthGuard] },
  { path: 'forget-password', component: ForgotPasswordComponent },
  {
    path: 'certificates',
    component: CertificatesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-details',
    component: UserDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gs-details',
    component: GsDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'generate-certificates',
    component: GenerateCertificatesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'gn-division',
    component: GnDivisionComponent,
    canActivate: [AuthGuard],
  },
  { path: 'job', component: JobComponent, canActivate: [AuthGuard] },
  {
    path: 'employee/:id',
    component: EmployeementComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tabs',
    component: TabsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'income/:id',
    component: IncomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'tabs',
    component: TabsComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
