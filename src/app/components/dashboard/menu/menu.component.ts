import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { AuthService } from '../../../modules/auth/auth.service';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    ButtonModule,
    Menubar
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnChanges {
  @Input() config: boolean = false;
  items: MenuItem[] = [];
  
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}


  ngOnChanges(changes: SimpleChanges) {
    if (changes['config']) {
      this.buildMenu();
    }
  }

  private buildMenu() {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: ['/']
      },
    ];

    if (this.config) {
      this.items.push({
        label: 'Configuración',
        icon: 'pi pi-cog',
        items: [
          {
            label: 'Pagina web',
            icon: 'pi pi-bolt'
          },
          {
            label: 'Usuarios',
            icon: 'pi pi-server'
          },
          {
            label: 'Suscripción',
            icon: 'pi pi-pencil'
          }
        ]
      });
    }

    this.items.push({
      label: 'Contact',
      icon: 'pi pi-envelope',
      routerLink: ['/contact']
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
