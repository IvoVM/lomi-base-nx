import { NgModule } from "@angular/core";
import { AdDirective } from "./ad.directive";

@NgModule({
    declarations: [AdDirective],
    exports: [AdDirective]
})
export class AdModule{}