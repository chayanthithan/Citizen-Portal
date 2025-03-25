import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MainService } from '../../service/main.service';

import { FormsModule } from '@angular/forms';
import { AfterViewInit, Component, ViewChild, inject, OnInit, SimpleChanges } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FilterCertificateDto } from '../../model/FilterCertificateDto';
import { NgToastModule } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
import { CitizenResponseDto } from '../../model/citizenResponseDto';
import { FilterCitizenDto } from '../../model/filterCitizenDto';
import { ApprovedByDto } from '../../model/approvedByDto';
import { RejectDto } from '../../model/RejectDto';
@Component({
  selector: 'app-user-details',
  imports: [FormsModule, MatTableModule, MatPaginatorModule, CommonModule, NgToastModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.css'
})
export class UserDetailsComponent {
  mainService: MainService = inject(MainService);

  isRequestCertificate: boolean = false;
  filterCertificateDto: FilterCertificateDto = {
    typeOfCertificate: 'ALL',
    requestStatus: 'ALL',
    requestedDateFrom: Date.now().toString(),
    requestedDateTo: '',
  }
  filterCitizenDto: FilterCitizenDto = {
    nic: null,
    firstName: null,
    familyCardNo: null,
    ageFrom: '',
    ageTo: ''
  };
  approvedDto:ApprovedByDto={
    certificateId: '',
    updatedById: ''
  }
  rejectDto:RejectDto={
    certificateId: '',
    rejectReason: '',
    rejectedBy: ''
  }
  citizenDetailsList: CitizenResponseDto[] = [];

  constructor(private toastr: ToastrService,private router:Router) { }

  ngOnInit() {
    // this.getAllCitizenDetails();
    this.getCitizenByFilter();
    this.filetrCertificateRequest();
  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes['filterCitizenDto']) {
      this.getCitizenByFilter();
    }
  }
  displayedColumns: string[] = ['Firstname', 'LastName', 'Address', 'FamilyCardNo', 'DOB', 'Email', 'TelNO','Action'];
  // dataSource = new MatTableDataSource<PeriodicElement>(this.ELEMENT_DATA);

  displayedColumns_RequestCertificates: string[] = ['typeOfCertificate', 'reason', 'requestedOrganization', 'status', 'rejectionReason', 'requestedDate', 'requestStatusUpdateDate', 'requestedBy', 'action'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  requestCertificates() {
    this.isRequestCertificate = true;
  } 

  viewUser(element:any){
    console.log('elements is:',element);
    this.router.navigate(["/income",element.id]);
  }

//   reject function

  doReject(element: any) {
    debugger
    this.mainService.isReject = !this.mainService.isReject;
    this.rejectDto.rejectedBy = this.mainService.loginDto.userId;
    this.rejectDto.certificateId = element.id;
    
  }
  callRejectedFunction(){
    debugger
    this.mainService.isReject = !this.mainService.isReject;
    const getData = this.mainService.rejectCertificates(this.rejectDto);
    getData.subscribe({
      next: (response) => {
        this.toastr.success('Successfully Rejected!');
      }, error: (error) => {
        // this.toastr.success('Successfully send!');  //this is for test
        this.toastr.error("Something Wrong !", error.status);
      }
    })
  }
  enableReject(){
    this.mainService.isReject = !this.mainService.isReject;
  }

  doApprove(element: any) {
    this.approvedDto.certificateId = element.id;
    this.approvedDto.updatedById = this.mainService.loginDto.userId;
    
    const getData = this.mainService.approvedCertificates(this.approvedDto);
    getData.subscribe({
      next: (response) => {
        this.toastr.success('Successfully Approved!');
      }, error: (error) => {
        // this.toastr.success('Successfully send!');  //this is for test
        this.toastr.error("Something Wrong !", error.status);
      }
    })

  }
  // this is the filter section 
  doFilterUser() {
    if (!this.filterCertificateDto.typeOfCertificate && !this.filterCertificateDto.requestedDateFrom && !this.filterCertificateDto.requestedDateTo && !this.filterCertificateDto.requestStatus) {

      const getData = this.mainService.filetrCertificateRequest(this.filterCertificateDto);

      getData.subscribe({
        next: (response) => {
          // this.toastr.success('Successfully send!');
        }, error: (error) => {
          // this.toastr.success('Successfully send!');  //this is for test
          this.toastr.error("Something Wrong!", error.status);
        }
      })

    } else {
      this.toastr.success('Please fill any of field!');

    }
  }

  dataSource = new MatTableDataSource<PeriodicElement>([]); // Initialize with an empty array

  ELEMENT_DATA: PeriodicElement[] = [];
  tempCitizenResponse: CitizenResponseDto[] = [];

  getCitizenByFilter() {

    const gnId = this.mainService.loginDto.userId;
    const getData = this.mainService.filterCitizenDetails(this.filterCitizenDto.nic, this.filterCitizenDto.firstName, this.filterCitizenDto.familyCardNo, this.filterCitizenDto.ageFrom, this.filterCitizenDto.ageTo, gnId);
    getData.subscribe({
      next: (response) => {
        console.log('filter citizen:', response);
        this.ELEMENT_DATA = response.map(citizen => ({
          Firstname: citizen.firstName,
          LastName: citizen.lastName,
          Address: citizen.address,
          FamilyCardNo: citizen.familyCardNo,
          DOB: citizen.dateOfBirth,
          Email: '',
          TelNO: citizen.phone,
          id: citizen.id
        }));
        this.dataSource.data = this.ELEMENT_DATA; // Update MatTableDataSource
        console.log(this.dataSource.data); // Debugging
        // this.toastr.success('Successfully send!');
      }, error: (error) => {
        // this.toastr.success('Successfully send!');  //this is for test
        this.toastr.error("Something Wrong!", error.status);
      }
    })


  }


  dataSource_RequestCertificates = new MatTableDataSource<RequestCertificate>([]); // Initialize with an empty array
  ELEMENT_DATA_CERTIFICATES: RequestCertificate[] = [];
  // filter citezen requested certificate details
  filetrCertificateRequest() {
    const getData = this.mainService.filetrCertificateRequest(this.filterCertificateDto);
    getData.subscribe({
      next: (response) => {
        console.log('filter citizen:', response);
        this.ELEMENT_DATA_CERTIFICATES = response.map(request => ({
          typeOfCertificate: request.typeOfCertificate,
          reason: request.reason,
          requestedOrganization: request.requestedOrganization,
          status: request.status,
          rejectionReason: request.rejectionReason,
          requestedDate: request.requestedDate,
          requestStatusUpdateDate: request.requestStatusUpdateDate,
          requestedBy: request.requestedBy,
          id: request.id,
          citizenId: request.citizenId,
          action: ''
        }));
        this.dataSource_RequestCertificates.data = this.ELEMENT_DATA_CERTIFICATES;

        console.log(this.dataSource.data); // Debugging
        // this.toastr.success('Successfully send!');
      }, error: (error) => {
        // this.toastr.success('Successfully send!');  //this is for test
        this.toastr.error("Something Wrong!", error.status);
      }
    })
  }

}










export interface PeriodicElement {
  Firstname: string;
  LastName: string;
  Address: string;
  FamilyCardNo: string;
  DOB: string;
  Email: string;
  TelNO: string;
  id: string
}
export interface RequestCertificate {
  typeOfCertificate: string,
  reason: string,
  requestedOrganization: string,
  status: string,
  rejectionReason: string,
  requestedDate: string,
  requestStatusUpdateDate: string,
  requestedBy: string,
  id: string,
  citizenId: string,
  action: string;
}
