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
  user: user = {email: '', first_names: '', last_names: '', document: '', is_admin: false, userAccess: []};

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
          this.user = response;
          
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
