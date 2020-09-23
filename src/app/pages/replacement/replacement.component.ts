import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, ParamMap } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-replacement',
  templateUrl: './replacement.component.html',
  styleUrls: ['./replacement.component.scss']
})
export class ReplacementComponent implements OnInit {

  main = 0;
  reps = [];

  v:any;

  banner:any;
  banner1:any;
  banner2:any;
  // banner3:any;

  user = JSON.parse(localStorage.getItem('modoautoUser'));

  canQualify:any = [0,0];

  myStars;
  myComments;
  video;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  }

  constructor(public activatedRoute: ActivatedRoute, public api: ApiService) {
    this.api.getBanner(1).subscribe(data=>{
      this.banner = data[0];
      this.banner1 = data[1] != undefined ? data[1] : data[0];
    })
    this.api.getBanner(2).subscribe(data=>{
      this.banner2 = data[0];
    })
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.api.getAdvert(id).subscribe((data:any)=>{
      this.v = data;

      if (data.video.length > 0) {
        this.video = data.video[0];
      }

      for (var i in data.gallery) {
        this.reps.push(data.gallery[i].file);
      }
    })
  }

  changeCar(i)
  {
    this.main = i;
  }


}
