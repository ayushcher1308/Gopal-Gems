import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  login(data:any){
    return this.http.post<any>(environment.url+'users/login',data);
  }

  register(data:any){
    return this.http.post<any>(environment.url+'users/new',data);
  }

}
