import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './modules/guards/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { FacturacionComponent } from './components/facturacion/facturacion.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { HistoricoComponent } from './components/historico/historico.component';
import { ContactComponent } from './components/contact/contact.component';
import { PermissionGuard } from './modules/guards/permission.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { 
        path: '', 
        component: DashboardComponent,
        canActivate: [authGuard],
        children: [
          { path: '', component: HomeComponent },
          {
            path: 'inventario',
            component: InventarioComponent,
            canActivate: [authGuard, PermissionGuard],
            data: { expectedLink: '/inventario' }
          },
          {
            path: 'administracion',
            component: AdministracionComponent,
            canActivate: [authGuard, PermissionGuard],
            data: { expectedLink: '/administracion' }
          },
          { 
            path: 'facturacion',
            component: FacturacionComponent,
            canActivate: [authGuard, PermissionGuard],
            data: { expectedLink: '/facturacion' }
          },
          { 
            path: 'reportes',
            component: ReportesComponent,
            canActivate: [authGuard, PermissionGuard],
            data: { expectedLink: '/reportes' }
          },
          { 
            path: 'historico',
            component: HistoricoComponent,
            canActivate: [authGuard, PermissionGuard],
            data: { expectedLink: '/historico' }
          },
          { 
            path: 'contact',
            component: ContactComponent 
          }
        ]
      },
      { path: '**', redirectTo: 'login' }
];
