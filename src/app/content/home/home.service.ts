import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CasaVista } from './models/casa';
import { environment } from '../../../environments/environment';
import { ParqueoVista } from './models/parque';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private _http: HttpClient) { }


  getCasaById(id: string) {
    return this._http.get<CasaVista>(`${environment.API_URL}casa/${id}`)
  }

  getParqueosByBloque(id: string) {
    return this._http.get<ParqueoVista[]>(`${environment.API_URL}parqueo/bloque/${id}`)
  }


}
