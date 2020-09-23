import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

  @Input() set vehicle (v:any) {
  	this.v = v;
  }

  v:any;

  constructor() { }

  ngOnInit(): void {
  }

}
