import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'lm-dropdown',
  standalone: true,
  imports: [CommonModule,MatMenuModule],
  templateUrl: './dropdown-model.component.html',
  styleUrls: ['./dropdown-model.component.scss'],
})
export class DropdownModelComponent {}
