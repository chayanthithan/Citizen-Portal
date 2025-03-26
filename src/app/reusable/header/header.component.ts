import { Component, inject } from '@angular/core';
import { MainService } from '../../service/main.service';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router, } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router:Router, private cookieService: CookieService){}
  mainService:MainService = inject(MainService);
  logout() {
    sessionStorage.clear();
    this.cookieService.deleteAll();
    this.mainService.loginDto={ lastName: '', email: '', roles: [],firstName:'',userId:'' };
    this.router.navigate(['/login']);

  }
}

