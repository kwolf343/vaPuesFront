import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { UsersService } from '../../api/services/users.service';
import { AuthService } from '../auth/auth.service';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {

  constructor(
    private userService: UsersService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    const expectedLink = route.data['expectedLink'];

    const data = this.authService.getData();
    if (!data?.email) {
      this.router.navigate(['/login']);
      return of(false);
    }
    return this.userService.obtenerUsuarioPorEmail(data.email).pipe(
        switchMap(user => {
            const hasAccess = user.userAccess.some(acc => acc.link === expectedLink.replace(/^\//, ''));
          console.log(hasAccess);
          if (!hasAccess) {
            this.router.navigate(['/']);
            return of(false);
          }
          return of(true);
        }),
        catchError(() => {
          this.router.navigate(['/login']);
          return of(false);
        })
      );
  }
}
