import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MainService } from '../../service/main.service';

import { FormsModule } from '@angular/forms';
import {AfterViewInit, Component, ViewChild,inject, OnInit } from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
@Component({
  selector: 'app-gs-details',
  imports: [FormsModule,MatTableModule, MatPaginatorModule,CommonModule],
  templateUrl: './gs-details.component.html',
  styleUrl: './gs-details.component.css'
})
export class GsDetailsComponent {
 mainService: MainService = inject(MainService);
  
 enableAddGS:boolean = false;
 filter:string='';
  constructor() { }

  ngOnInit() {
    this.doFilter();
  }
  displayedColumns: string[] = ['Firstname','LastName', 'Address','JobCardNo', 'serviceGrade','Email', 'TelNO','Action'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  addGS(){
    debugger
    this.enableAddGS = !this.enableAddGS;
  }

  doFilter(){
    console.log('filter by',this.filter);

    
  }
    
}


export interface PeriodicElement {
  Firstname: string;
  LastName: string;
  Address: string;
  JobCardNo: string;
  serviceGrade: string;
  Email: string;
  TelNO: string;
  Action:string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    Firstname: 'Firstabc123',
    LastName: 'Lastxyz456',
    Address: '123 Random St',
    JobCardNo: 'FC123456',
    serviceGrade: '1990-01-01',
    Email: 'abc123@example.com',
    TelNO: '+11234567890',
    Action:'View'

  },
  {
    Firstname: 'Firstdef789',
    LastName: 'Lastuvw012',
    Address: '456 Another St',
    JobCardNo: 'FC654321',
    serviceGrade: '1985-05-15',
    Email: 'def789@example.com',
    TelNO: '+19876543210',
    Action:'View'
  },
  {
    Firstname: 'Firstghi345',
    LastName: 'Lastrst678',
    Address: '789 New St',
    JobCardNo: 'FC987654',
    serviceGrade: '1995-12-25',
    Email: 'ghi345@example.com',
    TelNO: '+15556667777',
    Action:'View'
  },
  {
    Firstname: 'Firstjkl901',
    LastName: 'Lastmno234',
    Address: '101 Old St',
    JobCardNo: 'FC246810',
    serviceGrade: '2000-07-04',
    Email: 'jkl901@example.com',
    TelNO: '+14443332222',
    Action:'View'
  },
  {
    Firstname: 'Firstpqr567',
    LastName: 'Laststu890',
    Address: '202 Future St',
    JobCardNo: 'FC135790',
    serviceGrade: '1975-03-30',
    Email: 'pqr567@example.com',
    TelNO: '+17778889999',
    Action:'View'
  }
]