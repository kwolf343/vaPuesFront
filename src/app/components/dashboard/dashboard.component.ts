import { Component } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { UsersService } from '../../api/services/users.service';
import { AuthService } from '../../modules/auth/auth.service';
import { access, user } from '../../api/interfaces/users.interface';

@Component({
  selector: 'app-dashboard',
  imports: [MenuComponent, SidebarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  items: access[] = [];
  config: boolean = false;
  user: string = '';
  
  constructor(
      private usersService: UsersService,
      private authService: AuthService
  ) {}

  ngOnInit() {
    const tokenData = this.authService.getData();
    const mail = tokenData?.email ?? '';
    this.usersService.obtenerUsuarioPorEmail(mail).subscribe({
      next: (response) => {
          let list: access[] = response.userAccess;
          const firstName = response.first_names.split(' ')[0] || '';
          const lastName = response.last_names.split(' ')[0] || '';
          this.user = firstName + ' ' + lastName;
          
          const index = list.findIndex(item => item.access === 'Configuración');
          if (index !== -1) {
            list.splice(index, 1);
            this.config = true;
          } else {
            this.config = false;
          }
          this.items = list;
      },
      error: (error) => {
          console.error('Error fetching users:', error);
      }
    });
  }
}
