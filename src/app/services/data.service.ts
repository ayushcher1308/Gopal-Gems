import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UserDataService } from '../user-data.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient) {}
  account: any;

  login(data: any) {
    return this.http.post<any>(environment.url + 'users/login', data);
  }

  register(data: any) {
    return this.http.post<any>(environment.url + 'users/new', data);
  }

  authenticate(token: any) {
    return this.http.post<any>(environment.url + 'users/auth', token);
  }

  logout(token: any) {
    return this.http.post<any>(environment.url + 'users/logout', token);
  }

  logoutAll(token: any) {
    return this.http.post<any>(environment.url + 'users/logoutAll', token);
  }

  fetchDiamond() {
    return this.http.get<any>(environment.url + 'diamond/list');
  }

  searchDiamond(filters: any) {
    return this.http.post<any>(environment.url + 'diamond/search', filters);
  }

  fetchCartItems(_id: any) {
    return this.http.get<any>(environment.url + 'cart/items/' + _id);
  }

  addItemsToCart(cartItems: any) {
    return this.http.post<any>(environment.url + 'cart/add', cartItems);
  }

  removeItemsFromCart(_ids: any) {
    return this.http.post<any>(environment.url + 'cart/remove', _ids);
  }

  fetchFavouriteItems(_id: any) {
    return this.http.get<any>(environment.url + 'favourite/items/' + _id);
  }

  addItemsToFavourite(FavouriteItems: any) {
    return this.http.post<any>(
      environment.url + 'favourite/add',
      FavouriteItems
    );
  }

  removeItemsFromFavourite(_ids: any) {
    return this.http.post<any>(environment.url + 'favourite/remove', _ids);
  }

  fetchOrdersHistory(_id: any) {
    return this.http.get<any>(environment.url + 'order/users/' + _id);
  }

  placeOrder(data: any) {
    return this.http.post<any>(environment.url + 'order/add/', data);
  }

  emptyCart(_id: any) {
    return this.http.get<any>(environment.url + 'cart/empty/' + _id);
  }

  enquireStones(items: any) {
    return this.http.post<any>(environment.url + 'enquiry/add/', items);
  }

  fetchEnquiryItems(_id: any) {
    return this.http.get<any>(environment.url + 'enquiry/items/' + _id);
  }
}
