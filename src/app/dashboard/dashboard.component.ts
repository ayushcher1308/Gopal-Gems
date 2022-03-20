import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private userInfo: UserDataService,
    private router: Router,
    private dataService: DataService
  ) {}

  user: any;
  loader: any = false;

  ngOnInit(): void {
    this.user = this.userInfo.getUserInfo();
    if(this.user==null){
      const tokenObj = {
        token: localStorage.getItem("token"),
      };
      this.dataService.authenticate(tokenObj).subscribe((data) => {
        this.user = data.user;
      });
    }
  }

  logoutUser() {
    if (confirm('Are you sure you want to logout?')){
      var tokenObj = {
        token: localStorage.getItem('token'),
      };
      this.dataService.logout(tokenObj).subscribe((res) => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      });
    }
    
  }

  logoutAll() {
    if (confirm('Are you sure you want to logout from all devices?')) {
      var tokenObj = {
        token: localStorage.getItem('token'),
      };
      this.dataService.logoutAll(tokenObj).subscribe((res) => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      });
    }
  }
}
