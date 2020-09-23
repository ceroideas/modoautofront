import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  style;
  client;
  slot;
  format;

  @Input() set _client (val:any) {
	this.client = val;
  };
  @Input() set _slot (val:any) {
	this.slot = val;
  };
  @Input() set _format (val:any) {
	this.format = val;
  };
  @Input() set _style (val:any) {
	this.style = val;
  };
  constructor() {}

  ngOnInit(): void {
  }

}
