import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { map } from 'rxjs/operators';
import { UserToken } from '../models/user-token';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private tokenSubject: BehaviorSubject<UserToken>;
  public token: Observable<UserToken>;
  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.tokenSubject = new BehaviorSubject<UserToken>(JSON.parse(localStorage.getItem('user-token')));
    this.token = this.tokenSubject.asObservable();
   }

  public get tokenValue(): UserToken {
    return this.tokenSubject.value;
  }

  login(email: string, password: string) {
    return this.http.post<UserToken>(`http://localhost:3000/users/login`, {email, password})
    .pipe(
      map(token => {
        const userToken: UserToken = token;

        localStorage.setItem('user-token', JSON.stringify(userToken));
        this.tokenSubject.next(userToken);

        return userToken;
      })
    );
  }

  logout() {
    localStorage.removeItem('user-token');
    this.tokenSubject.next(null);
    this.router.navigate(['/account/login']);
  }
}
