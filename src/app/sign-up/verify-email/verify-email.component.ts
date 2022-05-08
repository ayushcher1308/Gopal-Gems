import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService
  ) {}
  token: any;
  wrongtoken: any;
  loader = true;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.token = params['id'];
      this.verifyToken(this.token);
    });
  }

  verifyToken(token: any) {
    this.dataService.authenticate({ token: token,isVerifyEmail:true }).subscribe((res) => {
      console.log(res);
      if (!res.auth) {
        this.wrongtoken = true;
        this.loader = false;
      } else {
        this.wrongtoken = false;
        this.loader = false;
      }
    });
  }
}
