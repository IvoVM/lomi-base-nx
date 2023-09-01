import { topProductsService } from './../../services/top-products.service';
import { Component, OnInit } from '@angular/core';
import { getDataService } from '../../services/getData.service';
import { CommonModule } from '@angular/common';
import { TopProductsTableComponent } from './components/top-products-table/top-products-table.component';
import { GraphicComponent } from './components/graphic/graphic.component';

@Component({
  selector: 'app-top-products',
  templateUrl: './top-products.component.html',
  styleUrls: ['./top-products.component.scss'],
  standalone: true,
  imports: [CommonModule, TopProductsTableComponent, GraphicComponent],
})
export class TopProductsComponent implements OnInit {
  Table: Array<any> = [];
  data = { porcentajes: [100], names: ['Sin Data'] };
  constructor(
    private getDataService: getDataService,
    private topProductsService: topProductsService
  ) {}
  ngOnInit(): void {
    this.getDataService.getDataSubject().subscribe((res) => {
      this.data = res;
      const itemData = this.topProductsService.countLineProducts(res);
      this.Table = this.topProductsService.getTopProducts(itemData, 5);
      this.data = this.topProductsService.calcularPorcentajes(this.Table);
    });
  }
}
