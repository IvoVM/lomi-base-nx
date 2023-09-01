import { CommonModule } from '@angular/common';
import { Component, TemplateRef, OnInit, Input, ViewEncapsulation } from '@angular/core';
import {
  NgbOffcanvas,
  OffcanvasDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';
import { TopProductsTableComponent } from '../top-products/components/top-products-table/top-products-table.component';

@Component({
  selector: 'app-off-canvas',
  standalone: true,
  imports: [CommonModule, TopProductsTableComponent],
  templateUrl: './off-canvas.component.html',
  styleUrls: ['./off-canvas.component.scss'],
  encapsulation: ViewEncapsulation.None, //  <-----

})
export class OffCanvasComponent implements OnInit {
  @Input() data: any;

  constructor(private offcanvasService: NgbOffcanvas) {}

  ngOnInit(): void {
    this.data[0] = this.data[0].map((item: any) => {
      return {
        ...item,
        name: this.truncateString(item.name, 25),
      };
    });
  }
  openEnd(content: TemplateRef<any>) {
    console.log(this.data);
    this.offcanvasService.open(content, {  panelClass: 'details-panel', position: 'end'  });
  }

  truncateString(str: string, maxLength: number) {
    if (str.length > maxLength) {
      return str.substring(0, maxLength - 3) + '...';
    } else {
      return str;
    }
  }
}
