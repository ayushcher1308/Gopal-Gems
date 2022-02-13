import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var rm  = document.getElementsByClassName("path");
    for(var i=0;i<rm.length;i++)rm[i].classList.remove("selected");
    var element = document.getElementsByClassName("orders")[0];
    element.classList.add("selected");
  }

}
