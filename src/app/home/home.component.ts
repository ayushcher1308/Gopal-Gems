import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ValueCache } from 'ag-grid-community';
import { diamondMockData } from 'src/mock-data/diamond';
import { DataService } from '../services/data.service';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('myModal') myModal: any;
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private user: UserDataService,
    private userData: UserDataService
  ) {}

  diamondData: any;
  enquireButton: boolean = true;
  loader: any = false;
  message: any;
  enquireRemark: any;
  selectedCard: any = 'New Goods';
  options: any = false;
  i: any;
  alert = false;
  type: any;
  cards = [
    {
      name: 'New Goods',
      icon: 'fs-4 fa fa-diamond',
      selected: true,
    },
    {
      name: 'Recommended',
      icon: 'fs-4 fa fa-thumbs-up',
      selected: false,
    },
    {
      name: 'Favourite',
      icon: 'fs-4 fa fa-heart-o',
      selected: false,
    },
    // {
    //   name: 'Enquiry',
    //   icon: 'fs-4 fa fa-question-circle',
    //   selected: false,
    // },
  ];

  ngOnInit(): void {
    var rm = document.getElementsByClassName('path');
    for (var i = 0; i < rm.length; i++) rm[i].classList.remove('active');
    var element = document.getElementsByClassName('home')[0];
    element.classList.add('active');
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.i = id;
      this.flipcards(id);
    });
    // this.fetchDiamondList();
  }

  fetchDiamondList() {
    this.loader = true;
    this.dataService.fetchDiamond().subscribe((res) => {
      this.diamondData = res;
      for (var i = 0; i < this.diamondData.length; i++) {
        this.diamondData[i].selected = false;
      }
      this.loader = false;
    });
  }

  selectCard(event: any, index: any) {
    event.stopPropagation();
    this.diamondData[index].selected = !this.diamondData[index].selected;
  }

  fetchCardDetails(event: any, _id: any) {
    event.stopPropagation();
    this.router.navigate(['/dashboard/diamond-detail/', _id], {
      relativeTo: this.route,
    });
  }

  addToCart() {
    this.loader = true;
    let user = this.user.getUserInfo()._id;
    let cartItems: any = [];
    for (var i = 0; i < this.diamondData.length; i++) {
      if (this.diamondData[i].selected) {
        this.diamondData[i].selected = false;
        cartItems.push({ user: user, diamond: this.diamondData[i]._id });
      }
    }
    if (cartItems.length == 0) {
      this.message = 'Please select atleast one diamond for adding to cart';
      this.showSnackbar(false);
      this.loader = false;
      this.options = false;
    } else {
      this.dataService.addItemsToCart(cartItems).subscribe((res) => {
        this.loader = false;
        this.message = res.msg;
        this.options = false;
        this.showSnackbar(true);
      });
    }
  }

  removeItemFromFavourite() {
    this.loader = true;
    var items = [];
    for (var i = 0; i < this.diamondData.length; i++) {
      if (this.diamondData[i].selected)
        items.push(this.diamondData[i].FavouriteId);
    }
    if (items.length == 0) {
      this.message = `Please select any item to remove from Favourite.`;
      this.showSnackbar(false);
      this.loader = false;
    } else {
      this.dataService
        .removeItemsFromFavourite({ $in: items })
        .subscribe((res) => {
          this.fetchFavouriteItems();
        });
    }
  }

  fetchFavouriteItems() {
    let _id = this.userData.getUserInfo()._id;
    this.dataService.fetchFavouriteItems(_id).subscribe((res) => {
      this.diamondData = [];
      for (var i = 0; i < res.length; i++) {
        this.diamondData.push(res[i].diamond);
      }
      for (var i = 0; i < this.diamondData.length; i++) {
        this.diamondData[i].selected = false;
        this.diamondData[i].FavouriteId = res[i]._id;
      }
      this.loader = false;
      this.options = false;
    });
  }

  addToFavourite() {
    this.loader = true;
    let user = this.user.getUserInfo()._id;
    let FavouriteItems: any = [];
    for (var i = 0; i < this.diamondData.length; i++) {
      if (this.diamondData[i].selected) {
        this.diamondData[i].selected = false;
        FavouriteItems.push({ user: user, diamond: this.diamondData[i]._id });
      }
    }
    if (FavouriteItems.length == 0) {
      this.message =
        'Please select atleast one diamond for adding to Wishlist';
      this.showSnackbar(false);
      this.loader = false;
      this.options = false;
    } else {
      this.dataService.addItemsToFavourite(FavouriteItems).subscribe(
        (res) => {
          this.loader = false;
          this.message = res.msg;
          this.options = false;
          this.showSnackbar(true);
        },
        (err) => {
          this.message = err.msg;
          this.loader = false;
          this.options = false;
          this.showSnackbar(false);
        }
      );
    }
  }

  openModal() {
    this.options = false;
    var items = [];
    for (var i = 0; i < this.diamondData.length; i++) {
      if (this.diamondData[i].selected) {
        items.push(this.diamondData[i]._id);
      }
    }
    if (items.length == 0) {
      this.message = 'Please select atleast one diamond for Enquiry';
      this.showSnackbar(false);
      this.loader = false;
      return;
    }
    document.getElementById('openModalButton')?.click();
  }

  closeModal() {
    document.getElementById('closeModal')?.click();
  }

  enquiryComment(event: any) {
    this.enquireButton = true;
    if (event.length != 0) this.enquireButton = false;
  }

  enquireNow() {
    this.closeModal();
    this.loader = true;
    var items = [];
    for (var i = 0; i < this.diamondData.length; i++) {
      if (this.diamondData[i].selected) {
        this.diamondData[i].selected = false;
        items.push(this.diamondData[i]._id);
      }
    }
    const enquiry = {
      user: this.userData.getUserInfo()._id,
      diamond: items,
      remark: this.enquireRemark,
    };
    this.enquireRemark = '';
    this.dataService.enquireStones(enquiry).subscribe(
      (res) => {
        this.message = `Enquiry Placed Successfully.`;
        this.showSnackbar(true);
        this.loader = false;
      },
      (err) => {
        this.message = `Please try again later.`;
        this.showSnackbar(true);
        this.loader = false;
      }
    );
  }

  showSnackbar(typeOfNotification: any) {
    this.alert = true;
    this.type = typeOfNotification;
    setTimeout(() => {
      // x.classList.remove('show');
      this.alert = false;
    }, 3000);
  }

  flipcards(index: any) {
    // for (var i = 0; i < this.cards.length; i++) {
    //   if (i != index) this.cards[i].selected = false;
    //   else {
    //     this.cards[i].selected = true;
    //     this.selectedCard = this.cards[i].name;
    //   }
    // }
    if (index == 0) {
      this.fetchDiamondList();
    }

    if (index == 1) {
      this.loader = true;
      this.dataService.fetchDiamond().subscribe((res) => {
        this.diamondData = res;
        this.diamondData = this.diamondData.filter(function (val: any) {
          return val.addToRecommendation;
        });
        for (var i = 0; i < this.diamondData.length; i++) {
          this.diamondData[i].selected = false;
        }
        this.loader = false;
      });
    }

    if (index == 2) {
      this.loader = true;
      this.fetchFavouriteItems();
    }
  }
}
