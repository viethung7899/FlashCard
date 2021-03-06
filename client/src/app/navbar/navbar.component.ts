import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

import { AuthService } from '../_services/auth.service'

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  loggedIn() {
    return this.authService.loggedIn()
  }

  logOut() {
    this.authService.logOut()
    this.router.navigate(['/login'])
  }
}
