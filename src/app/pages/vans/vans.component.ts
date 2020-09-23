import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vans',
  templateUrl: './vans.component.html',
  styleUrls: ['./vans.component.scss']
})
export class VansComponent implements OnInit {

  f;

  constructor() { }

  ngOnInit(): void {
  }

  filtro(f)
  {
  	this.f = f;
  }

}
