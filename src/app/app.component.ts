import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./pages/login/login.component";
import { RegistrationComponent } from "./pages/registration/registration.component";
import { HeaderComponent } from "./reusable/header/header.component";
import { FooterComponent } from "./reusable/footer/footer.component";
import { HomeComponent } from "./pages/home/home.component";
import { MainService } from './service/main.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,  
    HeaderComponent, 
    FooterComponent, 
    HomeComponent,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Citizen Portal';
  mainService:MainService = inject(MainService);
}
