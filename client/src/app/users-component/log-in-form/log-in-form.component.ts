import { Component, OnInit } from '@angular/core'
import {FormBuilder, FormGroup, Validators} from '@angular/forms'
import { AuthService } from '../../_services/auth.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-log-in-form',
  templateUrl: './log-in-form.component.html',
  styleUrls: ['./log-in-form.component.css'],
})
export class LogInFormComponent implements OnInit {
  logInForm: FormGroup
  errorMessage: string = null

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.logInForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  get username() {
    return this.logInForm.get('username')
  }
  get password() {
    return this.logInForm.get('password')
  }

  onSubmit() {
    this.authService
      .logIn(this.username.value, this.password.value)
      .subscribe((respond) => {
        localStorage.setItem('token', respond['token'])
        localStorage.setItem('user', JSON.stringify(respond['user']))
        this.router.navigate(['/sets'])
      }, error => {
        this.errorMessage = error.error.message
        this.logInForm.reset()
      })
  }
}
