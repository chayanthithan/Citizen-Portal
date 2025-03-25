import { Component, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { LeftPanelComponent } from "../left-panel/left-panel.component";
import { RightPanelComponent } from "../right-panel/right-panel.component";
import { MainService } from '../../service/main.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    LeftPanelComponent, 
    RightPanelComponent,
    CommonModule,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  mainservice:MainService = inject(MainService);
  isNavActive = false; // Tracks whether the slide bar is open

  // this is for remove the navigation design
  ngOnInit(){
    this.mainservice.resetMenu();
    document.getElementById('home_screen')?.classList.add(...['menu__select'])
  }

  toggleNav(): void {
    this.isNavActive = !this.isNavActive; // Toggle the slide bar
  }
}
