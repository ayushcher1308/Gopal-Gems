import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { config } from '../../config/config'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private router: Router,
     private route: ActivatedRoute,
     private dataService: DataService) {}

  ngOnInit(): void {}

  message:any;
  loading:any = false;
  loginForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    // TODO: login form hit
    this.loading = true;
    var loginData = this.loginForm.value;
    this.dataService.login(loginData).subscribe(res=>{
      if(res.success){
        if(res.data.status==config.PENDING){
          this.message = config.ACCOUNT_PENDING;
          this.showAlert();
        }
        else if(res.data.status==config.BLOCKED){
          this.message = config.ACCOUNT_BLOCKED;
          this.showAlert();
        }
        else{
          localStorage.setItem("token",res.token);
          localStorage.setItem("userId",res.data.userId)
          this.router.navigate(['/dashboard'], { relativeTo: this.route });
        }
      }
      else{
        this.message = config.INVALID_CREDENTIALS;
        this.showAlert();
      }
      this.loginForm.reset();
      this.loading = false;
    },err=>{
        console.log(err)
        this.message = config.ERROR_MSG;
        this.showAlert();
        this.loading = false;
    })
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

  redirectToSignup() {
    this.router.navigate(['/signup'], { relativeTo: this.route });
  }
}
