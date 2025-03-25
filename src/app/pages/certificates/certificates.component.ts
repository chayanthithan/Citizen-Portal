import { Component, inject } from '@angular/core';
import { MainService } from '../../service/main.service';
import { Certificate } from '../../model/Certificate';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgToastModule } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-certificates',
  imports: [CommonModule,
    FormsModule,
    NgToastModule
  ],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.css'
})
export class CertificatesComponent {
constructor(private toastr:ToastrService){}

  __main:MainService = inject(MainService);

  //model
  certificateDto:Certificate={
    typeOfCertificate: '',
    reason: '',
    requestedOrganization: '',
    userId: ''
  }

  doRequest(){
    this.certificateDto.userId = this.__main.loginDto.userId;
    const getData = this.__main.addRequestCertificate(this.certificateDto);
    getData.subscribe({
      next:(response) =>{
        this.toastr.success('Successfully send!');
      },error:(error)=>{
        // this.toastr.success('Successfully send!');  //this is for test
        this.toastr.error("Something Wrong!", error.status);
      }
    })
  }
}
