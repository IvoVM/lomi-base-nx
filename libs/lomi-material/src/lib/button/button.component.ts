import { Component, Input, Directive, ElementRef, inject, Output, EventEmitter, ChangeDetectionStrategy  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { ButtonColor } from '../../interfaces/button.type';

@Component({
  selector: `lm-button, lm-raised-button, lm-stroked-button, lm-flat-button, lm-icon-button, lm-fab, lm-mini-fab`,
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './button.component.html',
})
export class ButtonComponent {

  @Output() onclick = new EventEmitter<MouseEvent>()
 
  @Input() color: ButtonColor = 'primary'
  @Input() disabled = false

  public buttonType : 'lm-button' | 'lm-raised-button' | 'lm-stroked-button' | 'lm-button' | 'lm-flat-button'

  private elementRef = inject(ElementRef)
  classList = (this.elementRef.nativeElement as HTMLElement).classList;

    constructor() {
    this.classList.add('lm-lc-button')
    this.buttonType = this.elementRef.nativeElement.tagName.toLowerCase()
    console.log(this.buttonType)
  }

  onClick(event: MouseEvent) {
    this.onclick.emit(event)
  }

}