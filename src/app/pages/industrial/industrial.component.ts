import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-industrial',
  templateUrl: './industrial.component.html',
  styleUrls: ['./industrial.component.scss']
})
export class IndustrialComponent implements OnInit {

  main = 0;
  inds =
  ['assets/ind/ind1.jpg',
  'assets/ind/ind2.jpg',
  'assets/ind/ind3.jpg',
  'assets/ind/ind4.jpg'];

  constructor() { }

  ngOnInit(): void {
  }

  changeCar(i)
  {
  	this.main = i;
  }

}
