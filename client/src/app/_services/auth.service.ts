import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { User } from '../_models/user.model'
import { map, tap } from 'rxjs/operators'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:5000/auth'
  constructor(private http: HttpClient) {}

  logIn(username, password) {
    return this.http.post(`${this.baseUrl}/login`, {
      user_name: username,
      password: password,
    })
  }

  register(firstName, lastName, username, password) {
    return this.http.post(`${this.baseUrl}/register`, {
      first_name: firstName,
      last_name: lastName,
      user_name: username,
      password: password
    })
  }

  loggedIn() {
    return localStorage.getItem('token') !== null
  }

  logOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
}
