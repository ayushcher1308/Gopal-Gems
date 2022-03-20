import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from '../services/data.service';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  @ViewChild('myModal') myModal:any;

  constructor(private dataService: DataService,
    private userInfo: UserDataService) { }

  orderHistory: any;
  loader: any = false;
  filters:any;

  orderDetails:any;

  ngOnInit(): void {
    var rm  = document.getElementsByClassName("path");
    for(var i=0;i<rm.length;i++)rm[i].classList.remove("active");
    var element = document.getElementsByClassName("orders")[0];
    element.classList.add("active");
    this.fetchOrders();
  }

  fetchOrders(){
    this.loader = true;
    let user = this.userInfo.getUserInfo()._id;
    this.dataService.fetchOrdersHistory(user).subscribe(res=>{
      this.orderHistory = res;
      this.loader = false;
    })
  }

  openModal(orderData:any) {
    this.orderDetails = orderData;
    document.getElementById("openModalButton")?.click();
  }

  closeModal() {
     this.myModal.nativeElement.className = 'modal hide';
  }

}
