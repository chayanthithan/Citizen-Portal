import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MainService } from './../../service/main.service';
import { EmploymentDto } from '../../model/EmploymentDto';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { NgToastModule } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-employeement',
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    NgToastModule,
    MatButtonModule,
  ],
  templateUrl: './employeement.component.html',
  styleUrls: ['./employeement.component.css'],
  providers: [DatePipe],
})
export class EmployeementComponent implements OnInit {
  startDate: Date | null = null;
  endDate: Date | null = null;
  selectedJobId: string = '';
  selectedJobtitle: string = '';
  jobOptions: { id: string; title: string; description: string }[] = [];
  citizenId: string = '';
  job_id: string = '';
  constructor(
    private jobService: MainService,
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private router: Router,
    private toastr:ToastrService
  ) {}

  ngOnInit(): void {
    // Fetch job options
    this.loadJobs();

    this.citizenId = this.route.snapshot.paramMap.get('id') ?? '';
    console.log('Citizen ID in Employee form:', this.citizenId);
  }

  // Method to fetch job options from the backend
  loadJobs() {
    this.jobService.getAllJobs().subscribe({
      next: (jobs) => {
        this.jobOptions = jobs; // Populate job options
      },
      error: (err) => console.error('Failed to fetch jobs', err),
    });
  }

  // Method to handle the Add Employee form submission
  addEmployee() {
    if (this.startDate && this.endDate && this.selectedJobId) {
      const formattedStartDate = this.startDate.toISOString().split('T')[0];
      const formattedEndDate = this.endDate.toISOString().split('T')[0];

      const employeeData: EmploymentDto = {
        startDate: formattedStartDate,
        endDate: formattedEndDate,
        userId: this.citizenId,
        jobId: this.selectedJobId,
      };

      this.jobService.addEmployee(employeeData).subscribe({
        next: (response) => {
          this.toastr.success('successfully added');
          this.router.navigate(['/employees']); // Redirect after success
        },
        error: (error) => {
          this.toastr.error('failed to add employee!');
        },
      });
    } else {
      this.toastr.error('please fill fields of employee!');
    }
  }
}
