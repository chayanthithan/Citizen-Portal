import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Register } from '../../model/register';
import { MainService } from '../../service/main.service';
import { NgToastModule } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { GnDivisionResponse } from '../../model/gnDivisionResponse';
import { error } from 'console';

@Component({
  selector: 'app-registration',
  imports: [RouterLink,CommonModule,FormsModule,NgToastModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit{
  constructor(private toastr:ToastrService,private route:Router){
    console.log(this.civilType)
  }
  ngOnInit(): void {
    this.getAllGnDivision();
  }
  //import services
  __main:MainService = inject(MainService);

  civilType:string = '';
  registerDto:Register={
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    gender: '',
    age: 0,
    dateOfBirth: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    father: false,
    mother: false,
    child: false,
    familyCardNo: '',
    gramaNiladhariId: '',
    nic:''
  }

  gnDivisionResponseDto:GnDivisionResponse[] = [];

  doRegister(){
    this.registerDto.gramaNiladhariId = this.__main.loginDto.userId;
    const getData = this.__main.registerUser(this.registerDto);
    getData.subscribe({
      next:(response) =>{
        this.toastr.success('Register Successful!', this.registerDto.firstName);
        this.route.navigateByUrl('/login');
      },error:(error)=>{
        this.toastr.error("Something Wrong!", error.status);
      }
    })
    
  }
  // get all gn division
  getAllGnDivision(){
    const getData = this.__main.getAllGnDivisions();
    getData.subscribe({
      next:(response:GnDivisionResponse[])=>{
        this.gnDivisionResponseDto = response;
        console.log('get all divisions:',this.gnDivisionResponseDto )
      },error:(error)=>{
        this.toastr.error("Something Wrong to fetch Gn Division", error.status);
      }
    })
  }
}
