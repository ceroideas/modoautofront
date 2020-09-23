import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-searches',
  templateUrl: './searches.component.html',
  styleUrls: ['./searches.component.scss']
})
export class SearchesComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('modoautoUser'));
  searches:any;

  constructor(public api: ApiService, public router: Router, public cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  	if (!this.user) {
  		return;
  	}
  	this.api.getSearches(this.user.id).subscribe((data:any)=>{
  		this.searches = data;
  	})
  }

  verFiltro(filtro,url)
  {
  	console.log(filtro);
    localStorage.setItem('previousFilter',filtro);
  	this.router.navigate([url]);
  }

  deleteFiltro(id,i)
  {
    this.api.deleteFiltro(id).subscribe(data=>{
      this.searches.splice(i,1);
      this.cdr.detectChanges();
    })
  }

}