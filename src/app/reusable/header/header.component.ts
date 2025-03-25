import { Component, inject } from '@angular/core';
import { MainService } from '../../service/main.service';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router:Router){}
  mainService:MainService = inject(MainService);
  logout() {
    
    sessionStorage.removeItem('loginDto');
    this.mainService.loginDto={ lastName: '', email: '', roles: [],firstName:'',userId:'' };
    this.router.navigate(['/login']);

  }
}

