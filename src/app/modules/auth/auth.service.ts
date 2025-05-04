import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { token } from '../../api/interfaces/token.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'jwt_token';

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
    private cookieService: CookieService
  ) { }

  login(credentials: { username: string, password: string }): Observable<boolean> {
    return this.http.post<{token: string}>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        this.setToken(response.token);
      }),
      map(() => true),
      catchError(error => {
        console.error('Login error:', error);
        return of(false);
      })
    );
  }

  logout(): void {
    this.cookieService.delete(this.tokenKey);
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  getToken(): string | null {
    return this.cookieService.get(this.tokenKey) || null;
  }

  getData(): token | null {
    const token = this.getToken();
    if (token) {
      const tkn = this.jwtHelper.decodeToken(token);
      
      return {email: tkn.email, rol: tkn.rol, web: tkn.web};
    }
    return null;
  }
  

  private setToken(token: string): void {
    const expirationDate = this.jwtHelper.getTokenExpirationDate(token);
    this.cookieService.set(
      this.tokenKey, 
      token, 
      expirationDate || undefined,
      '/'
    );
  }
}
