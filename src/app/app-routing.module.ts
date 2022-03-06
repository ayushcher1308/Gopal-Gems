import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DiamondDetailsComponent } from './diamond-details/diamond-details.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './services/auth.guard';
import { LoginGuard } from './services/login.guard';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', pathMatch: 'prefix', redirectTo: 'login' },
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'signup', component: SignUpComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'search', component: SearchComponent },
      { path: 'search-result', component: SearchResultComponent },
      { path: 'home', component: HomeComponent },
      { path: 'diamond-detail/:id', component: DiamondDetailsComponent },
      { path: 'orders', component: OrdersComponent },
      { path: 'enquire', component: EnquiryComponent },
      { path: 'cart', component: CartComponent },
    ],
  },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
