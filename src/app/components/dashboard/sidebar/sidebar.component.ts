import { Component, Input} from '@angular/core';
import { MessageService } from 'primeng/api';
import { access } from '../../../api/interfaces/users.interface';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../modules/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    ButtonModule,
    AvatarModule,
    RouterModule,
    CommonModule
  ],
  providers: [MessageService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  @Input() items: access[] | undefined;
  @Input() isAdmin: boolean = false;
  visible: boolean = false;

  constructor(
    private messageService: MessageService,
    private authService: AuthService,
    private router: Router
  ) {}

  showConfirm() {
    if (!this.visible) {
      this.messageService.add({
        key: 'confirm',
        sticky: true,
        severity: 'info'
      });
      this.visible = true;
    }
  }

  onConfirm() {
    this.messageService.clear('confirm');
    this.visible = false;
  }

  onReject() {
    this.messageService.clear('confirm');
    this.visible = false;
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
