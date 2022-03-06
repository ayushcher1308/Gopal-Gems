import { Injectable } from '@angular/core';
import { DataService } from './services/data.service';

@Injectable({
  providedIn: 'root',
})
export class UserDataService {
  constructor(private dataService: DataService) {}

  private data: any = null;

  getUserInfo() {
    return this.data;
  }

  setUserInfo(user: any) {
    this.data = user;
  }

  // async fetchUserInfo(){
  //   await this.dataService.authenticate()
  // }
}
