import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { getDataService } from '../../services/getData.service';
import { RangeDatePickerComponent } from '../rangeDatePicker/range-date-picker.component';

interface StockLocation {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    NgFor,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    RangeDatePickerComponent,
  ],
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  stockLocation: StockLocation[] = [
    { value: '1', viewValue: 'Las Condes' },
    { value: '28', viewValue: 'Ñuñoa' },
    { value: '24', viewValue: 'La Florida' },
    { value: '27', viewValue: 'Viña Del Mar' },
    { value: '28', viewValue: 'Rancagua' },
  ];
  public settings!: FormGroup;
  public actualLocation = '1';
  daterange: { startDate: string; endDate: string } = {
    startDate: '',
    endDate: '',
  };

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<DialogComponent>,
    private getDataService: getDataService
  ) {
    this.settings = this.formBuilder.group({
      selectedLocation: [this.actualLocation],
      ordersLimit: 5,
    });
  }
  onSubmit() {
    const formValues = this.settings.value;
    this.getDataService.fetchData(
      formValues.selectedLocation,
      formValues.ordersLimit
    );
    this.actualLocation = formValues.selectedLocation;
    this.dialogRef.close(formValues);
  }
  handleDateRangeSelected(eventData: { startDate: string; endDate: string }) {
    this.daterange.startDate = eventData.startDate;
    this.daterange.endDate = eventData.endDate;
  }
}
