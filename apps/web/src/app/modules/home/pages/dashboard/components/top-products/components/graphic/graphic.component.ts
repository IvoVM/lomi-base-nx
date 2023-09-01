import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { TopProductsComponent } from '../../top-products.component';
import { DataObject } from '../../../../types/top-products.types';

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [CommonModule, NgApexchartsModule, TopProductsComponent],
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.scss'],
})
export class GraphicComponent implements OnChanges {
  @Input() data!: DataObject;
  donutData: any;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.donutData = {
        pieseries: this.data.porcentajes,
        labels: this.data.names,
        colors: ['#4454c3', '#c344ff', '#4ca5d9', '#f72d66', '#5ed94c'],
        chart: {
          type: 'pie',
          height: 300,
        },
        legend: {
          show: true,
          position: 'bottom',
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 280,
              },
              legend: {
                show: false,
                position: 'top',
              },
            },
          },
        ],
      };
    }
  }
}
