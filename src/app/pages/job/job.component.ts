import { Component, inject } from '@angular/core';
import { Job } from '../../model/Job';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MainService } from '../../service/main.service';
import { ToastrService } from 'ngx-toastr';
import { GnDivisionResponse } from '../../model/gnDivisionResponse';
import { NgToastModule } from 'ng-angular-popup';
@Component({
  selector: 'app-job',
  imports: [
    FormsModule,CommonModule,NgToastModule
  ],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css'
})
export class JobComponent {
  constructor(private toastr:ToastrService){}
  __main:MainService = inject(MainService);
  jobDto:Job={
    id: '',
    title: '',
    description: ''
  }

  addJob(){
    const getData = this.__main.addJobDetails(this.jobDto);
    getData.subscribe({
      next:(response)=>{
        this.toastr.success('Added Successful!');
      },error:(error)=>{

      }
    })
  }

}
