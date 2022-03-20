import { Component, OnInit } from '@angular/core';
import { Country, State, City }  from 'country-state-city';
import { countryCode } from '../../json/country-code'
import { DataService } from '../services/data.service';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent implements OnInit {

  constructor(private dataService: DataService,
    private userInfo: UserDataService) { }

  enquiryHistory: any;
  loader: any = false;
  filters:any;

  orderDetails:any;

  ngOnInit(): void {
    var rm  = document.getElementsByClassName("path");
    for(var i=0;i<rm.length;i++)rm[i].classList.remove("active");
    var element = document.getElementsByClassName("enquiry")[0];
    element.classList.add("active");
    this.fetchOrders();
  }

  fetchOrders(){
    this.loader = true;
    let user = this.userInfo.getUserInfo()._id;
    this.dataService.fetchEnquiryItems(user).subscribe(res=>{
      this.enquiryHistory = res;
      this.loader = false;
    })
  }

}
