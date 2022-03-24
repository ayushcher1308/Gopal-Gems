import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { config } from '../../config/config';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private userInfo: UserDataService
  ) {}

  ngOnInit(): void {}

  message: any;
  loading: any = false;
  loginForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  passwordReset = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  page = true;
  emailID = '';

  onSubmit() {
    // TODO: login form hit
    this.loading = true;
    var loginData = this.loginForm.value;
    this.dataService.login(loginData).subscribe(
      (res) => {
        if (res.success) {
          if (res.data.status == config.PENDING) {
            this.message = config.ACCOUNT_PENDING;
            this.showAlert();
          } else if (res.data.status == config.BLOCKED) {
            this.message = config.ACCOUNT_BLOCKED;
            this.showAlert();
          } else {
            localStorage.setItem('token', res.token);
            this.userInfo.setUserInfo(res.data);
            this.router.navigate(['/dashboard'], { relativeTo: this.route });
          }
        } else {
          this.message = config.INVALID_CREDENTIALS;
          this.showAlert();
        }
        this.loginForm.reset();
        this.loading = false;
      },
      (err) => {
        console.log(err);
        this.message = config.ERROR_MSG;
        this.showAlert();
        this.loading = false;
      }
    );
  }

  showAlert() {
    var x = document.getElementsByClassName('snackbar')[0];
    x.classList.add('show');
    setTimeout(function () {
      x.classList.remove('show');
    }, 3000);
  }

  get user(): any {
    return this.loginForm.get('user');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  checkEmail() {
    this.loading = true;
    if (this.passwordReset.status == 'INVALID') {
      this.message = 'Please Enter Valid Email ID';
      this.showAlert();
      this.loading = false;
    }
    this.dataService
      .resetPassword(this.passwordReset.getRawValue())
      .subscribe((res) => {
        if (!res.success) {
          this.message = res.message;
          this.showAlert();
          this.loading = false;
        } else {
          this.passwordReset.reset();
          this.message = 'Please check your email for password reset.';
          this.showAlert();
          this.loading = false;
        }
      });
  }

  flipPage(value: any) {
    this.page = value;
  }

  redirectToSignup() {
    this.router.navigate(['/signup'], { relativeTo: this.route });
  }
}
