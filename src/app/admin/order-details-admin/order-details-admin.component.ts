import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-order-details-admin',
  templateUrl: './order-details-admin.component.html',
  styleUrls: ['./order-details-admin.component.scss'],
})
export class OrderDetailsAdminComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchOrdersAdmin();
  }

  orderDetails: any;
  selectOrders: any = "Pending";
  loader = false;

  fetchOrdersAdmin() {
    this.loader = true;
    this.dataService.fetchOrdersAdmin(this.selectOrders).subscribe((res) => {
      this.orderDetails = res;
      this.loader = false;
    });
  }

  actionOrder(status:any,orderId:any){
    this.loader = true;
    const data = {
      status:status,
      orderId:orderId
    }
    this.dataService.actionOrdersAdmin(data).subscribe(res=>{
      this.fetchOrdersAdmin();
    })
  }

  fetchOrderOnSelection(){
    this.fetchOrdersAdmin();
  }
}
