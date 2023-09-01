import { Component, Inject, Input, importProvidersFrom, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent, ModalsService, ProductCardComponent } from '@lomi/material';
import { Taxon } from 'libs/lomi-sdk-functions/src/lib/products/taxons';
import { SpreeEntity } from 'libs/lomi-sdk-functions/src/spree';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { FirebaseModule } from '../firebase/firebase.module';

@Component({
  selector: 'base-front-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent, ButtonComponent, FirebaseModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  @Input() taxon: SpreeEntity<Taxon> = {} as any;

  private firestore: Firestore = inject(Firestore);
  private modalsService: ModalsService = inject(ModalsService);
  public products: any[] = [];

  constructor() {

  }

  demotePromotion(){
    this.products.forEach((product:any) => {
      product.variants.forEach((variant:any) => {
        setDoc(doc(this.firestore, "tasks", 'remove_taxons'+"removePromotion-"+(variant["id"] || encodeURI(product["name"]?.split("/")[0]))), {
          created_at_millis: new Date().getTime(),
          type: "removePromotion",
          status: "pending",
          data: {
            id: variant["id"],
            promotionTaxon: this.taxon.id,
            price: variant.attributes["price"],
            compare_at_price: variant.attributes["compare_at_price"] || variant.attributes["price"],
          },
          title: "Remove Promotion "+ this.taxon.attributes.name,
      })
      });
    })
    window.showSnackbar("Se procesaran los "+this.products.length+" productos en segundo plano")
    this.modalsService.dissmissModal()
  }
  
  ngOnInit(): void {
    if(this.taxon.id){
      window.lomiAPI.products.getProductsByTaxonId(parseInt(this.taxon.id) as any).then((taxon:any) => {
        this.products = taxon.data.map((product:any) => product.attributes)
      });
    }
  }

}
