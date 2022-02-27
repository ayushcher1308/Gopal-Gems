import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Country, State, City } from 'country-state-city';
import { config } from '../../config/config';
import { MustMatch } from '../../Validator/password';
import { countryCode } from '../../json/country-code';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    this.countries = Country.getAllCountries();
  }

  businessType: any = config.BUSINESS_TYPE;
  countries: any;
  states: any = [];
  cities: any = [];
  countrySelected: any;
  message: any;
  contactCode: any = countryCode.info;
  loading:any = false;

  // loginForm = new FormGroup({
  //   firstName: new FormControl('',[Validators.required]),
  //   lastName: new FormControl(''),
  //   email: new FormControl('',[Validators.required,Validators.email]),
  //   dateOfBirth: new FormControl('',[Validators.required]),
  //   userId: new FormControl('',[Validators.required]),
  //   password: new FormControl('',[Validators.required,createPasswordStrengthValidator]),
  //   confirmPassword: new FormControl('',[Validators.required]),
  //   contactNo: new FormControl('',[Validators.required,Validators.pattern("[0-9 ]{10}")]),
  //   businessInfo: new FormGroup({
  //     companyName: new FormControl('',[Validators.required]),
  //     businessType: new FormControl('',[Validators.required]),
  //     country: new FormControl('',[Validators.required]),
  //     state: new FormControl('',[Validators.required]),
  //     city: new FormControl(''),
  //     address: new FormControl('',[Validators.required])
  //   })
  // },
  // );

  loginForm = this.fb.group(
    {
      firstName: ['', [Validators.required]],
      lastName: [''],
      email: ['',[Validators.required,Validators.email]],
      dateOfBirth: [''],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      contactNo: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      businessType: ['',[Validators.required]],
      country: ['',[Validators.required]],
      state: ['',[Validators.required]],
      city: [''],
      countryCode:[''],
      address: ['',[Validators.required]],
      pincode: ['',[Validators.required]]
    },
    { validator: MustMatch('password', 'confirmPassword') }
  );

  // passwordValidator(form:FormGroup){
  //   const password = form.get('password');
  //   const confirmPassword = form.get('confirmPassword');

  //   if(password!=confirmPassword){
  //     form.controls['confirmPassword'].setErrors({'mustMatch':true})
  //   }

  // }

  onSubmit() {
    // TODO: login form hit
    if (this.loginForm.status == 'INVALID') {
      this.message = config.SIGNUP_FORM_REQUIRED;
      this.showAlert();
      return;
    }
    this.loading = true;
    var data = this.loginForm.value;
    data.contactNo = data.countryCode+" "+data.contactNo;
    data.name = data.firstName+" "+data.lastName;
    delete data.firstName
    delete data.countryCode
    delete data.confirmPassword
    delete data.lastName
    const country = Country.getCountryByCode(data.country)?.name;
    const state = State.getStateByCodeAndCountry(data.state,data.country)?.name;
    data.state = state;
    data.country = country;
    console.log(data)
    this.createNewAccount(data);
  }

  createNewAccount(data:any){
    this.dataService.register(data).subscribe(Response=>{
      this.loading = false;
      this.loginForm.reset();
      this.message = config.ACCOUNT_SUCCESS;
      this.showAlert();
    },error=>{
      console.log(error);
      this.loading = false;
      this.message = config.ERROR_MSG;
      this.showAlert();
    })
  }

  get firstName(): any{
    return this.loginForm.get('firstName');
  }

  get emailText(): any {
    return this.loginForm.get('email');
  }

  get contactNo(): any {
    return this.loginForm.get('contactNo');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  get confirmPassword(): any {
    return this.loginForm.get('confirmPassword');
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  redirectToSignin() {
    this.router.navigate(['/login'], { relativeTo: this.route });
  }

  selectStatesByCountry(event: any) {
    this.countrySelected = event;
    this.states = State.getStatesOfCountry(event);
    this.cities = [];
  }

  selectCitiesByState(event: any) {
    this.cities = City.getCitiesOfState(this.countrySelected, event);
  }

  showAlert() {
    var x = document.getElementsByClassName('snackbar')[0];
    x.classList.add('show');
    setTimeout(function () {
      x.classList.remove('show');
    }, 3000);
  }
}
