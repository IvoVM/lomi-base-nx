import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from 'libs/lomi-sdk-functions/src/lib/products/products';
import { SpreeEntity } from 'libs/lomi-sdk-functions/src/spree';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'base-front-product-detail',
  standalone: true,
  imports: [CommonModule, MatSlideToggleModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  @Input() product?: SpreeEntity<Product>;

  setStock(event:any){}

  constructor(){
    console.log("product", this.product)
  }
}
