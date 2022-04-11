import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-enquiries',
  templateUrl: './enquiries.component.html',
  styleUrls: ['./enquiries.component.scss'],
})
export class EnquiriesComponent implements OnInit {
  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.fetchenquirysAdmin();
  }

  enquiryDetails: any;
  selectenquirys: any = 'Pending';
  loader = false;

  fetchenquirysAdmin() {
    this.loader = true;
    this.dataService
      .fetchenquirysAdmin(this.selectenquirys)
      .subscribe((res) => {
        this.enquiryDetails = res;
        this.loader = false;
      });
  }

  actionenquiry(status: any, enquiryId: any) {
    this.loader = true;
    const data = {
      status: status,
      enquiryId: enquiryId,
    };
    this.dataService.actionenquirysAdmin(data).subscribe((res) => {
      this.fetchenquirysAdmin();
    });
  }

  fetchenquiryOnSelection() {
    this.fetchenquirysAdmin();
  }
}
