import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-tabs',
  standalone: true, // Marking this component as standalone
  imports: [
    RouterOutlet,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    RouterLink,
  ], // Importing Material Modules
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css'],
})
export class TabsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
