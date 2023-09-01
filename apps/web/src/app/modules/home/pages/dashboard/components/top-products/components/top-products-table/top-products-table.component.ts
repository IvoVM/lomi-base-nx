import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-products-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './top-products-table.component.html',
  styleUrls: ['./top-products-table.component.scss'],
})
export class TopProductsTableComponent {
  @Input() Table: Array<any> = [];
}
