import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'lm-header',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './header-model.component.html',
  styleUrls: ['./header-model.component.scss'],
})
export class HeaderModelComponent {
  @Output() menuClick: EventEmitter<any> = new EventEmitter();

  public menuClicked() {
    this.menuClick.emit();
  }
}
