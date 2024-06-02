import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { DialogRemoteControl } from '@ng-vibe/dialog';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './confirm-modal.component.html',
  styleUrl: './confirm-modal.component.scss'
})
export class ConfirmModalComponent {
  dialogRemoteControl: DialogRemoteControl = inject(DialogRemoteControl);

  title: string = 'Confirmación';
  content: string = '';
  textConfirm: string = 'Confirmar';

  constructor() {
    const { title, content, textConfirm } = this.dialogRemoteControl.payload;

    this.title = title !== null ? title : this.title;
    this.content = content !== null ? content : this.content;
    this.textConfirm = textConfirm !== null ? textConfirm : this.textConfirm;
  }

  confirm(){
    const data = { result: true };
    this.dialogRemoteControl.closeDialog(data);
  }

  close(): void {
    const data = { result: false };
    this.dialogRemoteControl.closeDialog(data);
  }
}
