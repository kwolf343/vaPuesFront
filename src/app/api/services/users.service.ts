import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { user } from '../interfaces/users.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {}

  obtenerUsuarioPorEmail(email: string): Observable<user> {
		return this.http
			.get<user>(`${environment.apiUrl}/users/email/${email}`)
			.pipe(
				catchError((error) => {
					return throwError(() => error);
				})
			);
	}
}
