import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { OPTIONS,authFieldsErrors } from 'src/app/core/helpers/constants.helper';
import { UserService } from 'src/app/core/services/user-service.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(OPTIONS.emailPattern),
    ]),
    password: new FormControl('', [Validators.required])
  });
  loading = false;
  submitted = false;
  passwordType = 'password';
  showEye: boolean = false;
  displayMessage: any = null;
  isRememberMe: boolean = false;
  selectedLang: string | null = '';
  errorMessages = authFieldsErrors;
  userData: any;
  constructor(
    private router: Router,
    private userService: UserService,

  ) {
  }

  ngOnInit() {
    let token = localStorage.getItem('jwtToken') ;
    if (token) {
      this.router.navigate(['dashboard']);
    }
  }

  get form() {
    return this.loginForm.controls;
  }
  /**
   * hide and unhide passowrd
   */
  onClickEye() {
    if (this.passwordType === 'password') {
      this.passwordType = 'text';
      this.showEye = true;
    } else {
      this.passwordType = 'password';
      this.showEye = false;
    }
  }

  /**
   * on click submit button API for login
   */
  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.displayMessage = null;
    this.userService.login(this.loginForm.value).subscribe({
      next: (user) => {
        this.userData = user
        if(user.access_token) {
          this.loading = false
          this.navigate();
          return
        }
        this.router.navigate(['/otp'])

      },
      error: (error) => {
        this.loading = false;
        this.displayMessage = error;
      },
    });
  }

  /**
   * navigate to dashboard
   */
  navigate() {
    this.router.navigate(['/dashboard']);
  }
}
