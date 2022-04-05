import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
  ) {}
  id: any;
  diamondDetail: any;
  selectedImage: any;
  loader = false;

  ngOnInit(): void {
    this.loader = true;
    this.route.params.subscribe((params) => {
      this.id = params['id'];
      this.fetchDiamondDetails(this.id);
    });
    this.selectedImage = 'image';
  }

  fetchDiamondDetails(id: any) {
    this.dataService.searchDiamond({ _id: id }).subscribe((res) => {
      this.diamondDetail = res[0];
      this.loader = false;
    });
  }

  FlipImage(selection: any) {
    var rm = document.getElementsByClassName('pill');
    for (var i = 0; i < rm.length; i++) rm[i].classList.remove('active');
    var element = document.getElementsByClassName(selection)[0];
    element.classList.add('active');

    this.selectedImage = selection;
  }
}
