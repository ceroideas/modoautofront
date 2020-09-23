import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

import { Select2Option, Select2Group } from "ng-select2-component";

import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../services/api.service';
import { ThousandsPipe } from '../../pipes/thousands.pipe';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  providers: [ThousandsPipe]
})
export class FiltersComponent implements OnInit {

  provinces:Select2Group[];
  //
  brands:Select2Group[];
  models:Select2Group[];
  versions:Select2Group[];

  // bodyworks:Select2Group[];
  // years:Select2Group[];
  fuels:Select2Group[];
  //
  gearboxes:Select2Group[];
  colors:Select2Group[];
  trims:Select2Group[];
  //
  // capacities:Select2Group[];

  places:Select2Group[];
  doors:Select2Group[];

  prices_:Select2Group[];
  years_:Select2Group[];
  kilometers_:Select2Group[];
  power_:Select2Group[];


  value = "";

  allBrands = [];
  allModels = [];
  allVersions = [];
  allBodyworks = [];
  allTrims = [];

/**/

  province = null;
  brand:any = [];
  model = null;
  version = null;
  price:{from:any,to:any} = {from:null,to:null};

  years:{from:any,to:any} = {from:null,to:null};

  kilometers:{from:any,to:any} = {from:null,to:null};

  fuel = null;
  capacity:{from:any,to:any} = {from:null,to:null};
  bodywork:any = [];

  gearbox = null;
  power:{from:any,to:any} = {from:null,to:null};

  color = null;
  place = null;
  door = null;

  status:any = [];
  seller:any = [];

  guarantee = null;
  iva = null;
  price_type = null;

  /**/

  pricesList:any = [];
  yearsList:any = [];
  kilometersList:any = [];
  powerList:any = [];
  lodash = false;

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

    this.events.destroy('reloadResults');

    this.events.subscribe('reloadResults',(data:any)=>{
      console.log(data.num);
      this.results = data.num;
    });

    for (let i = 1000;i <= 25000;i+=1000) {
      this.pricesList.push({label:thousands.transform(i)+'€',value:i});
    }
    this.pricesList.push({label:this.thousands.transform(30000)+'€',value:30000});
    this.pricesList.push({label:this.thousands.transform(35000)+'€',value:35000});
    this.pricesList.push({label:this.thousands.transform(40000)+'€',value:40000});
    this.pricesList.push({label:this.thousands.transform(45000)+'€',value:45000});
    this.pricesList.push({label:this.thousands.transform(50000)+'€',value:50000});
    this.pricesList.push({label:this.thousands.transform(55000)+'€',value:55000});
    this.pricesList.push({label:this.thousands.transform(60000)+'€',value:60000});
    this.pricesList.push({label:this.thousands.transform(65000)+'€',value:65000});
    this.pricesList.push({label:this.thousands.transform(70000)+'€',value:70000});

    for (let i = 2020;i >= 1970;i--) {
      this.yearsList.push({label:i,value:i});
    }

    this.kilometersList.push({label:this.thousands.transform(2500)+'Km',value:2500});
    this.kilometersList.push({label:this.thousands.transform(5000)+'Km',value:5000});
    this.kilometersList.push({label:this.thousands.transform(10000)+'Km',value:10000});
    this.kilometersList.push({label:this.thousands.transform(15000)+'Km',value:15000});
    this.kilometersList.push({label:this.thousands.transform(20000)+'Km',value:20000});
    this.kilometersList.push({label:this.thousands.transform(25000)+'Km',value:25000});
    this.kilometersList.push({label:this.thousands.transform(30000)+'Km',value:30000});
    this.kilometersList.push({label:this.thousands.transform(35000)+'Km',value:35000});
    this.kilometersList.push({label:this.thousands.transform(40000)+'Km',value:40000});
    this.kilometersList.push({label:this.thousands.transform(45000)+'Km',value:45000});
    this.kilometersList.push({label:this.thousands.transform(50000)+'Km',value:50000});
    this.kilometersList.push({label:this.thousands.transform(60000)+'Km',value:60000});
    this.kilometersList.push({label:this.thousands.transform(70000)+'Km',value:70000});
    this.kilometersList.push({label:this.thousands.transform(80000)+'Km',value:80000});
    this.kilometersList.push({label:this.thousands.transform(90000)+'Km',value:90000});
    this.kilometersList.push({label:this.thousands.transform(100000)+'Km',value:100000});
    this.kilometersList.push({label:this.thousands.transform(120000)+'Km',value:120000});
    this.kilometersList.push({label:this.thousands.transform(140000)+'Km',value:140000});
    this.kilometersList.push({label:this.thousands.transform(160000)+'Km',value:160000});
    this.kilometersList.push({label:this.thousands.transform(180000)+'Km',value:180000});
    this.kilometersList.push({label:this.thousands.transform(200000)+'Km',value:200000});

    for (let i = 50;i <= 200;i+=10) {
      this.powerList.push({label:this.thousands.transform(i),value:i});
    }
    for (let i = 250;i <= 500;i+=50) {
      this.powerList.push({label:this.thousands.transform(i),value:i});
    }

    this.prices_ = [{
      label: "Precios", options: this.pricesList
    }]
    this.years_ = [{
      label: "Años", options: this.yearsList
    }]
    this.kilometers_ = [{
      label: "Kilometros", options: this.kilometersList
    }]
    this.power_ = [{
      label: "Potencia", options: this.powerList
    }]
    this.brands = [{
      label: "<i class='fa fa-check'></i> Marca",
      options: []
    }]
    this.models = [{
      label: "Modelos",
      options: []
    }]
    this.versions = [{
      label: "Versiones",
      options: []
    }]
    this.fuels = [{
      label: "Combustible",
      options: []
    }]
    this.provinces = [{
      label: "Provincias",
      options: []
    }]
    // this.capacities = [{
    //   label: "Capacidad de maletero",
    //   options: []
    // }]
    this.gearboxes = [{
      label: "Caja de cambios",
      options: [{value:"Manual",label:"Manual"},{value:"Automática",label:"Automática"}]
    }]
    this.places = [{
      label: "Nº de Plazas",
      options: [{value:"2",label:"2"},{value:"3",label:"3"},{value:"4",label:"4"},{value:"5",label:"5"},{value:"6",label:"6"},{value:"7+",label:"7+"}]
    }]
    this.doors = [{
      label: "Número de puertas",
      options: [{value:"2",label:"2"},{value:"3",label:"3"},{value:"4",label:"4"},{value:"6",label:"6"}]
    }]
    this.colors = [{
      label: "Colores",
      options: []
    }]

    this.events.subscribe('orderByPublishing',(data:any)=>{
      // this.lodash = true;
      // this.deleteFilter();
      // setTimeout(()=>{
      //   this.lodash = false;
      // },100);
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

    this.api.getFeatures('Coches').subscribe((data:any)=>{
      console.log(data);
      data = data[1];

      let _color = data.filter(x=>x.input_name === 'color_exterior');
      let _fuel = data.filter(x=>x.input_name === 'tipo_de_motor');
      let fuels = [];

      for (let i in _fuel[0].options) {
        fuels.push({value:_fuel[0].options[i].value,label:_fuel[0].options[i].value});
      }
        this.fuels = [{
          label: "Combustible",
          options: fuels
        }]

        if (this.filters) {
          this.fuel = this.filters.filters.find(x=>x.input_name == 'tipo_de_motor').value;
        }

      if (_color) {

        let options = [];
        for (let i = 0; i < _color[0].options.length; i++) {
          let el = _color[0].options[i];
          options.push({ value:el.value, label:el.value })
        }

        this.colors = [{
          label: "Colores",options: options
        }];

        if (this.filters) {
          this.color = this.filters.color;
        }
      }
    })

    this.api.getBrands('Coches').subscribe((data:any)=>{
      this.allBrands.push({value:null,label:"Todas las marcas"});
      for (let i = 0; i < data.length; i++) {
        this.allBrands.push({value:data[i].id,label:data[i].title});
      }

      this.brands = [{
        label: "<i class='fa fa-check'></i> Marca",options: this.allBrands
      }];

      if (this.filters) {
        let brands = [];

        for (let i in this.filters.brand_id) {
          brands.push(this.filters.brand_id[i]);
        }

        this.brand = brands;

        if (!this.filters.model) {
          console.log('nulando los filtros')
          this.filters = null;
        }
      }
    })

    if (this.filters) {
      this.loadFilter();
    }
  }

  assignType(i,e,type)
  {
    if (e.srcElement.checked) {
      this[type].push(i);
    }else{
      this[type].splice(this[type].findIndex(x=> x == i),1);
    }
    this.filter();
    // console.log(this[type])
  }

  update(e){
  	console.log(e);
  }

  loadModels()
  {
    this.model = "";
    this.version = "";
    if (this.lodash) {return false;}
    this.filter();
    this.allModels = [];

    console.log('cargar modelos')

    if (this.brand.length > 1) {
      this.allVersions = [];
      return;
    }
    
    let filters = [{input_name: 'tipo_de_motor', value:this.fuel}];

    this.api.getModels({brand:this.brand[0],years:this.years,filters:filters,category:"1"}).subscribe((data:any)=>{
      for(let i in data){
        this.allModels.push(data[i]);
      }

      this.models = [{
        label: "Modelos",options: this.allModels
      }];

      if (this.filters) {
        this.model = this.filters.model;

        setTimeout(()=>{
          if (!this.filters.version) {
            console.log('nulando los filtros models')
            this.filters = null;
          }
        },200)
      }

    });

  }

  // loadBodyworks()
  // {
  //   this.allBodyworks = [];
  //   this.allTrims = [];

  //   if (this._trim.length > 0) {
  //     this.api.getTrims({brand:this.brand,years:this.years,model:this.model}).subscribe((data:any)=>{
  //       for(let i in data){
  //         this.allTrims.push(data[i]);
  //       }
  //     });
  //     this.trims = [{
  //       label: "Ajuste", options: this.allTrims
  //     }];
  //   }else{

  //     let filters = [{input_name: 'tipo_de_motor', value:this.fuel}];

  //     // this.api.getBodyworks({brand:this.brand,years:this.years,model:this.model,filters:filters}).subscribe((data:any)=>{
  //     //   for (var i = 0; i < data.length; i++) {
  //     //     this.allBodyworks.push({value:data[i],label:data[i]});
  //     //   }
  //     // });
  //     // this.bodyworks = [{
  //     //   label: "Carroceria", options: this.allBodyworks
  //     // }];
  //   }
  // }

  loadVersions()
  {
    if (this.brand.length > 1 || this.model == undefined) {return;}
    if (this.lodash) {return false;}
    this.filter();
    this.allVersions = [];
    this.version = null;
    
    let filters = [{input_name: 'tipo_de_motor', value:this.fuel},{input_name:'carroceria',value:this.bodywork}];

    this.api.getVersions({brand:this.brand,years:this.years,model:this.model,filters:filters,category:"1"}).subscribe((data:any)=>{
      for(let i in data){
        this.allVersions.push(data[i]);
      }
      this.versions = [{
        label: "Modificación",options: this.allVersions
      }];

      if (this.filters) {
        
        this.version = this.filters.version;

        setTimeout(()=>{
          console.log('nulando los filtros versiones')
          this.filters = null;
        },200)
      }

    });
  }

  filter()
  {
    if (this.lodash || this.filters) {return false;}
    let filters = [
      // {input_name: '', value: this.province},
      // {input_name: '', value: this.brand},
      // {input_name: '', value: this.model},
      // {input_name: '', value: this.version},
      // {input_name: '', value: this.price},
      // {input_name: '', value: this.years},
      // {input_name: '', value: this.kilometers},
      {input_name: 'tipo_de_motor', value: this.fuel},
      {input_name: 'capacidad_deposito', value: this.capacity},
      {input_name: 'carroceria', value: this.bodywork},
      // {input_name: '', value: this.gearbox},
      {input_name: 'potencia_del_motor', value: this.power},
      {input_name: 'numero_de_plazas', value: this.place},
      {input_name: 'puertas', value: this.door}
    ];
    let data = {
      category:1,
      years:this.years,
      brand_id:this.brand,
      model:this.model,
      version:this.version,
      filters:filters,
      price:this.price,
      gearbox:this.gearbox,
      province:this.province,
      kilometers:this.kilometers,
      seller:this.seller,
      status:this.status,
      iva:this.iva,
      guarantee:this.guarantee,
      price_type:this.price_type,
      color:this.color,
    };

    this.actualFilter = data;

    this.propagar.emit(data);

    this.events.publish('restoreOrder');
  }

  saveFilter()
  {
    if (!this.user) {
      return alert('Debes estár registrado para guardar la búsqueda');
    }

    this.api.saveSearch({user_id:this.user.id,category_id:1,filters:JSON.stringify(this.actualFilter)}).subscribe(data=>{
      alert('Tu búsqueda ha sido guardada correctamente! Puedes verla desde tu perfil...');
    })
  }

  deleteFilter()
  {

    (document.getElementById('segundamano') as HTMLInputElement).checked = false;
    (document.getElementById('nuevo') as HTMLInputElement).checked = false;
    (document.getElementById('customCheck4') as HTMLInputElement).checked = false;
    (document.getElementById('customCheck5') as HTMLInputElement).checked = false;
    (document.getElementById('customCheck8') as HTMLInputElement).checked = false;
    (document.getElementById('customCheck9') as HTMLInputElement).checked = false;

    let a = Array.from(document.getElementsByClassName('radio-bw'));
    a.forEach((v,i)=>{
      (v as HTMLInputElement).checked = false
    })


    this.fuel = null;
    this.capacity = {from:null,to:null};
    this.bodywork = [];
    this.power = {from:null,to:null};
    this.place = null;
    this.door = null;
    this.years = {from:null,to:null};
    this.brand = [];
    this.model = null;
    this.version = null;
    this.price = {from:null,to:null};
    this.gearbox = null;
    this.province = null;
    this.kilometers = {from:null,to:null};
    this.status = [];
    this.seller = [];
    this.iva = null;
    this.guarantee = null;
    this.price_type = null;
    this.color = null;

    this.filter();
  }

  words()
  {

  }

  selectBW(bw)
  {
    let idx = this.bodywork.findIndex(x=>x==bw) == -1;
    
    if (idx) {
      this.bodywork.push(bw);
    }else{
      this.bodywork.splice(idx,1);
    }

    this.filter();
    // console.log(this.bodywork);

  }

  loadFilter()
  {
    let filter = this.filters/*JSON.parse(localStorage.getItem('previousFilter'))*/;

    let filters = filter['filters'];

    this.fuel = filters.find(x => x.input_name == 'tipo_de_motor').value;
    this.capacity = filters.find(x => x.input_name == 'capacidad_deposito').value;
    this.bodywork = filters.find(x => x.input_name == 'carroceria').value;
    this.power = filters.find(x => x.input_name == 'potencia_del_motor').value;
    this.place = filters.find(x => x.input_name == 'numero_de_plazas').value;
    this.door = filters.find(x => x.input_name == 'puertas').value;

    this.years = filter['years'];
    this.brand = filter['brand_id'];
    this.model = filter['model'];
    this.version = filter['version'];
    this.price = filter['price'];
    this.gearbox = filter['gearbox'];
    this.province = filter['province'];
    this.kilometers = filter['kilometers'];
    this.iva = filter['iva'];
    this.guarantee = filter['guarantee'];
    this.price_type = filter['price_type'];
    this.color = filter['color'];

    this.seller = filter['seller'];
    for (let i in this.seller) {
      if (this.seller[i] === 3) {
        (document.getElementById('customCheck8') as HTMLInputElement).checked = true;
      }else if(this.seller[i] === 2) {
        (document.getElementById('customCheck9') as HTMLInputElement).checked = true;
      }
    }

    this.status = filter['status'];

    for (let i in this.status) {
      if (this.status[i] === 1) {
        (document.getElementById('segundamano') as HTMLInputElement).checked = true;
      }else if(this.status[i] === 0) {
        (document.getElementById('nuevo') as HTMLInputElement).checked = true;
      }
    }

    for (let i in this.bodywork) {
      (document.getElementById(this.bodywork[i].toLowerCase()) as HTMLInputElement).checked = true;
    }
  }

}
