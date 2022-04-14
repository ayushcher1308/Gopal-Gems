import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../services/search.service';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-dash-panel',
  templateUrl: './dash-panel.component.html',
  styleUrls: ['./dash-panel.component.scss'],
})
export class DashPanelComponent implements OnInit {
  constructor(
    private user: UserDataService,
    private router: Router,
    private saveFiltersService: SearchService
  ) {}

  name = this.user.getUserInfo().name;
  isAdmin = this.user.getUserInfo().role == 'admin';
  avatar = `https://avatar.oxro.io/avatar.svg?name=${this.name}&background=212529&length=2`;
  searchId: any;
  type: any;
  alert: any;
  message: any;

  tiles = [
    {
      label: 'Cart',
      icon: 'fa fa-shopping-cart',
      route: '/dashboard/cart',
    },
    {
      label: 'Enquiries',
      icon: 'fa fa-question-circle',
      route: '/dashboard/enquiry',
    },
    {
      label: 'Orders',
      icon: 'fa fa-wallet',
      route: '/dashboard/orders',
    },
    {
      label: 'New Arrival',
      icon: 'fa fa-diamond',
      route: '/dashboard/home/0',
    },
    {
      label: 'Recommended',
      icon: 'fa fa-thumbs-up',
      route: '/dashboard/home/1',
    },
    {
      label: 'Wishlist',
      icon: 'fa fa-heart',
      route: '/dashboard/home/2',
    },
  ];

  ngOnInit(): void {
    var rm = document.getElementsByClassName('path');
    for (var i = 0; i < rm.length; i++) rm[i].classList.remove('active');
    var element = document.getElementsByClassName('home')[0];
    element.classList.add('active');
  }

  tileAction(route: any) {
    this.router.navigate([route]);
  }

  showAlert(typeOfNotification: boolean) {
    this.alert = true;
    this.type = typeOfNotification;
    setTimeout(() => {
      this.alert = false;
    }, 3000);
  }

  search() {
    if (
      this.searchId == undefined ||
      this.searchId == null ||
      this.searchId.length == 0
    ) {
      this.message = `Please Enter Stock ID or Certificate No.`;
      this.showAlert(false);
      return;
    }
    const search = {
      $or: [{ stockNo: this.searchId }, { certificateId: this.searchId }],
    };
    this.searchId = '';
    this.saveFiltersService.setData(search);
    this.router.navigate(['/dashboard/search-result']);
  }
}
