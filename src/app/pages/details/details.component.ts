import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {

  main = 0;
  cars = [];

  v:any;

  banner:any;
  banner1:any;
  banner2:any;
  banner3:any;

  featured:any;

  loading = false;
  
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

  constructor(public activatedRoute: ActivatedRoute, public api: ApiService, public cdr: ChangeDetectorRef, private metaTagService: Meta) {
    this.api.getBanner(1).subscribe(data=>{
      this.banner = data[0];
      this.banner1 = data[1] != undefined ? data[1] : data[0];
    })
    this.api.getBanner(2).subscribe(data=>{
      this.banner2 = data[0];
      this.banner3 = data[1] != undefined ? data[1] : data[0];
    })

    this.getFeatured();
  }

  getFeatured()
  {
    this.api.getFeatured(1).subscribe(data=>{
      this.featured = data;
      console.log(data);
    })
  }

  imprimir()
  {
    window.open('https://server.betatestpro.com/ficha-completa/'+this.v.id,'_blank');
    // this.loading = true;
    // this.api.pdf(this.v.id).subscribe((data:any)=>{
    //   this.loading = false;
    //   console.log(data);
    //   window.open(data.url,'_blank');
    // })
  }

  ngOnInit(): void {

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    this.api.getAdvert(id).subscribe((data:any)=>{
      this.v = data;

      if (data.video.length > 0) {
        this.video = data.video[0];
      }


      for (var i in data.gallery) {
        this.cars.push(data.gallery[i].file);
      }

      this.metaTagService.addTags([
        { name: 'keywords', content: 'Angular SEO Integration, Music CRUD, Angular Universal' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'Cero Ideas' },
        // { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'og:title', content: this.v.title },
        { name: 'og:description', content: this.v.description },
        { name: 'og:image', content: this.cars[0] },
        { charset: 'UTF-8' }
      ]);

      if (this.user) {
        this.api.canQualify({
          advert_id:this.v.id,
          to_id:this.v.user_id,
          from_id:this.user.id
        }).subscribe(data=>{

          this.canQualify = data;

          this.myStars = data[1] ? data[1].stars : 0;
          this.myComments = data[1] ? data[1].comment : "";

          console.log(data);
        })
      }
    })
  }

  selectCar(v)
  {
    this.main = 0;
    this.cars = [];
    this.v = v;
    
    for (var i in v.gallery) {
      this.cars.push(v.gallery[i].file);
    }

    this.cdr.detectChanges();
  }

  changeCar(i)
  {
  	this.main = i;
  }

}
