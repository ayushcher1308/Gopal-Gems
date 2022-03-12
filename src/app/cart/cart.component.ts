import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private userData: UserDataService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  diamondData: any = [];
  loader: any = true;
  message: any = '';

  ngOnInit(): void {
    var rm = document.getElementsByClassName('path');
    for (var i = 0; i < rm.length; i++) rm[i].classList.remove('active');
    var element = document.getElementsByClassName('cart')[0];
    element.classList.add('active');
    this.fetchCartItems();
  }

  placeOrder() {
    this.loader = true;
    var items = [];
    for (var i = 0; i < this.diamondData.length; i++) {
      items.push(this.diamondData[i]._id);
    }
    const order = {
      user:this.userData.getUserInfo()._id,
      diamond:items
    }
    this.dataService.placeOrder(order).subscribe((res) => {
      this.message = `Order Placed Successfully.`;
      this.emptyCart();
      this.showSnackbar();
      this.loader = false;
    },(err)=>{
      this.message = `Please try again later.`;
      this.showSnackbar();
      this.loader = false;
    });
  }

  emptyCart(){
    this.loader = true;
    let _id = this.userData.getUserInfo()._id;
    this.dataService.emptyCart(_id).subscribe(res=>{
      this.diamondData = [];
      this.loader = false;
    })
  }

  fetchCartItems() {
    this.diamondData = [];
    let _id = this.userData.getUserInfo()._id;
    this.dataService.fetchCartItems(_id).subscribe((res) => {
      for (var i = 0; i < res.length; i++) {
        this.diamondData.push(res[i].diamond);
      }
      for (var i = 0; i < this.diamondData.length; i++) {
        this.diamondData[i].selected = false;
        this.diamondData[i].cartId = res[i]._id;
      }
      this.loader = false;
    });
  }

  selectCard(event: any, index: any) {
    event.stopPropagation();
    this.diamondData[index].selected = !this.diamondData[index].selected;
  }

  removeItemFromCart() {
    this.loader = true;
    var items = [];
    for (var i = 0; i < this.diamondData.length; i++) {
      if (this.diamondData[i].selected) items.push(this.diamondData[i].cartId);
    }
    if (items.length == 0) {
      this.message = `Please select any item to remove from Cart.`;
      this.showSnackbar();
      this.loader = false;
    } else {
      this.dataService.removeItemsFromCart({ $in: items }).subscribe((res) => {
        this.fetchCartItems();
      });
    }
  }

  fetchCardDetails(event: any, _id: any) {
    event.stopPropagation();
    this.router.navigate(['/dashboard/diamond-detail/', _id], {
      relativeTo: this.route,
    });
  }

  showSnackbar() {
    var x = document.getElementsByClassName('snackbar')[0];
    x.classList.add('show');
    setTimeout(function () {
      x.classList.remove('show');
    }, 3000);
  }
}
