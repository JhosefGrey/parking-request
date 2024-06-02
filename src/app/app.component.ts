import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Solicitud } from './models/solicitud';
import { AppService } from './app.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'parking-request';

  solicitudes: Solicitud[] = [];

  solicitud: Solicitud = new Solicitud();

  constructor(private _service: AppService) { }

  getMaxId() {

    let maxId = 0;

    this.solicitudes.forEach(soli => {
      maxId ++
    });

    maxId = maxId + 1;

    return maxId;

  }

  // crearSolicitud() {
  //   console.log('creando solicitud', this.solicitud)
  //   this.solicitud.idSolicitud = this.getMaxId();
  //   this._service.sendMessage(this.solicitud);
  // }

}
