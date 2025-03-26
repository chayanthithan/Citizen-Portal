import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Login } from '../../model/Login';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { MainService } from '../../service/main.service';
import { LoginDto } from '../../model/loginDto';
import { response } from 'express';
import { error } from 'console';
import { environment } from '../../../environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterLink,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgToastModule,
  ],
  providers: [],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private activateRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    if (sessionStorage.getItem('loginDto')) {
      this.router.navigateByUrl('index');
    }

    this.activateRoute.queryParams.subscribe((params) => {
      console.log('kajamohan ', params);
      if (
        params['email'] &&
        params['isVerified'] &&
        params['isVerified'] === 'true'
      ) {
        this.handleAfterGoogleLogin();
      }
    });
  }

  handleAfterGoogleLogin(): void {
    // This service will be triggered after successful authentication
    this.mainService.afterLoginUser().subscribe({
      next: (response) => {
        console.log('Received response:', response); // Debugging

        if (response && response.email) {
          // Store login details
          sessionStorage.setItem('loginDto', JSON.stringify(response));
          this.mainService.loginDto = response;

          // Store roles correctly
          if (response.roles && Array.isArray(response.roles)) {
            this.mainService.isRole = response.roles;
          }

          // Navigate to index page after login
          this.router.navigate(['/index']);
        } else {
          console.error('Error: Response is empty', response);
          this.router.navigate(['/login']);
        }
      },
      error: (error) => {
        console.error('API error:', error);
        this.router.navigate(['/login']);
      },
    });
  }
  // import services

  loginCredentials: Login = {
    email: '',
    password: '',
  };
  loginData: LoginDto = {
    lastName: '',
    email: '',
    roles: [],
    userId: '',
    firstName: '',
  };

  loginService: LoginService = inject(LoginService);
  mainService: MainService = inject(MainService);

  doLogin() {
    if (this.loginCredentials.email && this.loginCredentials.password) {
      this.loginService.loginUser(this.loginCredentials).subscribe({
        next: (response) => {
          sessionStorage.setItem('loginDto', JSON.stringify(response));
          this.mainService.loginDto = response;
          this.mainService.loginDto.roles.forEach((role) => {
            this.mainService.isRole = role;
          });
          this.toastr.success(
            'Login Successful!',
            this.mainService.loginDto.lastName
          );
        },
        error: (error) => {
          this.toastr.error('login failed', error.status);
        },
      });
    }
  }

  // authendication
  sendAuthendication() {
    window.location.href = `${environment.googleApi}`;
  }
}
