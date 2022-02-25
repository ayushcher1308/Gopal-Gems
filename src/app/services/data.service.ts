import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }
  account: any;

  login(data:any){
    return this.http.post<any>(environment.url+'users/login',data);
  }

  register(data:any){
    return this.http.post<any>(environment.url+'users/new',data);
  }

  authenticate(token:any){
    return this.http.post<any>(environment.url+'users/auth',token);
  }

  logout(token:any){
    return this.http.post<any>(environment.url+'users/logout',token);
  }

  logoutAll(token:any){
    return this.http.post<any>(environment.url+'users/logoutAll',token);
  }

  fetchDiamond(){
    return this.http.get<any>(environment.url+'diamond/list')
  }

}
