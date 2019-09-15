import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { User } from '../interfaces';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient
  ) {
  }

  signUp(user: User): Observable<any> {
    return this.http.post(`${ environment.host }/api/v1/auth/signup`, user)
      .pipe(
        // tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    const message = error.error.errors[0].message;
    this.error$.next(message);
    return throwError(error);
  }
}
