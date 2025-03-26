import { Component, inject, OnInit } from '@angular/core';
import { Job } from '../../model/Job';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MainService } from '../../service/main.service';
import { ToastrService } from 'ngx-toastr';
import { GnDivisionResponse } from '../../model/gnDivisionResponse';
import { NgToastModule } from 'ng-angular-popup';
@Component({
  selector: 'app-job',
  standalone: true,
  imports: [FormsModule, CommonModule, NgToastModule],
  templateUrl: './job.component.html',
  styleUrl: './job.component.css',
})
export class JobComponent implements OnInit {
  constructor(private toastr: ToastrService) {
    console.log('job component');
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  __main: MainService = inject(MainService);
  jobDto: Job = {
    id: '',
    title: '',
    description: '',
  };

  addJob() {
    debugger;
    const getData = this.__main.addJobDetails(this.jobDto);
    getData.subscribe({
      next: (response) => {
        this.toastr.success('Added Successful!');
        this.jobDto = {
          id: '',
          title: '',
          description: '',
        };
      },
      error: (error) => {
        this.toastr.success('failed to add job!');
      },
    });
  }
}
