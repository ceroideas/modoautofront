import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Select2Option, Select2Group } from "ng-select2-component";

import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { ThousandsPipe } from '../../pipes/thousands.pipe';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-filter-replacements',
  templateUrl: './filter-replacements.component.html',
  styleUrls: ['./filter-replacements.component.scss'],
  providers: [ThousandsPipe]
})
export class FilterReplacementsComponent implements OnInit {

  provinces:Select2Group[];
  prices_:Select2Group[];
  value = "";

  price:{from:any,to:any} = {from:null,to:null};

  province;

  pricesList = [];

  lodash = false;

  rep_type;

  results = 0;

  actualFilter;

  user = JSON.parse(localStorage.getItem('modoautoUser'));

  @Output('propagar')
  propagar:EventEmitter<any> = new EventEmitter<any>();

  @Input() set words1 (val:any) {
    if (val !== undefined) {
      // code...
      this.lodash = true;
      this.deleteFilter();

      setTimeout(()=>{
        this.lodash = false;
      },100)
    }
  };

  filters;

  constructor(public api: ApiService, public thousands: ThousandsPipe, public events: EventsService, public activatedRoute: ActivatedRoute) {

    this.api.loadProvinces().subscribe(data=>{

      let prov = [];

        prov.push({label:"Todas las provincias",value:null});
      for (var i in data) {
        prov.push({label:data[i].title,value:data[i].title});
      }

      this.provinces = [{
        label: "Provincias",
        options: prov
      }]

      if (this.filters) {
        this.province = this.filters.province;
      }
    })

    this.provinces = [{
      label: "Provincias",
      options: []
    }]

    for (let i = 50;i <= 500;i+=50) {
      this.pricesList.push({label:thousands.transform(i)+'€',value:i});
    }
    // this.pricesList.push({label:this.thousands.transform(30000)+'€',value:30000});
    // this.pricesList.push({label:this.thousands.transform(35000)+'€',value:35000});
    // this.pricesList.push({label:this.thousands.transform(40000)+'€',value:40000});
    // this.pricesList.push({label:this.thousands.transform(45000)+'€',value:45000});
    // this.pricesList.push({label:this.thousands.transform(50000)+'€',value:50000});
    // this.pricesList.push({label:this.thousands.transform(55000)+'€',value:55000});
    // this.pricesList.push({label:this.thousands.transform(60000)+'€',value:60000});
    // this.pricesList.push({label:this.thousands.transform(65000)+'€',value:65000});
    // this.pricesList.push({label:this.thousands.transform(70000)+'€',value:70000});

    this.prices_ = [{
      label: "Precios", options: this.pricesList
    }]

    this.events.destroy('reloadResults');

    this.events.subscribe('reloadResults',(data:any)=>{
      console.log(data.num);
      this.results = data.num;
    });
  }

  ngOnInit(): void {

    let filter = this.activatedRoute.snapshot.paramMap.get('filter');

    if (filter) {
      this.filters = JSON.parse(localStorage.getItem('previousFilter'));

      setTimeout(()=>{
        this.propagar.emit(this.filters);
        this.events.publish('restoreOrder');
      });
    }

    if (this.filters) {
      this.loadFilter();
    }
  }

  update(e)
  {
    console.log(e);
  }

  saveFilter()
  {
    if (!this.user) {
      return alert('Debes estár registrado para guardar la búsqueda');
    }

    this.api.saveSearch({user_id:this.user.id,category_id:11,filters:JSON.stringify(this.actualFilter)}).subscribe(data=>{
      alert('Tu búsqueda ha sido guardada correctamente! Puedes verla desde tu perfil...');
    })
  }

  filter()
  {
    if (this.lodash) {return false;}
    let filters = [
      {input_name: 'estado_del_repuesto', value: this.rep_type}
    ];
    let data = {
      category:11,
      features:filters,
      price:this.price,
      province:this.province,
    };

    this.actualFilter = data;

    this.propagar.emit(data);

    this.events.publish('restoreOrder');
  }

  loadFilter()
  {
    let filter = this.filters;

    let features = filter['features'];

    this.rep_type = features.find(x => x.input_name == 'estado_del_repuesto').value;
    this.price = this.filters.price;
    this.province = this.filters.province;
  }

  deleteFilter()
  {
    this.rep_type = null;
    this.price = {from:null,to:null};
    this.province = null;

    this.filter();
  }

}
