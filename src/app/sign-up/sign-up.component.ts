import { Component, OnInit } from '@angular/core';
import { FileUploadValidators } from '@iplab/ngx-file-upload';

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
  loading: any = false;
  showMessage: any = false;
  messageType: any = false;

  loginForm = this.fb.group(
    {
      firstName: ['', [Validators.required]],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: [''],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      contactNo: ['', [Validators.required]],
      companyName: ['', [Validators.required]],
      businessType: ['', [Validators.required]],
      country: ['', [Validators.required]],
      state: ['', [Validators.required]],
      city: [''],
      countryCode: [''],
      address: ['', [Validators.required]],
      pincode: [''],
      idProof: [
        null,
        [
          FileUploadValidators.fileSize(2000000),
          FileUploadValidators.accept(['image/*']),
          FileUploadValidators.filesLimit(1),
        ],
      ],
    },
    { validator: MustMatch('password', 'confirmPassword') }
  );

  onSubmit() {
    // TODO: login form hit
    if (this.loginForm.status == 'INVALID') {
      this.message = config.SIGNUP_FORM_REQUIRED;
      this.showAlert(false);
      return;
    }
    this.loading = true;
    var data = this.loginForm.value;
    data.contactNo = data.countryCode + ' ' + data.contactNo;
    data.name = data.firstName + ' ' + data.lastName;
    delete data.firstName;
    delete data.countryCode;
    delete data.confirmPassword;
    delete data.lastName;
    const country = Country.getCountryByCode(data.country)?.name;
    const state = State.getStateByCodeAndCountry(
      data.state,
      data.country
    )?.name;
    data.state = state;
    data.country = country;
    data.fileFormat = this.loginForm.value.idProof[0].name.split('.').pop();
    this.createNewAccount(data);
  }

  createNewAccount(data: any) {
    this.dataService.register(data).subscribe(
      (Response) => {
        // this.loading = false;
        this.uploadImage(this.loginForm.value.idProof[0], Response._id);
      },
      (error) => {
        this.loading = false;
        this.message = config.ERROR_MSG;
        this.showAlert(false);
      }
    );
  }

  uploadImage(image: any, userId: any) {
    const formData = new FormData();
    console.log(image, userId);
    var fileExt = image.name.split('.').pop();
    let info = { id: 2, name: 'raja' };
    formData.append('file', image, `${userId}.${fileExt}`);
    formData.append('extension', 'PNG');
    formData.append('id', '2');
    formData.append('tz', new Date().toISOString());
    formData.append('update', '2');
    formData.append('info', JSON.stringify(info));
    this.dataService.uploadImage(formData).subscribe((res) => {
      if (res.status) {
        this.loading = false;
        this.message = config.ACCOUNT_SUCCESS;
        this.showAlert(true);
        this.loginForm.reset();
      } else {
        this.loading = false;
      }
    });
  }

  get firstName(): any {
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

  get idProof(): any {
    return this.loginForm.get('idProof');
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

  showAlert(isSuccess: any) {
    this.messageType = isSuccess;
    this.showMessage = true;
    setTimeout(() => {
      this.showMessage = false;
    }, 3000);
  }
}
