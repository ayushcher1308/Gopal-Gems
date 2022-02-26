import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {

  constructor(private dataService: DataService) {}

  diamondData:any;
  loader:any = false;

  ngOnInit(): void {
    this.fetchDiamondList();
  }

  fetchDiamondList(){
    this.loader = true;
    this.dataService.fetchDiamond().subscribe(res=>{
      this.diamondData = res;
      for(var i=0;i<this.diamondData.length;i++){
        this.diamondData[i].selected = false;
      }
      this.loader = false;
    })
  }

  selectCard(index:any){
    this.diamondData[index].selected = !this.diamondData[index].selected;
  }
}
