import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { ButtonComponent, KeyValueTableComponent, ModalsService, ProductCardComponent, TypeaheadComponent } from '@lomi/material';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatStepperModule} from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@Component({
  selector: 'base-front-product-uploader',
  standalone: true,
  imports: [CommonModule, MatNativeDateModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, ReactiveFormsModule, ButtonComponent, MatTabsModule, MatCheckboxModule, KeyValueTableComponent, TypeaheadComponent, ProductCardComponent, MatStepperModule, MatIconModule, MatButtonToggleModule],
  templateUrl: './product-uploader.component.html',
  styleUrls: ['./product-uploader.component.css'],
})
export class ProductUploaderComponent {
  private firestore: Firestore = inject(Firestore);
  public selectedFile:File = new File([], "");
  public rows:any[] = [];
  public selectedTab = 0;
  public allTaxons$ = window.lomiAPI.taxons.listTaxons().then(spreeRes=>spreeRes.data.map(t=>t.attributes.name));
  public allStockLocations$ = window.lomiAPI.stockLocations.listStockLocations().then(spreeRes=>spreeRes.map(t=>t.name));

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  public modals: ModalsService = inject(ModalsService);

  @Input() selectedContext: string = 'product';

  arrayBuffer:any;

  public inventoryConfiguration = {
    //Reglas de lectura del excel

    product: {
        name: "",
        price: "",
        description: "",
        ean: "",
        master_sku: "",
        producer: "",
        stock_location_id: "",
        stock: "",
    },
    
    variant: {
        id: "",
        ean: "",
        sku: "",
        price: "",
        compare_at_price: "",
        stock: "",
        stock_location_id: "",
    },

    variantPromotions: {
      id: "",
      price: "",
      compare_at_price: "",
      max_quantity: "",
    },

    variantStocks: {
      id: "",
      stock: ""
    },

    productOpts: {
      is_food_type_purchasable: "",
      is_local_type_purchasable: "",
      is_featured: "",
    },

    imageCdns: [],

    taxonsHierarchy: []
  }

  public toSpreeProduct(product:any){
    const spreeProduct: any = {
      name: product[this.inventoryConfiguration.product.name],
      price: product[this.inventoryConfiguration.product.price],
      description: product[this.inventoryConfiguration.product.description],
      ean: product[this.inventoryConfiguration.product.ean],
      master_sku: product[this.inventoryConfiguration.product.master_sku],
      producer: product[this.inventoryConfiguration.product.producer],
      tags: [product[this.inventoryConfiguration.taxonsHierarchy[0]], product[this.inventoryConfiguration.taxonsHierarchy[1]]],
      images: [product[this.inventoryConfiguration.imageCdns[0]]],
      shipping_category_id: "2",
      stock_locations: [product[this.inventoryConfiguration.product.stock_location_id]],
      stock: product[this.inventoryConfiguration.product.stock],
    }
    return spreeProduct;
  }

  public toPromotionTask(product:any){
    const spreeProduct: any = {
      id: product[this.inventoryConfiguration.variantPromotions.id],
      price: product[this.inventoryConfiguration.variantPromotions.price],
      compare_at_price: product[this.inventoryConfiguration.variantPromotions.compare_at_price],
      promotionTaxon: product[this.inventoryConfiguration.taxonsHierarchy[0]],
      max_quantity: product[this.inventoryConfiguration.variantPromotions.max_quantity] || 0,
    }
    return spreeProduct;
  }

  public toStockTask(product:any){
    const spreeProduct: any = {
      id: product[this.inventoryConfiguration.variantStocks.id],
      stock: product[this.inventoryConfiguration.variantStocks.stock]
    }
    return spreeProduct;
  }

  keyDictionary: {
    [key:string]: string[]
  } = {
    "name": ["producto", "nombre", "name"],
    "price": [ "precio", "price"],
    "description": ["desc", "descripción", "description"],
    "ean": ["barcode", "ean", "codigo barra", "codigo_barra"],
    "master_sku": [ "sku"],
    "sku": ["sku"],
    "producer": ["productor", "producer", "marca"],
    "imageCdns": ["imagen", "image", "imagen cdn", "image cdn"],
    "taxons": ["taxon", "categoria", "level"],
    "id": ["id","variant"],
    "stock": ["stock", "cantidad"],
    "stock_location_id": ["stock_location_id", "SL", "stock_location", "stock location", "bodega"],
    "compare_at_price": ["compare_at_price", "compare at price", "compare at", "compare_at", "compare price"],
    "max_quantity": ["max_quantity", "max quantity", "max", "max_quantity"],
  }

  public stripwhitespace(str:string) {
    return str.replace(/\s/g, '');
  }

  public associateAttribute(attribute:string){
    const productAttribute = Object.keys(this.inventoryConfiguration.product).find((key:string) => {
      console.log(key, this.stripwhitespace(attribute),"att")
        if(this.keyDictionary[key].includes(this.stripwhitespace(attribute.toLocaleLowerCase()))){
            (this.inventoryConfiguration["product"] as any)[key] = attribute;
            return true;
        }
        return false;
    });
    const variantAttribute = Object.keys(this.inventoryConfiguration.variant).find((key:string) => {
      console.log(key, attribute,"att")
      if(this.keyDictionary[key].includes(attribute.toLocaleLowerCase())){
          (this.inventoryConfiguration["variant"] as any)[key] = attribute;
          return true;
      }
      return false;
    })
    const variantPromotionAttribute = Object.keys(this.inventoryConfiguration.variantPromotions).find((key:string) => {
      if(this.keyDictionary[key].includes(attribute.toLocaleLowerCase())){
          (this.inventoryConfiguration["variantPromotions"] as any)[key] = attribute;
          return true;
      }
      return false;
    }
    )

    const variantStockAttribute = Object.keys(this.inventoryConfiguration.variantStocks).find((key:string) => {
      if(this.keyDictionary[key].includes(this.stripwhitespace(attribute.toLocaleLowerCase()))){
          (this.inventoryConfiguration["variantStocks"] as any)[key] = attribute;
          return true;
      }
      return false;
    }
    )
    if(variantAttribute){
      return variantAttribute;
    }
    const imgAttribute = this.keyDictionary["imageCdns"].find((key:string) => {
        if(attribute.toLocaleLowerCase().includes(key.toLocaleLowerCase())){
            (this.inventoryConfiguration["imageCdns"] as any).push(attribute);
            return true;
        }
        return false;
    })
    if(imgAttribute){
      return imgAttribute;
    }
    const taxonAttribute = this.keyDictionary["taxons"].find((key:string) => {
        if(attribute.toLocaleLowerCase().includes(key.toLocaleLowerCase())){
            (this.inventoryConfiguration["taxonsHierarchy"] as any).push(attribute);
            return true;
        }
        return false;
    })
    if(taxonAttribute){
      return taxonAttribute;
    }
    return variantStockAttribute
  }

  public goToTab(index:number){
    this.selectedTab = index;
  }

  public docChange(event:any){
    this.selectedFile = event.target.files[0];
    this.Upload();
  }

  public doTasks(){
    this.modals.dissmissModal();
    this.rows.forEach((row:any) => {
      let data:{
        [key:string]: any
      } = {}
      if(this.selectedContext === 'product'){
        const spreeProduct = this.toSpreeProduct(row);
        data = spreeProduct;
      } else if(this.selectedContext === 'stock'){
        const spreeVariant = this.toStockTask(row);
        data = spreeVariant;
      } else if(this.selectedContext === 'promotion'){
        const spreeVariant = this.toPromotionTask(row);
        data = spreeVariant;
      } else if(this.selectedContext === 'taxon'){
        data = {
          productId: row[this.inventoryConfiguration.variant.id],
          tags: row[this.inventoryConfiguration.taxonsHierarchy[0]],
        }
      }
      if(data["master_sku"]){
        data["master_sku"] = data["master_sku"] + "";
      }
      if(this.range.value?.start && this.range.value?.end){
        data["promotionTaxon"] = data["promotionTaxon"] + ""
        setDoc(doc(this.firestore, "tasks", this.selectedContext+"-"+(data["id"] || encodeURI(data["name"]?.split("/")[0])+(new Date().getTime()))), {
          created_at_millis: new Date().getTime(),
          type: this.selectedContext,
          status: "scheduled",
          data: data,
          title: this.selectedFile.name,
          scheduled_at_millis: this.range.value.start.getTime(),
        });
        setDoc(doc(this.firestore, "tasks", "removePromotion"+"-"+(data["id"] || encodeURI(data["name"]?.split("/")[0])+"-"+(new Date().getTime()))), {
          created_at_millis: new Date().getTime(),
          type: "removePromotion",
          status: "scheduled",
          data: data,
          title: this.selectedFile.name,
          scheduled_at_millis: this.range.value.end.getTime(),
        });
      } else {
        setDoc(doc(this.firestore, "tasks", this.selectedContext+"-"+(data["id"] || data["productId"] || encodeURI(data["name"]?.split("/")[0]))+"-"+(new Date().getTime())), {
          created_at_millis: new Date().getTime(),
          type: this.selectedContext,
          status: "pending",
          data: data,
          title: this.selectedFile.name,
        });
      }
    });
  }

  select(store:any){
    this.inventoryConfiguration.product.stock_location_id = store;
    this.inventoryConfiguration.variant.stock_location_id = store;
    this.rows.map((row:any) => {
      return {
        ...row,
        "stock_location_id": store
      }
    })
  }

  downloadTemplate(){
    if(this.selectedContext === 'product'){
      window.location.href = "https://firebasestorage.googleapis.com/v0/b/web-partners-lomi.appspot.com/o/Formatos%2FPlantilla%20creacion%20productos.xlsx?alt=media&token=9d96e7e0-4fbc-4537-8d09-d00616c7fab1"
    } else if(this.selectedContext === 'stock'){
      window.location.href = "https://firebasestorage.googleapis.com/v0/b/web-partners-lomi.appspot.com/o/Formatos%2Fplantilla%20stock.xlsx?alt=media&token=d2c3645c-d744-4af0-b7df-e0d688dfd60e"
    } else if(this.selectedContext === 'promotion'){
      window.location.href = "https://firebasestorage.googleapis.com/v0/b/web-partners-lomi.appspot.com/o/Formatos%2Fplantilla%20promociones.xlsx?alt=media&token=63a72f60-e444-4c20-af41-d485c858f962"
    }
  }

  Upload() {
    let fileReader = new FileReader();
      fileReader.onload = (e) => {
          this.arrayBuffer = fileReader.result;
          var data = new Uint8Array(this.arrayBuffer);
          var arr = new Array();
          for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
          var bstr = arr.join("");
          var workbook = XLSX.read(bstr, {type:"binary"});
          var first_sheet_name = workbook.SheetNames[0];
          var worksheet = workbook.Sheets[first_sheet_name];
          this.rows = XLSX.utils.sheet_to_json(worksheet,{raw:true});
          console.log(this.rows)
          const xlsxKeys = Object.keys(this.rows[0])
          xlsxKeys.forEach((key:string) => {
            this.associateAttribute(key)
          })
      }
      fileReader.readAsArrayBuffer(this.selectedFile);
  }
}
