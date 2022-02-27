import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor() {}

  private data: any = null;

  getData() {
    return this.data;
  }

  setData(filters: any) {
    this.data = filters;
  }
}
