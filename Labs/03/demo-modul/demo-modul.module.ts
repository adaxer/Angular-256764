import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { TimeComponent } from "./time/time.component";
import { CardComponent } from "./card/card.component";
import { DemoOverviewComponent } from "./demo-overview/demo-overview.component";
import { EventsComponent } from './events/events.component';
import { OutputsComponent } from './outputs/outputs.component';

@NgModule({
  declarations: [
    TimeComponent,
    CardComponent,
    DemoOverviewComponent,
    FurnitureComponent,
    RomanNumberComponent, 
    EventsComponent, 
    OutputsComponent,
  ],
  bootstrap: [DemoOverviewComponent],
  imports: [CommonModule],
  exports: [DemoOverviewComponent],
})
export class DemoModulModule {}
