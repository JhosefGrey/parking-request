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
import { DialogRemoteControl } from '@ng-vibe/dialog';
import { AppearanceAnimation, DisappearanceAnimation } from '@ng-vibe/toastify';
import { ConfirmModalComponent } from '../../../shared/components/confirm-modal/confirm-modal.component';

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
      this._service.getMessages().subscribe((res) => {

        if(res.parqueoSolicitado === this.idParqueo && res.usuarioSolicitud === this._auth.user?._id){
          this.parqueoAsignado = true;
        }
  
        // this.getParqueos();
  
      });
    })
  }

  getParqueos() {
    this._service.getParqueosByBloque(this.casa.bloqueId).subscribe((res) => {
      this.parqueos = res;
    });
  }


  solicitar(parqueo: ParqueoVista) {
    if (parqueo.ocupado) return;
    this.idParqueo = parqueo._id;

    const objSoli: Solicitud = { parqueoSolicitado: parqueo._id, usuarioSolicitud: this._auth.user?._id! }

    this._service.crearSolicitud(objSoli).subscribe(() => {
      this._service.sendMessage(objSoli);
    });
  }

  dejarParqueo() {
    const dialog = new DialogRemoteControl(ConfirmModalComponent);
    dialog.options = {
      showOverlay: true,
      animationIn: AppearanceAnimation.BOUNCE_IN,
      animationOut: DisappearanceAnimation.BOUNCE_OUT,
    };

    dialog.openDialog({ title: null, content: '¿Está seguro(a) de querer dejar el parqueo?', textConfirm: null }).subscribe((res) => {
      if (res.result) {

        this._service.dejarParqueo(this.idParqueo).subscribe(() => {
          this.parqueoAsignado = false;
          this.getParqueos();
        })
      }
    });

 
  }

  logout() {
    this._auth.logOut();
  }


}
