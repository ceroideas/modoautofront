import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';

import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-mcycle',
  templateUrl: './mcycle.component.html',
  styleUrls: ['./mcycle.component.scss']
})
export class McycleComponent implements OnInit {

  main = 0;
  motos = [];

  v:any;

  constructor(public activatedRoute: ActivatedRoute, public api: ApiService) { }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.api.getAdvert(id).subscribe((data:any)=>{
      this.v = data;
      for (var i in data.gallery) {
        this.motos.push(data.gallery[i].file);
      }
    })
  }

  changeCar(i)
  {
  	this.main = i;
  }

}
