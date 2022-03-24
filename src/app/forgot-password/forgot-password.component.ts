import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from 'src/Validator/password';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const token = params['id'];
      this.verifyToken(token);
    });
  }

  message: any;
  loading: any = false;
  loginForm = this.fb.group(
    {
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    { validator: MustMatch('password', 'confirmPassword') }
  );
  wrongtoken = true;
  loader = true;
  userId:any;

  showAlert() {
    var x = document.getElementsByClassName('snackbar')[0];
    x.classList.add('show');
    setTimeout(function () {
      x.classList.remove('show');
    }, 3000);
  }

  verifyToken(token: any) {
    this.dataService.authenticate({ token: token }).subscribe((res) => {
      console.log(res)
      if (!res.auth) {
        this.wrongtoken = true;
        this.loader = false;
      } else {
        this.wrongtoken = false;
        this.loader = false;
        this.userId = res.user._id;
      }
    });
  }

  changePassword(){
    this.loading = true;
    var data = this.loginForm.getRawValue();
    data.id = this.userId;
    this.dataService.updatePwd(data).subscribe(res=>{
      if(res.status){
        this.router.navigate(['/login']);
      }
      else{
        this.loading = false;
        this.message = "Some error has been occured."
        this.showAlert();
      }
    })
  }

  get confirmPassword(): any {
    return this.loginForm.get('confirmPassword');
  }

  redirectToSignup() {
    this.router.navigate(['/signup'], { relativeTo: this.route });
  }
}
