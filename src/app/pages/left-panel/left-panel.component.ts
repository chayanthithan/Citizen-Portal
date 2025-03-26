import { Component, inject, OnInit } from '@angular/core';
import { MainService } from '../../service/main.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
@Component({
  selector: 'app-left-panel',
  imports: [CommonModule, RouterLink, RouterLinkActive, FormsModule],
  templateUrl: './left-panel.component.html',
  styleUrl: './left-panel.component.css',
})
export class LeftPanelComponent implements OnInit {
  constructor(private router: Router, private cookieService: CookieService) {}
  mainservice: MainService = inject(MainService);

  ngOnInit(): void {}

  callLogout() {
    sessionStorage.clear();
    this.cookieService.deleteAll();
    this.router.navigateByUrl('/login');
    window.location.reload();
  }
}
