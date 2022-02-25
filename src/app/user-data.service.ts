import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor() {}

  private data: any;

  getUserInfo() {
    return this.data;
  }

  setUserInfo(user: any) {
    this.data = user;
  }
}
