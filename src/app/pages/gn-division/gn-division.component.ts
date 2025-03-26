import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { MainService } from '../../service/main.service';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GnDivision } from '../../model/GnDivision';
import { GnDivisionDto } from '../../model/GnDivisionDto';
import { response } from 'express';
import { NgToastModule } from 'ng-angular-popup';
import { ToastrService } from 'ngx-toastr';
import { error } from 'console';
@Component({
  selector: 'app-gn-division',
  imports: [MatTableModule,MatPaginatorModule,CommonModule,FormsModule,NgToastModule],
  templateUrl: './gn-division.component.html',
  styleUrl: './gn-division.component.css'
})
export class GnDivisionComponent {
  mainService: MainService = inject(MainService);
  constructor(private cdr: ChangeDetectorRef,private toastr:ToastrService) { }
  
  enableAddGS:boolean = false;
  filter:string='';
  gnDivision:GnDivision ={
    Name: '',
    Code: '',
    Address: '',
    TelNO: '',
    Action:''
  }
  gnDivisionData:GnDivisionDto={
    // id:'',
    name: '',
    code: '',
    address: '',
    phone: ''
  }
 
   ngOnInit() {
     this.doFilter();
     this.retrieveAllGnDivision();
   }
   ELEMENT_DATA: any[] = [];
   displayedColumns: string[] = ['Name','Code', 'Address','TelNO', 'Action'];
   dataSource = new MatTableDataSource<PeriodicElement>([]);
 
   @ViewChild(MatPaginator) paginator!: MatPaginator;
 
   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
   }
   
 
   doFilter(){
     console.log('filter by',this.filter);
 
     
   }

   callAddGnDivision(){
    this.enableAddGS = !this.enableAddGS;
   }

    updateGnDivision(id:any){
    debugger

    this.gnDivision = { ...id };
    this.cdr.detectChanges();
    this.enableAddGS = !this.enableAddGS;
      
   }

   addGnDivisionDetails(){
    // this.gnDivisionData.id = this.mainService.loginDto.userId;
    const getData = this.mainService.addGnDivisions(this.gnDivisionData);

    getData.subscribe({
      next:(response)=>{
        this.toastr.success('successfully added!');
        this.enableAddGS = !this.enableAddGS;
      },error:(error)=>{
        this.toastr.success('failed to add GN Division!');

      }
    })
   }

  //  get all gn division
  retrieveAllGnDivision(){
    const getData = this.mainService.getAllGnDivisions();
    getData.subscribe({
      next: (response) => {
        this.ELEMENT_DATA = response.map((division) => ({
          Id: division.id,
          Name: division.name,
          Code: division.address,
          Address: division.address,
          TelNO: division.phone,
          Action: '',
        }));
        this.dataSource.data = this.ELEMENT_DATA;
    },error:(error)=>{

      }
    })
  }
     
  deleteItem(element:any) {
    debugger
    console.log('id',element);
    if (confirm('Are you sure you want to delete this item?')) {
      const getData = this.mainService.deleteGnDivision(element.Id);
      getData.subscribe({
        next:(response)=>{
          this.toastr.success('Item deleted successfully!');
        },error:(error)=>{
          this.toastr.error('failed to deleted Gn division!');

        }
      })
    }
  }
 }
 


 
 export interface PeriodicElement {
  Id:string,
   Name: string;
   Code: string;
   Address:string,
   TelNO: string;
   Action:string;
 }
 
//  const ELEMENT_DATA: PeriodicElement[] = [
//    {
//     Id:'',
//      Name: 'Firstabc123',
//      Code:'002',
//      Address: '123 Random St',
//      TelNO: '+11234567890',
//      Action:'View'
 
//    },
//    {
//     Id:'',
//     Name: 'Firstabc123',
//     Code:'002',
//     Address: '123 Random St',
//     TelNO: '+11234567890',
//     Action:'View'
//    },
//    {
//     Id:'',
//     Name: 'Firstabc123',
//     Code:'002',
//     Address: '123 Random St',
//     TelNO: '+11234567890',
//     Action:'View'
//    },
//    {
//     Id:'',
//     Name: 'Firstabc123',
//     Code:'002',
//     Address: '123 Random St',
//     TelNO: '+11234567890',
//     Action:'View'
//    },
//    {
//     Id:'',
//     Name: 'Firstabc123',
//     Code:'002',
//     Address: '123 Random St',
//     TelNO: '+11234567890',
//     Action:'View'
//    }
//  ]