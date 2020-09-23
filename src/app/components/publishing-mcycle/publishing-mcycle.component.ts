import { Component, OnInit, Input } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-publishing-mcycle',
  templateUrl: './publishing-mcycle.component.html',
  styleUrls: ['./publishing-mcycle.component.scss']
})
export class PublishingMcycleComponent implements OnInit {

  sub1;
  perfil = false;
  data:any;
  loading = true;
  alreadyLoaded = false;
  user = JSON.parse(localStorage.getItem('modoautoUser'));
  favorites;

  @Input() set filters (val:any) {

    let filter = ()=>{
      this.data = [];

      this.api.filter(val).subscribe(data=>{
        this.data = data;
        this.loading = false;
      });
    }

    if (val.loading) {
      this.alreadyLoaded = true;
      filter();
    }
    if (!this.loading) {
      filter();
    }
    this.loading = true;
  };

  constructor(public headerService: HeaderService, public api: ApiService) { }

  ngOnInit(): void {
  	this.headerService.getCurrentSection();

    this.sub1 = this.headerService.currentSection.subscribe(section => {
      if (section == 'perfil') {
        this.perfil = true;
      }else{
        this.perfil = false;
      }
    });

    this.sub1.unsubscribe();

    if (!this.alreadyLoaded) {
      this.getAdverts();
    }
  }

  getAdverts()
  {
    this.api.getAdverts('Motos').subscribe((data:any)=>{
      this.data = data[0];
      this.favorites = data[1];
      this.loading = false;
    });
  }

  favorite(id,event)
  {
    let removeElement = (add,remove)=>{
      let list = event.srcElement.classList;
      list.remove(remove);
      list.add(add);
    }

    if (this.user) {
      let data = {user_id:this.user.id,id:id};
      this.api.favorite(data).subscribe(data=>{
        if (data === 0) {
          removeElement('fa-heart-o','fa-heart')
        }else{
          removeElement('fa-heart','fa-heart-o')
        }
      })
    }else{
      console.log('401');
    }
  }

}
