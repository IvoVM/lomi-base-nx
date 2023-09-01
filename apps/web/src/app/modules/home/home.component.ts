import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent, ModalsService } from '@lomi/material';
import { RouterModule } from "@angular/router";
import { StockItemsComponent } from './pages/stockItems/stock-items.component';
import { ProductUploaderComponent } from '../../product-uploader/product-uploader.component';
import { TasksComponent } from '../../tasks/tasks.component';
import { ProductListComponent } from '../../product-list/product-list.component';

@Component({
  selector: 'base-front-home',
  standalone: true,
  imports: [CommonModule, LayoutComponent, RouterModule, StockItemsComponent, ProductUploaderComponent, ProductListComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public modals: ModalsService = inject(ModalsService);

  public openModal() {
    this.modals.openModal(TasksComponent as any, {});
    console.log('open modal')
  }
}
