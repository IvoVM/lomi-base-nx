import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecentOrdersComponent } from './components/recent-orders/recent-orders.component';
import { TopProductsComponent } from './components/top-products/top-products.component';
import { HeaderComponent } from './components/header/header.component';
import { SettingsComponent } from './components/settings/settings.component';
import { getDataService } from './services/getData.service';
import { LoadingScreenComponent } from './components/loading-screen/loading-screen.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'base-front-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RecentOrdersComponent,
    TopProductsComponent,
    HeaderComponent,
    SettingsComponent,
    LoadingScreenComponent,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DashboardComponent {
  constructor(getDataService: getDataService) {
    getDataService.fetchData();
    getDataService.a();
  }
}
