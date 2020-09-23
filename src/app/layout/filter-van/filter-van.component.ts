import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { Select2Option, Select2Group } from "ng-select2-component";

import { ApiService } from '../../services/api.service';
import { ThousandsPipe } from '../../pipes/thousands.pipe';

@Component({
  selector: 'app-filter-van',
  templateUrl: './filter-van.component.html',
  styleUrls: ['./filter-van.component.scss'],
  providers: [ThousandsPipe]
})
export class FilterVanComponent implements OnInit {

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

  province;
  brand;
  model;
  version;
  price:{from:any,to:any} = {from:null,to:null};

  years:{from:any,to:any} = {from:null,to:null};

  kilometers:{from:any,to:any} = {from:null,to:null};

  fuel;
  capacity:{from:any,to:any} = {from:null,to:null};
  bodywork;

  gearbox;
  power:{from:any,to:any} = {from:null,to:null};

  color;
  place;
  door;

  /**/

  pricesList:any = [];
  yearsList:any = [];
  kilometersList:any = [];
  powerList:any = [];

  @Output('propagar')
  propagar:EventEmitter<any> = new EventEmitter<any>();

  constructor(public api: ApiService, public thousands: ThousandsPipe) {

    this.api.loadProvinces().subscribe(data=>{

      let prov = [];

      for (var i in data) {
        prov.push({label:data[i].title,value:data[i].title})
      }

      this.provinces = [{
        label: "Provincias",
        options: prov
      }]
    })

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
      options: [{value:"CVT",label:"CVT"},{value:"Expendedora",label:"Expendedora"},{value:"Mecánica",label:"Mecánica"},{value:"Robot",label:"Robot"}]
    }]
    this.places = [{
      label: "Nº de Plazas",
      options: [{value:"2",label:"2"},{value:"3",label:"3"},{value:"4",label:"4"},{value:"5",label:"5"},{value:"6",label:"6"},{value:"7+",label:"7+"}]
    }]
    this.doors = [{
      label: "Número de puertas",
      options: []
    }]
    this.colors = [{
      label: "Colores",
      options: []
    }]
  }

  ngOnInit(): void {

    this.api.getFeatures('Furgonetas').subscribe((data:any)=>{
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

      if (_color) {

        let options = [];
        for (let i = 0; i < _color[0].options.length; i++) {
          let el = _color[0].options[i];
          options.push({ value:el.value, label:el.value })
        }

        this.colors = [{
          label: "Colores",options: options
        }];
      }
    })

    this.api.getBrands('Furgonetas').subscribe((data:any)=>{
      for (let i = 0; i < data.length; i++) {
        this.allBrands.push({value:data[i].id,label:data[i].title});
      }

      this.brands = [{
        label: "<i class='fa fa-check'></i> Marca",options: this.allBrands
      }];
    })
  }

  update(e){
  	console.log(e);
  }

  loadModels()
  {
    this.allModels = [];
    
    let filters = [{input_name: 'tipo_de_motor', value:this.fuel}];

    this.api.getModels({brand:this.brand,years:this.years,filters:filters,category:"12"}).subscribe((data:any)=>{
      for(let i in data){
        this.allModels.push(data[i]);
      }
    });

    this.models = [{
      label: "Modelos",options: this.allModels
    }];
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
    this.allVersions = [];
    this.version = null;
    
    let filters = [{input_name: 'tipo_de_motor', value:this.fuel},{input_name:'carroceria',value:this.bodywork}];

    this.api.getVersions({brand:this.brand,years:this.years,model:this.model,filters:filters,category:"12"}).subscribe((data:any)=>{
      for(let i in data){
        this.allVersions.push(data[i]);
      }
      this.versions = [{
        label: "Modificación",options: this.allVersions
      }];
    });
  }

  filter()
  {
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
      {input_name: 'potencia_de_motor', value: this.power},
      {input_name: 'numero_de_plazas', value: this.place},
      {input_name: 'numero_de_puertas', value: this.door}
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
      kilometers:this.kilometers
    };
    this.propagar.emit(data);
  }

}
