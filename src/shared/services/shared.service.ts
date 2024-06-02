import { Injectable } from '@angular/core';
import { AppearanceAnimation, DisappearanceAnimation, ProgressBar, TextAlignEnum, ToastPosition, ToastTypeEnum, ToastifyRemoteControl } from '@ng-vibe/toastify';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private toast: ToastifyRemoteControl = new ToastifyRemoteControl();
  public setLoading = new BehaviorSubject<boolean>(false);
  constructor() { }

  mensaje(content: string, tipo: ToastTypeEnum) {
    this.toast.options = {
      text: content,
      title: 'Mensaje del sistema',
      autoCloseDuration: 3500,
      layoutType: tipo,
      position: ToastPosition.TOP_RIGHT,
      progressBar: ProgressBar.DECREASE,
      textAlign: TextAlignEnum.START,
      animationIn: AppearanceAnimation.BOUNCE_IN,
      animationOut: DisappearanceAnimation.BOUNCE_OUT
    };
    this.toast.openToast();
  }

}
