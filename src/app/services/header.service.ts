import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  currentSection = new BehaviorSubject('main');

  constructor(public router: Router) { }

  getCurrentSection() {

    let activeRoute: string = this.router.url;
    let mainRoute: string = activeRoute.split('/')[1];

    if (mainRoute == 'mi-perfil' || mainRoute == 'mis-anuncios') {
      this.currentSection.next('perfil');
    } else if(mainRoute == 'profesionales') {
      this.currentSection.next('profesionales');
    }
    else{
      this.currentSection.next('regular');
    }

    return this.currentSection.value;
  }
}
