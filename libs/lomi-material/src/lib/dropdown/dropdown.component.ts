import { RouterTestingModule } from '@angular/router/testing';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownModelComponent } from './parts/dropdown-model/dropdown-model.component';
import { DropdownItemComponent } from './parts/dropdown-item/dropdown-item.component';
import { DropdownTitleComponent } from './parts/dropdown-title/dropdown-title.component';
import { MenuRoute } from '../../interfaces/Route.type';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'lm-dropdown-model',
  standalone: true,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
  imports: [
    CommonModule,
    DropdownModelComponent,
    DropdownItemComponent,
    DropdownTitleComponent,
    RouterModule,
  ],
})
export class DropdownComponent {
  @Input() label!:string
  @Input() Routes!: MenuRoute[];
}
