import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CasaVista } from './models/casa';
import { environment } from '../../../environments/environment';
import { ParqueoVista } from './models/parque';
import { io } from 'socket.io-client';
import { Solicitud } from './models/solicitud';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private socket = io('http://localhost:3500');

  constructor(private _http: HttpClient) { }

  sendMessage(message: Solicitud) {
    this.socket.emit('message', message);
  }

  sendMessageParqueo(message: Solicitud) {
    this.socket.emit('solicitud', message);
  }

  getMessages() {
    let observable = new Observable<Solicitud>(observer => {
      this.socket.on('solicitud', (data: Solicitud) => {
        console.log(data, 'holaa')
        observer.next(data);
      });
      return () => { this.socket.disconnect(); };
    });
    return observable;
  }

  crearSolicitud(solicitud: Solicitud){
    return this._http.post(`${environment.API_URL}solicitud`, solicitud)
  }

  getCasaById(id: string) {
    return this._http.get<CasaVista>(`${environment.API_URL}casa/${id}`)
  }

  getParqueosByBloque(id: string) {
    return this._http.get<ParqueoVista[]>(`${environment.API_URL}parqueo/bloque/${id}`)
  }

  dejarParqueo(id: string) {
    return this._http.put(`${environment.API_URL}parqueo/cambiar-estado/${id}`, null)
  }

}
