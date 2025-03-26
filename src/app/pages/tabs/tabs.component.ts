import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MainService } from '../../service/main.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tabs',
  standalone: true, // Marking this component as standalone
  imports: [
    RouterOutlet,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    RouterLink,
    FormsModule,
    CommonModule
  ], // Importing Material Modules
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit {
  constructor() {}
__main:MainService = inject(MainService);
  ngOnInit(): void {}
}
