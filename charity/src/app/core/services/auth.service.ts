import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/User';


const signUpUrl = 'http://localhost:3000/auth/signup';
const signInUrl= 'http://localhost:3000/auth/signin';
const profileUrl = 'http://localhost:3000/auth/profile/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: any;
 
constructor(private httpClient: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.httpClient.post('auth/signup', userData);
  }

  login(userData: any): Observable<any> {
    return this.httpClient.post('auth/signin', userData);
  }

  logout(): void {
    localStorage.clear();
  }

  getProfile(id: string): Observable<User> {
    return this.httpClient.get<User>('auth/profile' + id);
  }
 
  isAuthenticated() {
    return localStorage.getItem('currentUser') !== null;
  }

  isAdmin() {
    if (this.currentUser) {
      return this.currentUser.isAdmin
    }
    return false;
  }

  get currentUser() {
    let currentUser = JSON.parse(localStorage.getItem('currentUser')!);
   
    return currentUser;
  }
}
