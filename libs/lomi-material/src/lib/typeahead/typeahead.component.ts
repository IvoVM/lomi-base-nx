import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'lm-typeahead',
  standalone: true,
  imports: [CommonModule, FormsModule, MatAutocompleteModule, MatFormFieldModule, ReactiveFormsModule, MatInputModule],
  templateUrl: './typeahead.component.html',
  styleUrls: ['./typeahead.component.css'],
})
export class TypeaheadComponent {
  @Input() data!: Promise<any[]>;

  @Output() insufficentData!: EventEmitter<any>;
  @Output() query = new EventEmitter<string>();
  @Output() itemSelected: EventEmitter<any> = new EventEmitter<any>();
  @Output() results!: EventEmitter<any[]>;

  public currentSearch!: string;
  public currentData: any[] = [];
  public selectedData!: any;
  typeAheadControl = new FormControl('');

  ngOnInit(): void {
    this.init()
  }

  async init() {
    const data = await this.data;
    this.currentData = data;
    this.typeAheadControl.valueChanges.subscribe((value) => {
      this.search(value);
    })
    console.log(this.data)
  }
  
  selectItem(item:any){
    this.selectedData = item;
    this.itemSelected.emit(item);
  }

  async search(queryString:any){
    const data = await this.data;
    this.query.emit(queryString);
    if(!data){
      return;
    }
    this.currentData = data.filter((item:any) => {
      return item.toLowerCase().includes(queryString.toLowerCase());
    })
  }
}
