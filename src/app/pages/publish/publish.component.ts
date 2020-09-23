import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Select2Option, Select2Group } from "ng-select2-component";
import { ApiService } from '../../services/api.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

declare var $;

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.scss']
})
export class PublishComponent implements OnInit {

  public Editor = ClassicEditor;

  // categories:Select2Group[];
  brands:Select2Group[];
  years:Select2Group[];
  // fuels:Select2Group[];
  models:Select2Group[];
  bodyworks:Select2Group[];
  versions:Select2Group[];
  // gearbox:Select2Group[];
  colors:Select2Group[];
  trims:Select2Group[];

  provinces:Select2Group[];
  value = "";

  public loading = false;

  yearsData:any = [];

  files: File[] = [];

  allBrands = [];
  allModels = [];
  allVersions = [];
  allBodyworks = []
  allTrims = []


  /**/

  category:any;
  brand:any;
  year:any;
  model:any;
  bodywork:any;
  version:any;

  description = "";

  fuel:any;
  gearbox:any;
  kilometers:any;
  color:any;
  province:any;

  price:any;
  price_professional:any;
  price_financed:any;

  /**/

  _fuel:any;
  _gearbox:any;
  _kilometers:any;
  _color:any;
  _bodywork:any;
  _version:any;

  _trim:any;

  /**/

  video;

  images = [];

  guarantee;
  guarantee_time;
  iva;

  sale_type:any;

  features:any = [];

  _features:any = {};

  category_id;

  user = JSON.parse(localStorage.getItem('modoautoUser'));

  averiado;

  status;

  /**/

  loadingFeatures = false;

  /**/

  tmp_model;
  tmp_version;
  tmp_bodywork;
  banner:any;
  banner1:any;

  equipments;

  constructor(public router:Router, public api: ApiService, private cdr: ChangeDetectorRef, public activatedRoute: ActivatedRoute) {

    let id = this.activatedRoute.snapshot.paramMap.get('id');
    let categoria = this.activatedRoute.snapshot.paramMap.get('categoria');

    this.api.getBanner(2).subscribe(data=>{
      this.banner = data[0];
      this.banner1 = data[1] != undefined ? data[1] : data[0];
      console.log(this.banner);
    })

    this.api.loadProvinces().subscribe(data=>{

      let prov = [];

      for (var i in data) {
        prov.push({label:data[i].title,value:data[i].title})
      }

      this.provinces = [{
        label: "Provincias",
        options: prov
      }];

      if (categoria && id) {
        this.api.getAdvert(id).subscribe((data:any)=>{

          if (this.user.id != data.user_id) {
            alert('Ha ocurrido un error al cargar el anuncio')
            return this.router.navigate(['/']);
          }

          console.log(data);
          
          this.province = data.province;
          this.price = data.price;
          this.price_financed = data.price_financed;
          this.price_professional = data.price_professional;
          this.description = data.description;

          this.iva = data.iva;
          this.status = data.status ? data.status.toString() : null;
          this.guarantee = data.guarantee;
          this.guarantee_time = data.guarantee_time;


          this.brand = data.vehicle ? data.vehicle.brand_id : null;
          this.year = data.year ? parseInt(data.year) : null;
          this.fuel = data.fuel;
          this.gearbox = data.gearbox;
          this.kilometers = data.kilometers;
          this.color = data.color;

          this.equipments = data.equipments;

          this.tmp_model = data.vehicle ? data.vehicle.model_id : null;

          this.tmp_bodywork = data.vehicle ? data.vehicle.features.find(x=>x.feature.input_key == 'carroceria') : null;

          this.tmp_version = data.vehicle ? data.vehicle.modification_id : null;

          for (var i = 0; i < data.gallery.length; i++) {
            this.images.push({name: data.gallery[i].file_name,url:data.gallery[i].file});
          }

          if (this.images.length > 0) {
            this.startSorting();
          }

          if (data.features) {

            let features = JSON.parse(data.features);
            
            for(let i in features)
            {
              this._features[i] = features[i];
            }

          }

          if (categoria && id) {
            this.category = categoria;
            this.getFeatures(categoria);
          }

        })
      }

    })
  	// this.categories = [{
  	// 	label: "Categoría",options: [{value:"Coches",label:"Coches"}]
  	// }];
  	// this.gearbox = [{
  	// 	label: "Caja",options: [{value:"Manual",label:"Manual"},{value:"Automática",label:"Automática"}]
  	// }];

  }

  ngOnInit(): void {
  	for (var i = 2020; i >= 1970; i--) {
  		this.yearsData.push({value:i,label:i});
  	}

  	// console.log(this.yearsData);
  }

  startSorting() {
    $("#sortable").sortable({
      placeholder: "ui-state-highlight",
      stop: (event,ui)=>{

        let arr = Array.from($('.images-items'));
        let new_images = [];

        $.each(arr, (i,v)=>{

          new_images.push(this.images[v.dataset['index']]);

          // this.images = new_images;

          // this.images.sort((a:any,b:any):any =>{

          // })
        })

        this.images = new_images;

        this.cdr.detectChanges();

        // console.log(ui.item[0].attributes['data-index'].value);
      }
    });
    $("#sortable").disableSelection();
    // $(this).css('text-decoration', 'underline');
    // $('.demo').sortable({
    //   group:true,
    //   same_depth:true,
    //   update:(a,b)=>{console.log(a,b)}
    // });
  }

  _update(e){
  	// console.log(e);
  }

  checkFuel()
  {
    if (this._fuel.length == 0) {
      this.loadModels();
    }else{
      this.firstLoad();
    }
  }

  firstLoad()
  {
     this.loadModels();
     // if (this.brand && this.year && (this.fuel || this._fuel.length == 0)) {
     // }
  }

  loadModels()
  {
  	this.allModels = [];
    
    let filters = [{input_name: 'tipo_de_motor', value:this.fuel}];

  	this.api.getModels({brand:this.brand,year:this.year,filters:filters,category:this.category_id}).subscribe((data:any)=>{
  		for(let i in data){
  			this.allModels.push(data[i]);
  		}

      this.models = [{
        label: "Modelos",options: this.allModels
      }];

      this.model = this.tmp_model;
  	});

  }

  loadBodyworks()
  {
  	this.allBodyworks = [];
    this.allTrims = [];

    if (this._trim && this._trim.length > 0) {
      this.api.getTrims({brand:this.brand,year:this.year,model:this.model}).subscribe((data:any)=>{
        for(let i in data){
          this.allTrims.push(data[i]);
        }
      });
      this.trims = [{
        label: "Ajuste", options: this.allTrims
      }];
    }else{

      let filters = [{input_name: 'tipo_de_motor', value:this.fuel}];

    	this.api.getBodyworks({brand:this.brand,year:this.year,model:this.model,filters:filters}).subscribe((data:any)=>{

    		for (var i = 0; i < data.length; i++) {
    			this.allBodyworks.push({value:data[i],label:data[i]});
    		}

        this.bodyworks = [{
          label: "Carroceria", options: this.allBodyworks
        }];

        this.bodywork = this.tmp_bodywork.value;
    	});
    }
  }

  loadVersions()
  {
  	this.allVersions = [];
  	this.version = null;
    
    let filters = [{input_name: 'tipo_de_motor', value:this.fuel}/*,{input_name:'carroceria',value:this.bodywork}*/];

  	this.api.getVersions({brand:this.brand,year:this.year,model:this.model,filters:filters}).subscribe((data:any)=>{
  		for(let i in data){
  			this.allVersions.push(data[i]);
  		}
  		this.versions = [{
	  		label: "Modificación",options: this.allVersions
	  	}];

      this.version = this.tmp_version;
	  });

    this.loadBodyworks();
  }

  getFeatures(id)
  {
    this.loadingFeatures = true;

    if (!this.activatedRoute.snapshot.paramMap.get('id')) {
      this.brand = null;
      this.year = null;
      this.model = null;
      this.bodywork = null;
      this.version = null;
      this.fuel = null;
      this.gearbox = null;
      this.kilometers = null;
      this.color = null;
    }

    this.allBrands = [];

    this.brands = [{
      label: "Marca",options: []
    }];

    this.years = [{
      label: "Año",options: this.yearsData
    }];
    // this.fuels = [{
    //   label: "Combustible",options: [{value:"Gasolina",label:"Gasolina"},{value:"Diesel",label:"Diesel"},{value:"Otro",label:"Otro"}]
    // }];
    this.models = [{
      label: "Modelos",options: []
    }];
    
    this.bodyworks = [{
      label: "Carroceria", options: []
    }];

    this.versions = [{
      label: "Modificación",options: []
    }];

    this.colors = [{
      label: "Colores",options: []
    }];

    this.brands = [{
      label: "Marca",options: []
    }];

    this.trims = [{
      label: "Ajuste",options: []
    }];

  	this.api.getFeatures(id).subscribe((data:any)=>{

  		console.log(data);

      let cat = data[0];
      this.category_id = cat.id;
      this.sale_type = cat.sale_type;
      data = data[1];

      if (this.sale_type == 2) {
        this.features = data;
      }else{
        this._fuel = data.filter(x=>x.input_name === 'tipo_de_motor');
        this._gearbox = data.filter(x=>x.input_name === 'caja_de_cambios');
        this._kilometers = data.filter(x=>x.input_name === 'kilometros');
        this._color = data.filter(x=>x.input_name === 'color_exterior');
        this._trim = data.filter(x=>x.input_name === 'ajuste');
        this._version = data.filter(x=>x.input_name === 'version');
        this._bodywork = data.filter(x=>x.input_name === 'carroceria');

        if (this._color.length > 0) {

          let options = [];
          for (var i = 0; i < this._color[0].options.length; i++) {
            let el = this._color[0].options[i];
            options.push({ value:el.value, label:el.value })
          }

          this.colors = [{
            label: "Colores",options: options
          }];
        }
      }
      setTimeout(()=>{
        this.loadingFeatures = false;
      },500);
  	})

    this.api.getBrands(id).subscribe((data:any)=>{
      for (var i = 0; i < data.length; i++) {
        this.allBrands.push({value:data[i].id,label:data[i].title});
      }

      this.brands = [{
        label: "Marca",options: this.allBrands
      }];

      //
    })
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);

    // console.log(event.addedFiles);

    var formData:any

    for (let i in event.addedFiles) {
      let file = event.addedFiles[i];

      formData = new FormData();

  	  formData.append("file", file);

      this.api.uploadImage(formData).subscribe(data=>{
      	this.images.push(data);

        this.startSorting();
      });
    }

  }
 
  onRemove(event) {
    console.log(event);
    // this.files.splice(this.files.indexOf(event), 1);
    this.images.splice(this.images.indexOf(event), 1);
  }

  publish()
  {
    if (this.images.length == 0) {
      return alert('Debe seleccionar al menos una imagen para la publicación');
    }
    if (this.category == 1) {
      if (!this.kilometers) {
        return alert('Escriba el kilometraje del vehículo')
      }
    }

    let arr = Array.from(document.getElementsByClassName('equipment'));

    this.equipments = [];

    for (var i in arr) {

      if ((arr[i] as HTMLInputElement).checked == true) {
        this.equipments.push((arr[i] as HTMLInputElement).value);
      }

    }


  	this.loading = true;

  	let data = 
  	{
    	equipments:this.equipments,
      images:this.images,
    	category_id:this.category_id,
    	brand:this.brand,
    	year:this.year,
    	fuel:this.fuel,
    	model:this.model,
    	bodywork:this.bodywork,
    	version:this.version,
    	gearbox:this.gearbox,
    	description:this.description,
    	kilometers:this.kilometers,
    	color:this.color,
      price:this.price,
      price_financed:this.price_financed,
      price_professional:this.price_professional,
      iva:this.iva,
      guarantee:this.guarantee,
      guarantee_time:this.guarantee_time,
      features:this._features,
      video:this.video,
      province:this.province,
      user_id:this.user.id,
      averiado:this.averiado,
      status:this.status
    };

  	this.api.publish(data).subscribe(data=>{
    		this.loading = false;
    		this.router.navigate(['/']);
    		alert('El anuncio se ha guardado y está en moderación, será notificado cuando el anuncio esté publicado.')
  	},e=>{
    		this.loading = false;
  		alert('Ha ocurrido un error inesperado!')
  	})

  }

  update()
  {

    let arr = Array.from(document.getElementsByClassName('equipment'));

    console.log(arr);

    this.equipments = [];

    for (var i in arr) {

      if ((arr[i] as HTMLInputElement).checked == true) {
        this.equipments.push((arr[i] as HTMLInputElement).value);
      }

    }

    this.loading = true;

    let data = 
    {
      equipments:this.equipments,
      images:this.images,
      category_id:this.category_id,
      brand:this.brand,
      year:this.year,
      fuel:this.fuel,
      model:this.model,
      bodywork:this.bodywork,
      version:this.version,
      gearbox:this.gearbox,
      description:this.description,
      kilometers:this.kilometers,
      color:this.color,
      price:this.price,
      price_financed:this.price_financed,
      price_professional:this.price_professional,
      iva:this.iva,
      guarantee:this.guarantee,
      guarantee_time:this.guarantee_time,
      features:this._features,
      video:this.video,
      province:this.province,
      user_id:this.user.id,
      averiado:this.averiado,
      status:this.status,
      id:this.activatedRoute.snapshot.paramMap.get('id')
    };

    this.api.update(data).subscribe(data=>{
        this.loading = false;
        this.router.navigate(['/']);
        alert('El anuncio ha sido actualizado!')
    },e=>{
        this.loading = false;
      alert('Ha ocurrido un error inesperado!')
    })
  }

}
