import { ChangeDetectorRef, Component, inject, ViewChild } from '@angular/core';
import { MainService } from '../../service/main.service';
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GnDivision } from '../../model/GnDivision';
@Component({
  selector: 'app-gn-division',
  imports: [MatTableModule,MatPaginatorModule,CommonModule,FormsModule],
  templateUrl: './gn-division.component.html',
  styleUrl: './gn-division.component.css'
})
export class GnDivisionComponent {
  mainService: MainService = inject(MainService);
  
  enableAddGS:boolean = false;
  filter:string='';
  gnDivision:GnDivision ={
    Name: '',
    Code: '',
    Address: '',
    TelNO: '',
    Action:''
  }
   constructor(private cdr: ChangeDetectorRef) { }
 
   ngOnInit() {
     this.doFilter();
   }
   displayedColumns: string[] = ['Name','Code', 'Address','TelNO', 'Action'];
   dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
 
   @ViewChild(MatPaginator) paginator!: MatPaginator;
 
   ngAfterViewInit() {
     this.dataSource.paginator = this.paginator;
   }
   
 
   doFilter(){
     console.log('filter by',this.filter);
 
     
   }

   addGnDivision(){
    this.enableAddGS = !this.enableAddGS;
   }

    updateGnDivision(id:any){
    debugger

    this.gnDivision = { ...id };
    this.cdr.detectChanges();
    this.enableAddGS = !this.enableAddGS;
      
   }
     
 }
 
 
 export interface PeriodicElement {
   Name: string;
   Code: string;
   Address:string,
   TelNO: string;
   Action:string;
 }
 
 const ELEMENT_DATA: PeriodicElement[] = [
   {
     Name: 'Firstabc123',
     Code:'002',
     Address: '123 Random St',
     TelNO: '+11234567890',
     Action:'View'
 
   },
   {
    Name: 'Firstabc123',
    Code:'002',
    Address: '123 Random St',
    TelNO: '+11234567890',
    Action:'View'
   },
   {
    Name: 'Firstabc123',
    Code:'002',
    Address: '123 Random St',
    TelNO: '+11234567890',
    Action:'View'
   },
   {
    Name: 'Firstabc123',
    Code:'002',
    Address: '123 Random St',
    TelNO: '+11234567890',
    Action:'View'
   },
   {
    Name: 'Firstabc123',
    Code:'002',
    Address: '123 Random St',
    TelNO: '+11234567890',
    Action:'View'
   }
 ]