import { Component, OnInit } from '@angular/core';
import { Solicitud } from './models/solicitud';
// import { HomeService } from '../../home.service';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../auth/pages/login/services/auth.service';
import { User } from '../../auth/pages/login/models/auth';
import { HomeService } from './home.service';
import { CasaVista } from './models/casa';
import { ParqueoVista } from './models/parque';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [DatePipe]
})
export class HomeComponent implements OnInit {
  parqueoAsignado: boolean = false;
  solicitudes: Solicitud[] = [];
  user: User | null = null;
  casa!: CasaVista;
  parqueos: ParqueoVista[] = [];
  idParqueo: string = '';
  constructor(private _auth: AuthService, private _service: HomeService) { }

  ngOnInit(): void {
    this.user = this._auth.user;
    this.getCasa();
  }


  getCasa() {
    this._service.getCasaById(this.user?.idCasa!).subscribe((res) => {
      this.casa = res;
      this.getParqueos();
    })
  }

  getParqueos() {
    this._service.getParqueosByBloque(this.casa.bloqueId).subscribe((res) => {
      this.parqueos = res;
    })
  }


  solicitar(parqueo: ParqueoVista) {
    if (parqueo.ocupado) return;
    this.idParqueo = parqueo._id;

    const objSoli: Solicitud = { parqueoSolicitado: parqueo._id, usuarioSolicitud: this._auth.user?._id! }

    this._service.sendMessage(objSoli);

    // this._service.crearSolicitud(objSoli).subscribe(() => {
    // });
  }

  dejarParqueo() {
    this._service.dejarParqueo(this.idParqueo).subscribe(() => {
      this.parqueoAsignado = false;
      this.getParqueos();
    })
  }

  logout() {
    this._auth.logOut();
  }


}
