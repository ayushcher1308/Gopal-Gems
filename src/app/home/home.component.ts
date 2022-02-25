import { Component, OnInit } from '@angular/core';
import { diamondMockData } from 'src/mock-data/diamond';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private dataService: DataService) {}

  diamondData:any;
  loader:any = false;

  ngOnInit(): void {
    var rm = document.getElementsByClassName('path');
    for (var i = 0; i < rm.length; i++) rm[i].classList.remove('active');
    var element = document.getElementsByClassName('home')[0];
    element.classList.add('active');
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
