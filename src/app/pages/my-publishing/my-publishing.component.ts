import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-my-publishing',
  templateUrl: './my-publishing.component.html',
  styleUrls: ['./my-publishing.component.scss']
})
export class MyPublishingComponent implements OnInit {

  user = JSON.parse(localStorage.getItem('modoautoUser'));
  banner;

  constructor(public api: ApiService) { }

  ngOnInit(): void {
  }

  renovarTodo()
  {
  	this.api.renovarTodo(this.user.id).subscribe(data=>{
  		alert('Todos los anuncios renovados! se le notificará cuando sean publicados.');
  		location.reload();
  	})
  }

}
