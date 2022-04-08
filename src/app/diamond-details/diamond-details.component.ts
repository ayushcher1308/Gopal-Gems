import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';
import { Location } from '@angular/common';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-diamond-details',
  templateUrl: './diamond-details.component.html',
  styleUrls: ['./diamond-details.component.scss'],
})
export class DiamondDetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private _location: Location,
    private userData: UserDataService
  ) { }
  id: any;
  diamondDetail: any;
  loader: boolean = true;
  selectedImage: any;
  enquireButton: any;
  enquireRemark = '';
  message: any;
  showAlert: any;
  success = false;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.fetchDiamondDetails(this.id);
    });
    this.selectedImage = 'image';
  }

  backPage() {
    this._location.back();
  }

  openModal() {
    document.getElementById('openModalButton')?.click();
  }

  closeModal() {
    document.getElementById('closeModal')?.click();
  }

  fetchDiamondDetails(id: any) {
    this.dataService.searchDiamond({ _id: id }).subscribe((res) => {
      this.diamondDetail = res[0];
      this.loader = false;
    });
  }

  FlipImage(selection: any) {
    var rm = document.getElementsByClassName('pill');
    for (var i = 0; i < rm.length; i++) rm[i].classList.remove('active');
    var element = document.getElementsByClassName(selection)[0];
    element.classList.add('active');

    this.selectedImage = selection;
  }

  enquiryComment(event: any) {
    this.enquireButton = true;
    if (event.length != 0) this.enquireButton = false;
  }

  showMessage(message: any, isSuccess: any) {
    this.message = message;
    this.success = isSuccess;
    this.showAlert = true;
    setTimeout(() => (this.showAlert = false), 3000);
  }

  enquireNow() {
    this.closeModal();
    this.loader = true;
    const enquiry = {
      user: this.userData.getUserInfo()._id,
      diamond: [this.diamondDetail._id],
      remark: this.enquireRemark,
    };
    this.enquireRemark = '';
    this.dataService.enquireStones(enquiry).subscribe(
      (res) => {
        this.message = `Enquiry Placed Successfully.`;
        this.showMessage(this.message, true);
        this.loader = false;
      },
      (err) => {
        this.message = `Please try again later.`;
        this.showMessage(this.message, false);
        this.loader = false;
      }
    );
  }

  addToCart() {
    this.loader = true;
    const cartItems = [
      {
        user: this.userData.getUserInfo()._id,
        diamond: this.diamondDetail._id,
      },
    ];
    this.dataService.addItemsToCart(cartItems).subscribe(
      (res) => {
        this.loader = false;
        this.message = res.msg;
        this.showMessage(this.message, true);
      },
      (err) => {
        this.loader = false;
        this.message = `Some error has occured or Item already in Cart.`;
        this.showMessage(this.message, false);
      }
    );
  }

  placeOrder() {
    this.loader = true;
    const order = {
      user: this.userData.getUserInfo()._id,
      diamond: [this.diamondDetail._id],
    };
    this.dataService.placeOrder(order).subscribe(
      (res) => {
        this.message = `Order Placed Successfully.`;
        this.showMessage(this.message, true);
        this.loader = false;
      },
      (err) => {
        this.message = `An error has been occured. Please try again later.`;
        this.showMessage(this.message, false);
        this.loader = false;
      }
    );
  }
}
