import { Component, OnInit } from '@angular/core';
import { Country, State, City }  from 'country-state-city';
import { countryCode } from '../../json/country-code'

@Component({
  selector: 'app-enquiry',
  templateUrl: './enquiry.component.html',
  styleUrls: ['./enquiry.component.scss']
})
export class EnquiryComponent implements OnInit {

  constructor() { }

  countries:any ;
  states:any = [];
  cities:any = [];
  countrySelected:any;
  contactCode:any = countryCode.info;

  ngOnInit(): void {
    var rm  = document.getElementsByClassName("path");
    for(var i=0;i<rm.length;i++)rm[i].classList.remove("selected");
    var element = document.getElementsByClassName("enquiry")[0];
    element.classList.add("selected");
    this.countries = Country.getAllCountries();
  }

  selectStatesByCountry(event:any){
    this.countrySelected = event;
    this.states = State.getStatesOfCountry(event);
    this.cities = [];
  }

  selectCitiesByState(event:any){
    this.cities = City.getCitiesOfState(this.countrySelected,event);
  }

}
