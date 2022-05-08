import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SearchComponent } from './search/search.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { OrdersComponent } from './orders/orders.component';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import { SearchResultComponent } from './search-result/search-result.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { DiamondDetailsComponent } from './diamond-details/diamond-details.component';
import { CartComponent } from './cart/cart.component';
import { FooterComponent } from './footer/footer.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AlertComponent } from './alert/alert.component';
import { DetailComponent } from './detail/detail.component';
import { UserComponent } from './admin/user/user.component';
import { OrderDetailsAdminComponent } from './admin/order-details-admin/order-details-admin.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { DashPanelComponent } from './dash-panel/dash-panel.component';
import { BackButtonComponent } from './back-button/back-button.component';
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { EnquiriesComponent } from './admin/enquiries/enquiries.component';
import { VerifyEmailComponent } from './sign-up/verify-email/verify-email.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    SearchComponent,
    DashboardComponent,
    HomeComponent,
    EnquiryComponent,
    OrdersComponent,
    SearchResultComponent,
    DiamondDetailsComponent,
    CartComponent,
    FooterComponent,
    ForgotPasswordComponent,
    AlertComponent,
    DetailComponent,
    UserComponent,
    OrderDetailsAdminComponent,
    AdminDashboardComponent,
    DashPanelComponent,
    BackButtonComponent,
    EnquiriesComponent,
    VerifyEmailComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    FileUploadModule,
    BrowserAnimationsModule,
    AgGridModule.withComponents([]),
  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
