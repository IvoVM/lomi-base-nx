import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { getDataService } from '../../services/getData.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  orders = 0;
  valueToShow: number = 0;
  targetValue!: number;
  animationDuration: number = 2000;

  constructor(private getDataService: getDataService) {}
  ngOnInit(): void {
    this.getDataService.getDataSubject().subscribe((res) => {
      this.orders = res.length;
      let total = res.reduce(
        (acumulado: any, objeto: any) => acumulado + parseFloat(objeto.total),
        0
      );
      this.targetValue = total;
      this.animateValue();
    });
  }

  animateValue() {
    const increment = Math.ceil(
      (this.targetValue - this.valueToShow) / (this.animationDuration / 16)
    ); // 16ms es el tiempo de un fotograma en la mayoría de los navegadores
    const interval = setInterval(() => {
      this.valueToShow += increment;
      if (this.valueToShow >= this.targetValue) {
        this.valueToShow = this.targetValue; // Asegurarse de que el valor objetivo se alcance exactamente
        clearInterval(interval); // Detener la animación cuando se alcanza el valor objetivo
      }
    }, 16);
  }
}
