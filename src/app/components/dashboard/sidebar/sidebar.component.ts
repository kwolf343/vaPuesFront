import { Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import { MessageService } from 'primeng/api';
import { access, user } from '../../../api/interfaces/users.interface';
import { Toast } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-panel',
  standalone: true,
  imports: [
    Toast,
    ButtonModule,
    AvatarModule,
    RouterModule,
    CommonModule
  ],
  providers: [MessageService],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent implements OnChanges {
  @Input() items: access[] | undefined;
  @Input() user: user = {email: '', first_names: '', last_names: '', document: '', is_admin: false, userAccess: []};
  @Input() isAdmin: boolean = false;
  visible: boolean = false;
  userName: string = '';

  constructor(private messageService: MessageService) {}

  ngOnChanges(changes: SimpleChanges): void {
    const firstName = this.user.first_names.split(' ')[0] || '';
    const lastName = this.user.last_names.split(' ')[0] || '';
    this.userName = `${firstName} ${lastName}`;
  }

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
}
