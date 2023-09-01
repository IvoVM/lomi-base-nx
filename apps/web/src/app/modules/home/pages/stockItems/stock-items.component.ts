import { Component, ComponentRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ButtonComponent,
  ModalsService,
  ProductCardComponent,
  TypeaheadComponent,
} from '@lomi/material';
import { ProductDetailComponent } from '../../../products/product-detail/product-detail.component';
import { ProductUploaderComponent } from 'apps/web/src/app/product-uploader/product-uploader.component';
import { TasksComponent } from 'apps/web/src/app/tasks/tasks.component';
import { Taxon } from 'libs/lomi-sdk-functions/src/lib/products/taxons';
import { SpreeEntity } from 'libs/lomi-sdk-functions/src/spree';
import { MatChipsModule } from '@angular/material/chips';
import { ProductListComponent } from 'apps/web/src/app/product-list/product-list.component';

@Component({
  selector: 'stock-items',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    ProductCardComponent,
    TypeaheadComponent,
    MatChipsModule,
  ],
  templateUrl: './stock-items.component.html',
  styleUrls: ['./stock-items.component.scss'],
})
export class StockItemsComponent {
  public withLoadingOff = (object: any) => {
    this.loading = false;
    return object;
  };

  public taxons$ = window.lomiAPI.taxons.listTaxons().then((t) => {
    this.loadingTaxons = false;
    return t;
  });
  public products$ = window.lomiAPI.products.listProducts();
  public queryProducts$ = window.lomiAPI.products
    .searchProducts('')
    .then(this.withLoadingOff);
  public sales: SpreeEntity<Taxon>[] = [];

  public tasks: any[] = [];
  private items: any[] = [];

  private modalService: ModalsService = inject(ModalsService);

  public loading = true;
  public loadingTaxons = true;

  public openProduct(product: any) {
    
    this.modalService.openModal(ProductDetailComponent as any, {
      product: product,
    });
  }

  public openTaxon(taxon: any) {
    this.modalService.openModal(ProductListComponent as any, {
      taxon: taxon,
    });
  }

  public openTaskList() {
    this.modalService.openModal(TasksComponent as any, { tasks: this.tasks });
  }

  public uploadProducts() {
    this.modalService.openModal(ProductUploaderComponent as any, {});
  }

  public onSearch(query: string) {
    this.loading = true;
    this.products$ = window.lomiAPI.products
      .searchProducts(query)
      .then(this.withLoadingOff);
  }

  public searchTaxonById(id: string) {
    if (id) {
      this.loading = true;
      this.products$ = window.lomiAPI.products
        .getProductsByTaxonId(id)
        .then(this.withLoadingOff);
    }
  }

  constructor() {
    window.lomiAPI.taxons.getTaxon('1594').then((promoTaxon: any) => {
      this.sales = promoTaxon.included
        .filter((t: any) => t.type == 'taxon')
        .filter((t: any) => t.relationships.products.data.length > 0);
      console.log(this.sales);
    });
  }
}
