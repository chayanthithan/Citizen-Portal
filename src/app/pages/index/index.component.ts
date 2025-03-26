import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MainService } from '../../service/main.service';

import { FormsModule } from '@angular/forms';
import { AfterViewInit, Component, ViewChild, inject, OnInit } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-index',
  imports: [FormsModule, MatTableModule, MatPaginatorModule, CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})

export class IndexComponent implements OnInit {

  mainService: MainService = inject(MainService);


  constructor(private router:Router,private toastr: ToastrService) { }

  ngOnInit() {
    this.handleAfterGoogleLogin();
    this.mainService.resetMenu();
    document.getElementById('home_screen')?.classList.add(...['menu__select']);

     this.mainService.afterLoginUser().subscribe({
      next: (response) => {
        sessionStorage.setItem('loginDto', JSON.stringify(response));
        console.log(response);

      }, error: (error) => {
        console.log(error);
      }
    })

  }

  handleAfterGoogleLogin(){
    // This service will be triggered after successful authentication
    this.mainService.afterLoginUser().subscribe({
      next: (response) => {
        console.log('Received response:', response); // Debugging
  
        if (response && response.email) {
          // Check if the response contains valid data
          sessionStorage.setItem('loginDto', JSON.stringify(response));
          this.mainService.loginDto = response;
  
          // Store roles correctly
          this.mainService.loginDto.roles.forEach((role) => {
            console.log('User role:', role); // Debugging
            this.mainService.isRole = role;
          });
  
          this.toastr.success(
            'Login Successful!',
            this.mainService.loginDto.lastName
          );
          // this.router.navigate(['/index']);
        } else {
          this.toastr.error('Login failed: No user data received');
          console.error('Error: Response is empty', response);
        }
      },
      error: (error) => {
        this.toastr.error('Login failed', error.status);
        console.error('API error:', error);
        this.router.navigate(['/login']);
      },
    });
    }



  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  enableNotificationTab(){
    this.mainService.enableNotification = !this.mainService.enableNotification;
    this.router.navigate(['/tabs'])
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
  { position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na' },
  { position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg' },
  { position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al' },
  { position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si' },
  { position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P' },
  { position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S' },
  { position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl' },
  { position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar' },
  { position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K' },
  { position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca' },
];