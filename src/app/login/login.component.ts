import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    user: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });

  onSubmit() {
    // TODO: login form hit
    console.log(this.loginForm.get("user"));

  }

  get user(): any {
    return this.loginForm.get('user');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  redirectToSignup(){
    this.router.navigate(['/signup'], { relativeTo: this.route });
  }
  
  

}
