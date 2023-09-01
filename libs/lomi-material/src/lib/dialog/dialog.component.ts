import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogButtonComponent } from './parts/dialog-button/dialog-button.component';
import { DialogAction, DialogOptions } from '../../interfaces/dialog.type';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'lm-dialog',
  standalone: true,
  imports: [
    CommonModule,
    DialogButtonComponent,
    MatRadioModule,
    FormsModule,
    MatDialogModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  @Input() title!: string;
  @Input() options!: DialogOptions[];
  @Input() dialogActions!: DialogAction[];
  answer!: string;
}
