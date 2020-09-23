import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../services/api.service';

import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-replacements',
  templateUrl: './replacements.component.html',
  styleUrls: ['./replacements.component.scss']
})
export class ReplacementsComponent implements OnInit {

  f;
  words;
  banner;

  constructor(public api: ApiService, public events: EventsService) { 
    this.api.getBanner(1).subscribe(data=>{
      this.banner = data[0];
      console.log(this.banner);
    })

    this.events.subscribe('restoreOrder',()=>{
      let arr = Array.from(document.getElementsByClassName('orderList'));

      arr.forEach((data,i)=>{
        data.classList.remove('active');
      })

      arr[0].classList.add('active');
    })
  }

  ngOnInit(): void {
  }

  orderBy(criterial,type)
  {
    this.events.publish('orderByPublishing',{criterial:criterial,type:type});
  }

  filtro(f)
  {
  	this.f = f;
  }

  search(event)
  {
    this.words = event.srcElement.value;
  }

  checkEmpty(event)
  {
    console.log(event.srcElement.value);
    if (event.srcElement.value == "") {
      this.words = ""; 
    }
  }

}
