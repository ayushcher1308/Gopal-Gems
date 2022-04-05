import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  @Input() message: any;
  @Input() type: boolean = true;
  @Input() show: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
