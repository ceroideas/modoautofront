import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input() set vehicle (val:any){
  	this.v = val;	
  }

  v:any;
  contact:any;
  details:any;
  user = JSON.parse(localStorage.getItem('modoautoUser'));
  loading;

  stars = 0;
  comment;

  constructor(public api: ApiService) { }

  ngOnInit(): void {
  }

  contactar()
  {
  	if (!this.contact || this.contact == "") {
  		return alert('La pregunta no puede estar vacía')
  	}
  	this.loading = true;

  	this.api.contact({message:this.contact,from_id:this.user.id,to_id:this.v.user_id, advert_id:this.v.id}).subscribe(data=>{

  		this.loading = false;
  		this.contact = null;
  		$('#close-modal').click();
  		return alert('Tu pregunta ha sido enviada, serás notificado cuando el vendedor conteste');
  	},(e)=>{
  		this.loading = false;
  		// this.contact = null;
  		// $('#close-modal').click();
  		return alert('Ya has hecho una pregunta al vendedor, debes esperar que responda');
  	})
  }

  denunciar()
  {
    this.loading = true;
    
    this.api.denunciar({details:this.details,advert_id:this.v.id,user_id:this.user.id}).subscribe(data=>{
      
      this.loading = false;

      $('#close-modal2').click();
      return alert('Hemos recibido su denuncia, el anuncio será revisado por nuestro equipo');
    })
  }

  calificar()
  {
    if (this.stars == 0) {
      return alert('Debe puntuar al vendedor')
    }

    this.loading = true;

      let data = {  
        from:this.user.id,
        advert_id:this.v.id,
        user_id:this.v.user_id,
        stars:this.stars,
        comment:this.comment,
      }
    
    this.api.calificar(data).subscribe(data=>{
      
      this.loading = false;

      $('#close-modal3').click();
      return alert('Gracias por su calificación');
    })
  }

}
