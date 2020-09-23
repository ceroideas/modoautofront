import { Component, OnInit } from '@angular/core';

import { Select2Option, Select2Group } from "ng-select2-component";

@Component({
  selector: 'app-filter-ind',
  templateUrl: './filter-ind.component.html',
  styleUrls: ['./filter-ind.component.scss']
})
export class FilterIndComponent implements OnInit {

	type:Select2Group[];
	struct:Select2Group[];
	provider:Select2Group[];
	version:Select2Group[];
	provinces:Select2Group[];
	value = "";

  constructor() {
  	this.type = [{
  	  		label: "Tipo de vehiculo",
  	    	options: [{value:"1",label:"Prueba Tipos"}]
  	  	}]
  	this.struct = [{
	  		label: "Tipo de estructura",
	    	options: [{value:"1",label:"Prueba Estructuras"}]
  		}]
  	this.provider = [{
	  		label: "Fabricante",
	    	options: [{value:"1",label:"Prueba fabricante"}]
  		}]
  	this.version = [{
	  		label: "Versiones",
	    	options: [{value:"1",label:"Prueba Versiones"}]
  		}]
  	this.provinces = [{
	  		label: "Provincias",
	    	options: [{value:"1",label:"Prueba Provincias"}]
  		}]

  }

  ngOnInit(): void {
  }

  update(e){
  	console.log(e);
  }

}
