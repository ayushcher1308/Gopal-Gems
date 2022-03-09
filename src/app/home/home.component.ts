import { Component, OnInit } from '@angular/core';
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
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private user: UserDataService,
    private userData: UserDataService
  ) {}

  diamondData: any;
  loader: any = false;
  message: any;
  selectedCard: any = 'New Goods';
  options: any = false;
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
    {
      name: 'Enquiry',
      icon: 'fs-4 fa fa-question-circle',
      selected: false,
    },
  ];

  ngOnInit(): void {
    var rm = document.getElementsByClassName('path');
    for (var i = 0; i < rm.length; i++) rm[i].classList.remove('active');
    var element = document.getElementsByClassName('home')[0];
    element.classList.add('active');
    this.fetchDiamondList();
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
      this.showSnackbar();
      this.loader = false;
      this.options = false;
    } else {
      this.dataService.addItemsToCart(cartItems).subscribe((res) => {
        this.loader = false;
        this.message = res.msg;
        this.options = false;
        this.showSnackbar();
      });
    }
  }

  removeItemFromFavourite() {
    this.loader = true;
    var items = [];
    for (var i = 0; i < this.diamondData.length; i++) {
      if (this.diamondData[i].selected) items.push(this.diamondData[i].FavouriteId);
    }
    if (items.length == 0) {
      this.message = `Please select any item to remove from Favourite.`;
      this.showSnackbar();
      this.loader = false;
    } else {
      this.dataService.removeItemsFromFavourite({ $in: items }).subscribe((res) => {
        this.fetchFavouriteItems();
      });
    }
  }

  fetchFavouriteItems(){
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
        'Please select atleast one diamond for adding to Favourite';
      this.showSnackbar();
      this.loader = false;
      this.options = false;
    } else {
      this.dataService.addItemsToFavourite(FavouriteItems).subscribe(
        (res) => {
          this.loader = false;
          this.message = res.msg;
          this.options = false;
          this.showSnackbar();
        },
        (err) => {
          this.loader = false;
        }
      );
    }
  }

  showSnackbar() {
    var x = document.getElementsByClassName('snackbar')[0];
    x.classList.add('show');
    setTimeout(function () {
      x.classList.remove('show');
    }, 3000);
  }

  flipcards(index: any) {
    for (var i = 0; i < this.cards.length; i++) {
      if (i != index) this.cards[i].selected = false;
      else {
        this.cards[i].selected = true;
        this.selectedCard = this.cards[i].name;
      }
    }
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
