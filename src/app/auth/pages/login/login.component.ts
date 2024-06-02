import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Auth } from './models/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  obj: Auth = new Auth();
  constructor(private _service: AuthService, private _router: Router) { }

  login() {
    if (this.obj.clave === "" && this.obj.email === "") return;

    this._service.postLogin(this.obj).subscribe((res) => {
      this._service.token = res.token;
      this._service.user = res.user;
      this._router.navigateByUrl('/home')
    })
  }

}
