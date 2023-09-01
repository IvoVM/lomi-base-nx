import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from '@lomi/material';
import { MatChipsModule } from '@angular/material/chips';
@Component({
  selector: 'base-front-stores',
  standalone: true,
  imports: [CommonModule, LayoutComponent, MatChipsModule],
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css'],
})
export class StoresComponent {
  public stockLocations$ = window.lomiAPI.stockLocations.listStockLocations().then((res)=>{
    res.forEach((stockLocation)=>{
      window.lomiAPI.stockLocations.getStockLocation(stockLocation.id).then((resSL)=>{
        console.log(res, stockLocation)
        if(resSL.data?.attributes){
          stockLocation.stores = resSL.data.attributes.stores
          stockLocation.zones = resSL.data.attributes.zones
        }
      })
    })
    return res
  })
}
