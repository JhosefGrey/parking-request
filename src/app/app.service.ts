import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// import * as io from 'socket.io-client';
import { io } from 'socket.io-client';

import { Solicitud } from './models/solicitud';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  private socket = io('http://localhost:3500');


  // sendMessage(msg: string) {
  //   // Enviar mensaje al servidor
  //   this.socket.emit('message', msg);
  // }
  sendMessage(message: Solicitud) {
    this.socket.emit('message', message);
  }

  // getMessages() {
  //   let observable = new Observable<Solicitud>(observer => {
  //     this.socket.on('message', (data) => {
  //       observer.next(data);
  //     });
  //     return () => { this.socket.disconnect(); };
  //   });
  //   return observable;
  // }
}
