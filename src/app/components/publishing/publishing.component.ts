import { Component, OnInit, Input } from '@angular/core';
import { HeaderService } from '../../services/header.service';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-publishing',
  templateUrl: './publishing.component.html',
  styleUrls: ['./publishing.component.scss']
})
export class PublishingComponent implements OnInit {

  data:any;
  sub1;
  perfil = false;
  loading = true;
  alreadyLoaded = false;
  loadMyAdverts = false;
  user = JSON.parse(localStorage.getItem('modoautoUser'));
  favorites;

  professional;
  category;

  isProfessional = false;

  _filters:any = {};

  @Input() set filters (val:any) {

    let filter = ()=>{

      if (val) {
        this._filters = val;
        this.data = [];

        val.criterial = 'id';
        val.type = 'asc';
        val.user_id = this.professional;
        val.user = this.user ? this.user.id : null;
        val.category_name = this.category;

        this.api.filter(val).subscribe(data=>{
          this.data = data[0];
          this.favorites = data[1];
          this.loading = false;

          this.events.publish('reloadResults',{num:this.data.length});
        });
      }
    }

    if (val !== undefined) {
      if (val.loading) {
        this.alreadyLoaded = true;
        filter();
      }
    }
    if (!this.loading) {
      filter();
    }
    if (val) {
      this.loading = true;
    }
  };

  //

  @Input() set words (val:any) {

    if (val !== undefined) {
      this.loading = true;
      this.api.loadWords({words:val,category:1,user_id:this.professional}).subscribe(data=>{
        this.loading = false;
        this.data = data;

        this.events.publish('reloadResults',{num:this.data.length});
      })
    }
  };

  //

  @Input() set insideP (val:any) {
    console.log('insideP',val);
    this.loadMyAdverts = true;
  }

  loadFilters;

  constructor(public headerService: HeaderService, public api: ApiService, public activatedRoute: ActivatedRoute, public events: EventsService) {

    let id = this.activatedRoute.snapshot.paramMap.get('id');

    let filter = this.activatedRoute.snapshot.paramMap.get('filter');

    if (filter) {
      this.loadFilters = true;
      this.loading = false;
    }

    let categoria = 'Coches';
    if (id && categoria) {
      this.professional = id;
      this.category = categoria;
    }

    this.events.destroy('orderByPublishing');
    this.events.subscribe('orderByPublishing',(data:any)=>{
      // console.log(data,this._filters);
      this._filters['criterial'] = data.criterial;
      this._filters['type'] = data.type;
      this._filters['user'] = this.user ? this.user.id : null;

      console.log(this._filters);

      if (this._filters) {
        this.api.filter(this._filters).subscribe(data=>{
          this.data = data[0];
          this.favorites = data[1];
          this.loading = false;
        });
      }else{
        this.getAdverts('Coches',false,data.criterial,data.type);
      }
    });
  }

  ngOnInit(): void {
  	this.headerService.getCurrentSection();

    this.sub1 = this.headerService.currentSection.subscribe(section => {
      console.log(section);
      if (section == 'perfil') {
        this.perfil = true;
        this.isProfessional = false;
      }else{
        if (section == 'profesionales') {
          this.isProfessional = true;
        }else{
          this.isProfessional = false;
        }
        this.perfil = false;
      }
    });

    this.sub1.unsubscribe();

    if (!this.alreadyLoaded && (!this.category && !this.professional) && !this.loadMyAdverts && !this.loadFilters) {
      this.getAdverts();
    }
    else if(this.loadMyAdverts){
      this.getMyAdverts();
    }else if(this.loadFilters){
      console.log('load filters');
    }
    else{
      this.getProfessional();
    }
  }

  getAdverts(cat = 'Coches', special = false, criterial = 'id', type = 'asc')
  {
    this.api.getAdverts(cat,special,criterial,type).subscribe((data:any)=>{
      this.data = data[0];
      this.favorites = data[1];
      this.loading = false;

      this.events.publish('reloadResults',{num:this.data.length});
    });
  }

  getMyAdverts(cat = 'Coches')
  {
    this.api.getMyAdverts(cat,this.user.id).subscribe((data:any)=>{
      this.data = data;
      this.loading = false;

      // this.events.publish('reloadResults',{num:this.data.length});
    });
  }

  getProfessional()
  {
    this.api.getProfessional({category:this.category,id:this.professional,user_id:this.user.id}).subscribe((data:any)=>{
      this.data = data[0];
      this.favorites = data[1];
      this.loading = false;

      this.events.publish('reloadResults',{num:this.data.length});
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

  imprimir(id)
  {
    window.open('https://server.betatestpro.com/ficha-completa/'+id,'_blank');
    // this.api.pdf(id).subscribe((data:any)=>{
    //   console.log(data);
    //   window.open(data.url,'_blank');
    // })
  }

  feature(id)
  {
    this.api.feature(id).subscribe(()=>{
      this.getMyAdverts();
    })
  }

  deleteAdvert(id)
  {
    this.api.deleteAdvert(id).subscribe(data=>{
      location.reload();
    })
  }

  renovar(adv)
  {
    this.api.renovar(adv);
  }

  activo()
  {
    alert('Tu anuncio se encuentra activo');
  }
  inactivo()
  {
    alert('Tu anuncio se encuentra inactivo');
  }

}
