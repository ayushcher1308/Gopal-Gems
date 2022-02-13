import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var rm  = document.getElementsByClassName("path");
    for(var i=0;i<rm.length;i++)rm[i].classList.remove("selected");
    var element = document.getElementsByClassName("search")[0];
    element.classList.add("selected");
  }

}
