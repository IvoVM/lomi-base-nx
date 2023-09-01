import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lm-header-logo',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header-logo.component.html',
  styleUrls: ['./header-logo.component.scss'],
})
export class HeaderLogoComponent {
  @Input() img!: string;
  logo =
    'https://lomi.cl/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBMThjQVE9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--bedcc2ae48446b27bfcd71352e6987e9ac5c9e14/logo.png';
}
