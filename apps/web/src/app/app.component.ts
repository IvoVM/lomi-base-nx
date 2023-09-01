import { Component, computed, effect, inject, signal } from "@angular/core";
import { RouterModule } from "@angular/router";
import * as lomiSDK from '@base-front/lomi-sdk-functions'
import { ModalsService } from "@lomi/material";
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

@Component({
  standalone: true,
  imports: [RouterModule, MatSnackBarModule],
  selector: "base-front-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "web";

  firstName = signal('Button');
  lastName = signal('');
  fullName = computed(() => `${this.firstName()} ${this.lastName()}`);

  public modalService = inject(ModalsService)
  private snackBar = inject(MatSnackBar)

  constructor() {
    lomiSDK
    window.showSnackbar = (message: string) => {
      this.snackBar.open(message, 'close', {
        duration: 2000,
        panelClass: ['snackbar']
      });
    }
    effect(() => console.log('Name changed:', this.fullName()));
    window.lomiAPI.stockLocations.listStockLocations().then((res)=>{
      console.log(res)
    })
  }

  setLastName(newLastName: string) {
    this.lastName.set(newLastName);
  }
  
}