import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-range-date-picker',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './range-date-picker.component.html',
  styleUrls: ['./range-date-picker.component.scss'],
  providers: [DatePipe],
})
export class RangeDatePickerComponent {
  form!: FormGroup;
  @Output() dateRangeSelected: EventEmitter<{
    startDate: string;
    endDate: string;
  }> = new EventEmitter();

  constructor(fb: FormBuilder, private datePipe: DatePipe) {
    this.form = fb.group({
      start: [null],
      end: [null],
    });
  }
  onSubmit() {
    const startDate = this.formatDate(this.form.value.start);
    const endDate = this.formatDate(this.form.value.end);
    console.log(startDate, endDate);
    let daterange = { startDate, endDate };
    this.dateRangeSelected.emit(daterange);
  }

  formatDate(date: Date | null): string {
    if (date) {
      const formattedDate = this.datePipe.transform(date, 'yyyy-MM-dd');
      return formattedDate || '';
    }
    return '';
  }
}
