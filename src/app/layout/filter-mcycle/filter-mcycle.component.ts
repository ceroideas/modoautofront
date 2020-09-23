import { Component, OnInit } from '@angular/core';

import { Select2Option, Select2Group } from "ng-select2-component";

@Component({
  selector: 'app-filter-mcycle',
  templateUrl: './filter-mcycle.component.html',
  styleUrls: ['./filter-mcycle.component.scss']
})
export class FilterMcycleComponent implements OnInit {

  provinces:Select2Group[];
  brands:Select2Group[];
  models:Select2Group[];
  types:Select2Group[];
  value = "";

  constructor() {
  	this.provinces = [{
  	  		label: "Provincias",
  	    	options: [{value:"1",label:"Prueba Provincias"}]
  	  	}]
  	this.brands = [{
  	  		label: "Marcas",
  	    	options: [{value:"1",label:"Prueba Marcas"}]
  	  	}]
  	this.models = [{
  	  		label: "Modelos",
  	    	options: [{value:"1",label:"Prueba Modelos"}]
  	  	}]
  	this.types = [{
  	  		label: "Tipos",
  	    	options: [{value:"1",label:"Prueba Tipo 1"},{value:"2",label:"Prueba Tipo 2"}]
  	  	}]
  }

  ngOnInit(): void {
  }

    update(e)
  {
    console.log(e);
  }

}
