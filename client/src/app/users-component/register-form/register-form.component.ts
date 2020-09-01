import { Component, OnInit } from '@angular/core'
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms'
import { Router } from '@angular/router'
import { AuthService } from '../../_services/auth.service'

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css'],
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup
  errorMessage: string = null

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        username: ['', [Validators.required, Validators.minLength(6)]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            this.patternValidator(/\d/, { hasNumber: true }),
            this.patternValidator(/[A-Z]/, { hasUpperCase: true }),
            this.patternValidator(/[a-z]/, { hasLowerCase: true }),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
      },
      {
        validators: this.passwordMatchingValidator,
      }
    )
  }

  get firstName() {
    return this.registerForm.get('firstName')
  }
  get lastName() {
    return this.registerForm.get('lastName')
  }
  get username() {
    return this.registerForm.get('username')
  }
  get password() {
    return this.registerForm.get('password')
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword')
  }

  onSubmit(): void {
    this.authService
      .register(
        this.firstName.value,
        this.lastName.value,
        this.username.value,
        this.password.value
      )
      .subscribe(
        (respond) => {
          console.log(respond)
          const token = respond['token']
          if (token) {
            localStorage.setItem('token', respond['token'])
            localStorage.setItem('user', JSON.stringify(respond['user']))
            this.router.navigate(['/sets'])
          } else {
            this.errorMessage = 'An error has occurred'
          }
        },
        (error) => {
          console.log(error)
          this.errorMessage = error.error.message
          this.username.reset()
          this.password.reset()
          this.confirmPassword.reset()
        }
      )
  }

  // Custom validators
  private patternValidator(
    regex: RegExp,
    error: ValidationErrors
  ): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } => {
      if (!control.value) {
        return null
      }
      const valid = regex.test(control.value)
      return valid ? null : error
    }
  }

  private passwordMatchingValidator(control: AbstractControl) {
    const password = control.get('password').value
    const confirmPassword = control.get('confirmPassword').value
    if (password !== confirmPassword) {
      control.get('confirmPassword').setErrors({ noMatch: true })
    }
  }
}
