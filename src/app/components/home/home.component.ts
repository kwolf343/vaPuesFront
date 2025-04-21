import { Component } from '@angular/core';
import { AuthService } from '../../modules/auth/auth.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  imports: [ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
