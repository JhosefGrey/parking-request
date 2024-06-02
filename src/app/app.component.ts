import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import { SharedService } from '../shared/services/shared.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxLoadingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'parking-request';
  show: boolean = false;

  public config = {
    animationType: ngxLoadingAnimationTypes.circleSwish,
    primaryColour: "#10312a",
    secondaryColour: "#dcc17d",
    tertiaryColour: "$c9b095",
    backdropBorderRadius: '3px',
    fullScreenBackdrop: true
  };

  constructor(private _loading: SharedService, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this._loading.setLoading.asObservable().subscribe((res) => {
      this.show = res;
      this.cdr.detectChanges();
    })
  }

}
