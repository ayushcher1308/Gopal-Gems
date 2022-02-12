import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Country, State, City }  from 'country-state-city';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.countries = Country.getAllCountries();
  }

  businessType:any = ["Chain Store","E Commerce","Polished Dealer","Jewellery Manufacturer","Diamond Manufacturer","Retailer","Other"]
  countries:any ;
  states:any = [];
  cities:any = [];
  countrySelected:any;

  loginForm = new FormGroup({
    user: new FormControl('',[Validators.required]),
    password: new FormControl('',[Validators.required]),
  });

  onSubmit() {
    // TODO: login form hit
    console.log(this.loginForm.get("user"));

  }

  get user(): any {
    return this.loginForm.get('user');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  redirectToSignin(){
    this.router.navigate(['/login'], { relativeTo: this.route });
  }

  selectStatesByCountry(event:any){
    this.countrySelected = event;
    this.states = State.getStatesOfCountry(event);
    this.cities = [];
  }

  selectCitiesByState(event:any){
    this.cities = City.getCitiesOfState(this.countrySelected,event);
    console.log(this.cities)
  }

}
