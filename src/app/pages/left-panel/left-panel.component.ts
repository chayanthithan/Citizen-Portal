import { Component, inject, OnInit } from '@angular/core';
import { MainService } from '../../service/main.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-left-panel',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    FormsModule
  ],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.css'
})
export class LeftPanelComponent implements OnInit{
  constructor(private router:Router){}
  mainservice:MainService = inject(MainService);
  
  
  ngOnInit(): void {
    
  }

  callLogout(){
    debugger
    sessionStorage.removeItem('loginDto');
    this.router.navigateByUrl('/login');
  }
}
