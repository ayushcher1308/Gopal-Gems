import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EnquiryComponent } from './enquiry/enquiry.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { SearchComponent } from './search/search.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
    { path: '', pathMatch: 'prefix', redirectTo: 'login' },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'dashboard', component: DashboardComponent,children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        {path: 'search', component: SearchComponent},
        {path: 'home', component: HomeComponent},
        {path: 'orders', component: OrdersComponent},
        {path: 'enquire', component: EnquiryComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
