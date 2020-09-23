import { Component, OnInit } from '@angular/core';
import { Select2Option, Select2Group } from "ng-select2-component";
import { ApiService } from '../../services/api.service';

declare var google;

@Component({
  selector: 'app-professionals',
  templateUrl: './professionals.component.html',
  styleUrls: ['./professionals.component.scss']
})
export class ProfessionalsComponent implements OnInit {

  map;
  marker;
  professionals:any;
  provinces:Select2Group[];
  province;
  words;

  constructor(public api: ApiService) {
    
    this.provinces = [{
      label: "Provincias",
      options: []
    }]

    this.api.loadProvinces().subscribe(data=>{

      let prov = [];

      prov.push({label:"Todas las provincias",value:-1});

      for (var i in data) {
        prov.push({label:data[i].title,value:data[i].title})
      }

      this.provinces = [{
        label: "Provincias",
        options: prov
      }]
    })
  }

  ngOnInit(): void {
  	this.api.loadProfessionals().subscribe(data=>{
  		this.professionals = data;
  		console.log(this.professionals);
  	})
  }

  checkEmpty(event)
  {
    if (event.srcElement.value == "") {
      this.search();
    }
  }

  ngAfterViewInit()  
  {
    setTimeout(()=>{
      this.initMap();
    },1000)
  }

  initMap()
  {
  	var countries = {
          'es': {
            center: {lat: 40.5, lng: -3.7},
            zoom:12
          }
      }
      var countryRestrict = {'country': 'es'};
      this.map = new google.maps.Map(document.getElementById('map'), {
          zoom: countries['es'].zoom,
          center: countries['es'].center,
          mapTypeControl: false,
          panControl: false,
          zoomControl: false,
          streetViewControl: false
      });
  }

  placeMarker(prof)
  {
  	if (this.marker) {
  		this.marker.setMap(null);
  	}
  	console.log(prof)
  	this.marker = new google.maps.Marker({
	    map: this.map,
	    position: {lat: parseFloat(prof.company.lt) || 0, lng:parseFloat(prof.company.ln) || 0},
	    anchorPoint: new google.maps.Point(0, -29)
	});
	this.map.setCenter({lat: parseFloat(prof.company.lt) || 0, lng:parseFloat(prof.company.ln) || 0});
  }

  search()
  {
    if (this.marker) {
      this.marker.setMap(null);
    }
    this.api.searchProfessionals({words:this.words,province:this.province}).subscribe(data=>{
      this.professionals = data;
    });
  }

}
