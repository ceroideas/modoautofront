import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  name = "Navbar";

  constructor() { }

  ngOnInit(): void {
  }

  changeName()
  {
  	this.name = "Modoauto";
  }

}
