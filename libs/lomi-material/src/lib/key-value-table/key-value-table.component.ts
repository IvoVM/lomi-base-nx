import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { keyValueObject } from '../../interfaces/keyTable.type';

@Component({
  selector: 'lm-key-value-table',
  standalone: true,
  imports: [CommonModule, MatTableModule],
  templateUrl: './key-value-table.component.html',
  styleUrls: ['./key-value-table.component.scss'],
})
export class KeyValueTableComponent {
  @Input() title!: string;
  displayedColumns: string[] = ['key', 'value'];
  @Input() dataSource!: keyValueObject[];
}
