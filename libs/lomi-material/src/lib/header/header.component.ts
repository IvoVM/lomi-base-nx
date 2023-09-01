import { RouterTestingModule } from '@angular/router/testing';
import { HeaderLogoComponent } from './parts/header-logo/header-logo.component';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { HeaderModelComponent } from './parts/header-model/header-model.component';
import { HeaderItemComponent } from './parts/header-item/header-item.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MenuRoute } from '../../interfaces/Route.type';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'lm-header-model',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [
    DropdownComponent,
    HeaderModelComponent,
    HeaderLogoComponent,
    HeaderItemComponent,
    DropdownComponent,
    CommonModule,    
    RouterModule,
    MatIconModule,
  ],
})
export class HeaderComponent {
  @Input() LogoIMG!: string;
  @Input() Route!: MenuRoute[];
  @Input() dropdown = false;
  @Input() dropdownLabel!:string;
  @Input() dropdownRoute!:MenuRoute[];

  @Output() menuClick: EventEmitter<any> = new EventEmitter();
}
