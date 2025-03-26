import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MainService } from '../../service/main.service';

import { FormsModule } from '@angular/forms';
import {
  AfterViewInit,
  Component,
  ViewChild,
  inject,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FilterCertificateDto } from '../../model/FilterCertificateDto';
import { NgToastModule } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { CitizenResponseDto } from '../../model/citizenResponseDto';
import { FilterCitizenDto } from '../../model/filterCitizenDto';
import { ApprovedByDto } from '../../model/approvedByDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    RouterLink,
    NgToastModule,
  ],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit, AfterViewInit {
  ELEMENT_DATA: any[] = [];
  citizen: any[] = [];
  mainService: MainService = inject(MainService);

  isRequestCertificate: boolean = false;

  // filterCertificateDto: FilterCertificateDto = {
  //   typeOfCertificate: 'ALL',
  //   requestStatus: 'ALL',
  //   requestedDateFrom: new Date(Date.now()).toISOString().split('T')[0],
  //   requestedDateTo: new Date(Date.now()).toISOString().split('T')[0],
  // };

  filterCitizenDto: FilterCitizenDto = {
    nic: null,
    firstName: null,
    familyCardNo: null,
    ageFrom: '',
    ageTo: '',
  };

  approvedDto: ApprovedByDto = {
    certificateId: '',
    updatedById: '',
  };

  citizenDetailsList: CitizenResponseDto[] = [];

  displayedColumns = [
    'Firstname',
    'LastName',
    'Address',
    'FamilyCardNo',
    'DOB',
    'Email',
    'TelNO',
    'action',
  ];

  displayedColumns_RequestCertificates: string[] = [
    'typeOfCertificate',
    'reason',
    'requestedOrganization',
    'status',
    'rejectionReason',
    'requestedDate',
    'requestStatusUpdateDate',
    'requestedBy',
    // 'id',
    // 'citizenId',
    'action',
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // ELEMENT_DATA: PeriodicElement[] = [];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  ELEMENT_DATA_CERTIFICATES: RequestCertificate[] = [];
  dataSource_RequestCertificates = new MatTableDataSource<RequestCertificate>(
    []
  );

  constructor(private toastr: ToastrService, private router: Router) {}
  requestedDateFrom!: string;
  filterCertificateDto!: FilterCertificateDto;
  
  ngOnInit() {
 
  const now = new Date();
  const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const formattedFirstDay = `${firstDayOfMonth.getFullYear()}-${(firstDayOfMonth.getMonth()+1).toString().padStart(2, '0')}-01`;
  // Then initialize the DTO with the dates
  this.filterCertificateDto = {
    typeOfCertificate: 'ALL',
    requestStatus: 'ALL',
    requestedDateFrom: formattedFirstDay, // Now this will have the correct value
    requestedDateTo: new Date(Date.now()).toISOString().split('T')[0],
  };
    this.getCitizenByFilter();
    this.filetrCertificateRequest();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  // Optional: For changes in input (not required if no @Input used)
  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterCitizenDto']) {
      this.getCitizenByFilter();
    }
  }

  requestCertificates() {
    this.isRequestCertificate = true;
  }

  doReject() {
    this.mainService.isReject = !this.mainService.isReject;
  }

  doApprove(element: RequestCertificate) {
    this.approvedDto.certificateId = element.id;
    this.approvedDto.updatedById = this.mainService.loginDto.userId;

    this.mainService.approvedCertificates(this.approvedDto).subscribe({
      next: () => {
        this.toastr.success('Successfully Approved!');
        this.filetrCertificateRequest(); // Refresh table
      },
      error: (error) => {
        this.toastr.error('Something went wrong!', error.status);
      },
    });
  }

  doFilterUser() {
    if (
      this.filterCertificateDto.typeOfCertificate ||
      this.filterCertificateDto.requestedDateFrom ||
      this.filterCertificateDto.requestedDateTo ||
      this.filterCertificateDto.requestStatus
    ) {
      this.mainService
        .filterCertificateRequest(this.filterCertificateDto)
        .subscribe({
          next: (response) => {
            this.ELEMENT_DATA_CERTIFICATES = response.map((request) => ({
              ...request,
              action: '',
            }));
            this.dataSource_RequestCertificates.data =
              this.ELEMENT_DATA_CERTIFICATES;
          },
          error: (error) => {
            this.toastr.error('Something went wrong!', error.status);
          },
        });
    } else {
      this.toastr.warning('Please fill at least one filter field!');
    }
  }

  getCitizenByFilter() {
    const gnId = this.mainService.loginDto.userId;
    this.mainService
      .filterCitizenDetails(
        this.filterCitizenDto.nic,
        this.filterCitizenDto.firstName,
        this.filterCitizenDto.familyCardNo,
        this.filterCitizenDto.ageFrom,
        this.filterCitizenDto.ageTo,
        gnId
      )
      .subscribe({
        next: (response) => {
          this.ELEMENT_DATA = response.map((citizen) => ({
            Firstname: citizen.firstName,
            LastName: citizen.lastName,
            Address: citizen.address,
            FamilyCardNo: citizen.familyCardNo,
            DOB: citizen.dateOfBirth,
            Email: '', // Assuming no email in response
            TelNO: citizen.phone,
            id: citizen.id,
          }));
          this.dataSource.data = this.ELEMENT_DATA;
        },
        error: (error) => {
          this.toastr.error('Failed to load citizen data', error.status);
        },
      });
  }

  filetrCertificateRequest() {
    this.mainService
      .filterCertificateRequest(this.filterCertificateDto)
      .subscribe({
        next: (response) => {
          this.ELEMENT_DATA_CERTIFICATES = response.map((request) => ({
            ...request,
            action: '',
          }));
          this.dataSource_RequestCertificates.data =
            this.ELEMENT_DATA_CERTIFICATES;
        },
        error: (error) => {
          this.toastr.error(
            'Failed to load certificate requests',
            error.status
          );
        },
      });
  }
  openAddEmployeeForm(citizen: any) {
    console.log('Opening employee form for citizen:', citizen.id);
    // Navigating to /employee and passing the citizen's ID
    this.router.navigate(['/employee', citizen.id]);
  }
  openAddIncomeForm(element:any){
    this.router.navigate(['/income', element.id]);
  }
}

// -------------------- Interfaces -----------------------

export interface PeriodicElement {
  Firstname: string;
  LastName: string;
  Address: string;
  FamilyCardNo: string;
  DOB: string;
  Email: string;
  TelNO: string;
  id: string;
}

export interface RequestCertificate {
  typeOfCertificate: string;
  reason: string;
  requestedOrganization: string;
  status: string;
  rejectionReason: string;
  requestedDate: string;
  requestStatusUpdateDate: string;
  requestedBy: string;
  id: string;
  citizenId: string;
  action: string;
}
