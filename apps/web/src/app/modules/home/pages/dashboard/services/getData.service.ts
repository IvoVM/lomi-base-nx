import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class getDataService {
  private dataSubject: Subject<any> = new Subject<any>();
  // https://us-central1-lomi-35ab6.cloudfunctions.net/showLastOrders?statsAt=2023-6-19&endsAt=2023-6-21 (editado)

  constructor(private http: HttpClient) {}
  fetchData(stockLocation: string = '1', limit: number = 10): void {
    this.http
      .get(
        `https://us-central1-lomi-35ab6.cloudfunctions.net/showLastOrders?stockLocation=${stockLocation}&limit=${limit}`
      )
      .subscribe((response) => {
        this.dataSubject.next(response);
      });
  }

  getDataSubject() {
    return this.dataSubject;
  }
}
