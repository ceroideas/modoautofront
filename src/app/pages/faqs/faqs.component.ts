import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss']
})
export class FaqsComponent implements OnInit {

  faqs:any;

  constructor(public api: ApiService, public router: Router) { }

  ngOnInit(): void {

  	let t = "";

  	if (this.router.url == '/ayuda') {
  		t = 'menu';
  	}else{
  		t = 'information';
  	}

  	this.api.getFaqs(t).subscribe(data=>{
  		this.faqs = data;
  	})
  }

}
