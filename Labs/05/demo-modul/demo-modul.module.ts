import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TimeComponent } from "./time/time.component";
import { CardComponent } from "./card/card.component";
import { DemoOverviewComponent } from "./demo-overview/demo-overview.component";
import { FurnitureComponent } from "./furniture/furniture.component";
import { RomanNumberComponent } from "./roman-number/roman-number.component";

@NgModule({
  declarations: [
    TimeComponent,
    CardComponent,
    DemoOverviewComponent,
    FurnitureComponent,
    RomanNumberComponent,
  ],
  bootstrap: [DemoOverviewComponent],
  imports: [CommonModule],
  exports: [DemoOverviewComponent],
})
export class DemoModulModule {}
