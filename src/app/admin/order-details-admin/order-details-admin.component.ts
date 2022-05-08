import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-order-details-admin',
  templateUrl: './order-details-admin.component.html',
  styleUrls: ['./order-details-admin.component.scss'],
})
export class OrderDetailsAdminComponent implements OnInit {
  constructor(private dataService: DataService, private router: Router) {}

  ngOnInit(): void {
    this.fetchOrdersAdmin(null);
  }

  orderDetails: any = null;
  globalOrders: any;
  selectOrders: any = 'Pending';
  loader = false;
  selectedOrderDetails: any;
  selectSearchFilter: any;
  searchText: any;
  searchType = [
    {
      name: 'Company Name',
      value: 'companyName',
    },
    {
      name: 'Order ID',
      value: 'orderId',
    },
  ];

  fetchOrdersAdmin(search: any) {
    this.loader = true;
    var filter = search;
    if (filter != null) {
      filter.status = this.selectOrders;
    } else {
      filter = {
        status: this.selectOrders,
      };
    }
    this.dataService.fetchOrdersAdmin(filter).subscribe((res) => {
      this.orderDetails = res;
      this.globalOrders = res;
      this.loader = false;
    });
  }

  actionOrder(status: any, orderId: any, diamondId: any) {
    this.loader = true;
    const data = {
      status: status,
      orderId: orderId,
      diamondId: diamondId,
    };
    this.dataService.actionOrdersAdmin(data).subscribe((res) => {
      if (res.success) {
        this.selectedOrderDetails.status[diamondId] = status;
      }
      this.fetchOrdersAdmin(null);
    });
  }

  fetchSearchResult() {
    const key = this.selectSearchFilter;
    const val = this.searchText;
    if (key == 'companyName') {
      this.orderDetails = this.globalOrders.filter((data: any) => {
        return data.user.companyName.includes(val);
      });
    }

    if (key == 'orderId') {
      if(val==''){
        this.orderDetails = this.globalOrders;
        return;
      }
      this.orderDetails = this.globalOrders.filter((data: any) => {
        return data.orderId == val;
      });
    }
  }

  openModal() {
    document.getElementById('openModalButton')?.click();
  }

  closeModal() {
    document.getElementById('closeModal')?.click();
  }

  fetchOrderOnSelection() {
    this.fetchOrdersAdmin(null);
  }

  orderDetailFetch(data: any) {
    this.selectedOrderDetails = data;
    let status: any = {};
    for (let i = 0; i < data.diamondStatus.length; i++) {
      status[data.diamondStatus[i].diamond] = data.diamondStatus[i].status;
    }
    this.selectedOrderDetails.status = status;
    this.openModal();
  }

  navigateToDetail(_id: any) {
    this.closeModal();
    const path = '/dashboard/diamond-detail/' + _id;
    this.router.navigate([path]);
  }
}
