import { Component, OnInit } from '@angular/core';
import { HeaderService } from '../../services/header.service';

@Component({
  selector: 'app-publishing-ind',
  templateUrl: './publishing-ind.component.html',
  styleUrls: ['./publishing-ind.component.scss']
})
export class PublishingIndComponent implements OnInit {

  sub1;
  perfil = false;

  constructor(public headerService: HeaderService) { }

  ngOnInit(): void {
  	this.headerService.getCurrentSection();

    this.sub1 = this.headerService.currentSection.subscribe(section => {
      if (section == 'perfil') {
        this.perfil = true;
      }else{
        this.perfil = false;
      }
    });

    this.sub1.unsubscribe();
  }

}
