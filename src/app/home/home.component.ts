import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var rm  = document.getElementsByClassName("path");
    for(var i=0;i<rm.length;i++)rm[i].classList.remove("selected");
    var element = document.getElementsByClassName("home")[0];
    element.classList.add("selected");

  }

}
