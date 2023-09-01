import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { getDataService } from '../../services/getData.service';
import { NgxPaginationModule } from 'ngx-pagination'; // <-- import the module
import { OffCanvasComponent } from '../off-canvas/off-canvas.component';
import { trigger, transition, animate, style } from '@angular/animations';

@Component({
  selector: 'app-recent-orders',
  templateUrl: './recent-orders.component.html',
  styleUrls: ['./recent-orders.component.scss'],
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, OffCanvasComponent],
  animations: [
    trigger('slideIn', [
      transition(':enter', [
        style({ transform: 'translateX(-10%)', opacity: 0 }),
        animate(
          '600ms ease-in',
          style({ transform: 'translateX(0)', opacity: 1 })
        ),
      ]),
    ]),
  ],
})
export class RecentOrdersComponent implements OnInit {
  recentOrders: Array<any> = [];
  page: number = 1;
  dataLoaded = false;

  constructor(private getDataService: getDataService) {}
  ngOnInit(): void {
    this.getDataService.getDataSubject().subscribe((res) => {
      let data;
      data = res.map((order: any) => ({
        channel: order.channel,
        id: order.id,
        payment_state: order.payment_state,
        total: order.total,
        shipments: order.shipments[0].line_items,
        shipments_length: order.shipments[0].line_items.length,
        email: order.email,
      }));
      this.recentOrders = data;
      this.dataLoaded = true;
    });
  }
}
