import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';
import { SearchService } from '../services/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private saveFiltersService: SearchService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  diamondData: any;
  loader: any = false;
  filters:any;

  ngOnInit(): void {
    this.filters = this.saveFiltersService.getData();
    if(this.filters==null){
      this.router.navigate(['/dashboard/search'])
    }
    this.fetchDiamondList(this.filters);
  }

  fetchDiamondList(filters:any) {
    this.loader = true;
    this.dataService.searchDiamond(filters).subscribe((res) => {
      this.diamondData = res;
      for (var i = 0; i < this.diamondData.length; i++) {
        this.diamondData[i].selected = false;
      }
      this.loader = false;
    });
  }

  selectCard(index: any,_id:any) {
    this.router.navigate(['/dashboard/diamond-detail/', _id], {
      relativeTo: this.route,
    });
    // this.diamondData[index].selected = !this.diamondData[index].selected;
  }
  
}
