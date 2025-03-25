import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { Login } from '../../model/Login';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { MainService } from '../../service/main.service';
import { LoginDto } from '../../model/loginDto';
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
  constructor(private router: Router, private toastr: ToastrService) {}
  ngOnInit(): void {
    // this.mainService.getDataWithCookies();
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
    debugger;
    if (this.loginCredentials.email && this.loginCredentials.password) {
      // this.loginData = {
      //   lastName: 'vimal@gmail.com',
      //   email: '12345',
      //   roles:['ROLE_DS'],
      //   firstName:'',
      //   userId:''
      // }

      let getData = this.loginService.loginUser(this.loginCredentials);
      getData.subscribe({
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
          // this.router.navigate(['index']);
          const returnUrl =
            this.router.parseUrl(this.router.url).queryParams['returnUrl'] ||
            '/index';

          this.router.navigateByUrl(returnUrl);
        },
        error: (error) => {
          this.toastr.error('login failed', error.status);
        },
      });

      // delete below code once everything got fine
      //     sessionStorage.setItem('loginDto', JSON.stringify(this.loginData));
      //       this.mainService.loginDto = this.loginData;
      //       this.mainService.loginDto.roles.forEach(role=>{this.mainService.isRole = role})
      //       this.toastr.success('Login Successful!', this.mainService.loginDto.lastName);
      //       // this.router.navigate(['index']);
      //       const returnUrl = this.router.parseUrl(this.router.url).queryParams['returnUrl'] || '/index';
      //       this.router.navigateByUrl(returnUrl);
      // } else {
      //   console.error('Username and password are required');
      //  }
    }
  }
}
