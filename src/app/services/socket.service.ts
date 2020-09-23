import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  constructor(private socket: Socket) {

    // this.socket.on('conectado',data=>{
    //   console.log(data.msg);
    // })

    // this.socket.on('newMessage',data=>{
    //   console.log(data);
    // })

  }


  sendMessage()
  {
  	// this.socket.emit('sendMessage',{to_id:1,from_id:2});
  }
}
