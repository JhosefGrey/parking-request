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

e(message: Solicitud) {
    this.socket.emit('message', message);
  }

}
