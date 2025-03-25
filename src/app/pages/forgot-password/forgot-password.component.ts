import { Component, inject } from '@angular/core';
import { ForgetPassword } from '../../model/ForgetPassword';
import { MainService } from '../../service/main.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../service/login.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  constructor(private toastr: ToastrService, private route: ActivatedRoute) { }
  // services

  mainService: MainService = inject(MainService);
  loginService: LoginService = inject(LoginService)
  // model

  forgetPassword: ForgetPassword = {
    email: '',
    currentPassword: null,
    newPassword: '',
    confirmPassword: '',
    token: ''
  }


  token: string = '';
  email: string = '';

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
      this.token = params['token'] || '';  // Assign token
      this.email = params['email'] || '';  // Assign email

      this.forgetPassword.token = this.token;
      this.forgetPassword.email = this.email;

      console.log('Token:', this.token);
      console.log('Email:', this.email);
    });

  }

  doPasswordChange() {
    debugger
    if (!this.forgetPassword.token) {
      const getData = this.mainService.getUserForgetPassword(this.forgetPassword.email);
      getData.subscribe({
        next: (response) => {
          this.toastr.success('Sent Successful!', 'Please check your email');
        }, error: (error) => {
          this.toastr.error("Something Wrong!", error.status);
        }
      })
    } else {
      if (this.forgetPassword.newPassword != '' && this.forgetPassword.confirmPassword != '') {
        if (this.forgetPassword.newPassword === this.forgetPassword.confirmPassword) {
          
          const getData = this.mainService.resetForgetPassword(this.forgetPassword);
          getData.subscribe({
            next: (response) => {
              this.toastr.success('Sent Successful!', 'Please check your email');
            }, error: (error) => {
              this.toastr.error("Something Wrong!", error.status);
            }
          })
        } else {
          this.toastr.error('New and Conform Password Mismatched!');
        }
      } else {
        this.toastr.error('Empty fields! please fill all the fields');
      }
    }

  }

}
