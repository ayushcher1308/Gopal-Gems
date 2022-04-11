import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { EnquiriesComponent } from './admin/enquiries/enquiries.component';
import { OrderDetailsAdminComponent } from './admin/order-details-admin/order-details-admin.component';
import { UserComponent } from './admin/user/user.component';
import { CartComponent } from './cart/cart.component';
import { DashPanelComponent } from './dash-panel/dash-panel.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DetailComponent } from './detail/detail.component';
import { DiamondDetailsComponent } from './diamond-details/diamond-details.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchComponent } from './search/search.component';
import { AdminPanelGuard } from './services/admin-panel.guard';
import { AuthGuard } from './services/auth.guard';
import { LoginGuard } from './services/login.guard';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', pathMatch: 'prefix', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'signup', component: SignUpComponent },
  { path: 'password/:id', component: ForgotPasswordComponent },
  { path: 'diamond/:id', component: DetailComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'panel', pathMatch: 'full' },
      { path: 'panel', component: DashPanelComponent },
      { path: 'search', component: SearchComponent },
      { path: 'search-result', component: SearchResultComponent },
      { path: 'home/:id', component: HomeComponent },
      { path: 'diamond-detail/:id', component: DiamondDetailsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'enquiry', component: EnquiryComponent },
      { path: 'cart', component: CartComponent },
      {
        path: 'admin',
        component: AdminDashboardComponent,
        canActivate: [AdminPanelGuard],
        children: [
          { path: 'users', component: UserComponent },
          { path: 'orders', component: OrderDetailsAdminComponent },
          { path: 'enquiry', component: EnquiriesComponent },
        ],
      },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
