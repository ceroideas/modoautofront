import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  banner;
  user = JSON.parse(localStorage.getItem('modoautoUser'));

  from:any;
  to:any;

  from_publishing:any = [];
  to_publishing:any = [];

  loading;

  constructor(public api: ApiService, public events: EventsService) { }

  ngOnInit(): void {
  	this.api.getBanner(2).subscribe(data=>{
      this.banner = data[0];
    })

    this.loadMessages();
  }

  loadMessages()
  {
    this.from = null;
    this.to = null;
    this.from_publishing = [];
    this.to_publishing = [];

    this.api.loadMessages(this.user.id).subscribe(data=>{

      this.events.publish('removeNewMessagemark');

      this.from = data[0];
      this.to = data[1];

      for (let i in data[0]) {
        this.from_publishing.push(i);
      }

      for (let i in data[1]) {
        this.to_publishing.push(i);
      }

      console.log(this.to,this.from);
    })
  }

  scrollHeight()
  {
    setTimeout(()=>{

      let arr = Array.from(document.getElementsByClassName('mensajes-box'));

      for (let i in arr) {
        arr[i].scrollTo(0,arr[i].scrollHeight);
      }
    },200)
  }

  enviarPregunta(g_id,advert_id,owner,questoner)
  {
    this.loading = true;
    let message = (document.getElementById('question-'+g_id) as HTMLInputElement).value;
    console.log(message, g_id, advert_id, owner, questoner);

    this.loading = false;

    if (!message || message == "") {
      return alert('La pregunta no puede estar vacía')
    }
    this.loading = true;

    this.api.contact({message:message,from_id:questoner,to_id:owner,advert_id:advert_id}).subscribe(data=>{

      this.loading = false;
      (document.getElementById('question-'+g_id) as HTMLInputElement).value = null;
      alert('Tu pregunta ha sido enviada, serás notificado cuando el vendedor conteste');

      return this.loadMessages();
    },(e)=>{
      this.loading = false;
      // this.contact = null;
      // $('#close-modal').click();
      return alert('Ya has hecho una pregunta al vendedor, debes esperar que responda');
    })
  }

  enviarRespuesta(g_id,owner,questoner)
  {
    this.loading = true;
    let message = (document.getElementById('question-'+g_id) as HTMLInputElement).value;
    console.log(message, g_id, owner, questoner);

    this.loading = false;

    if (!message || message == "") {
      return alert('La respuesta no puede estar vacía')
    }
    this.loading = true;

    this.api.respond({message:message,from_id:owner,to_id:questoner,message_group_id:g_id}).subscribe(data=>{

      this.loading = false;
      (document.getElementById('question-'+g_id) as HTMLInputElement).value = null;
      alert('Tu respuesta ha sido enviada, serás notificado cuando el comprador vuelva a preguntar');

      return this.loadMessages();
    },(e)=>{
      this.loading = false;
      // this.contact = null;
      // $('#close-modal').click();
      return alert('Ya has respondido al comprador, debes esperar que vuelva a hacer una pregunta');
    })
  }

}
