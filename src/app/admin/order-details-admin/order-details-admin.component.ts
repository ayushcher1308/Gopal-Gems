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

  fetchOrdersAdmin() {
    this.dataService.fetchOrdersAdmin().subscribe((res) => {
      this.orderDetails = res;
    });
  }
}
