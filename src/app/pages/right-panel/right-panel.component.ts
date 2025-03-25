import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MainService } from '../../service/main.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-right-panel',
  imports: [
    RouterOutlet,
    CommonModule,
    RouterModule
  ],
  templateUrl: './right-panel.component.html',
  styleUrl: './right-panel.component.css'
})
export class RightPanelComponent {
mainService:MainService = inject(MainService);
clickOutsideWhenSlidebarOpen(){
  debugger
  this.mainService.toggle();
}
}
