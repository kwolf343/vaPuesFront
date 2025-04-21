import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './modules/auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { 
        path: '', 
        component: HomeComponent,
        canActivate: [authGuard],
        children: [
          { path: 'dashboard', component: DashboardComponent }
        ]
      },
      { path: '**', redirectTo: 'login' }
];
