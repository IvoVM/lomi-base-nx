import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '@base-front/lomi-sdk-functions/src/lib/products/products';
import { ModalsService } from '../layout/modals.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'lm-product-card',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css'],
})
export class ProductCardComponent {
  @Input() product!: Product;

  private modalService:ModalsService = inject(ModalsService)
}
