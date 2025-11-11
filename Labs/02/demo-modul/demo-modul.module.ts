import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeComponent } from './time/time.component';
import { CardComponent } from './card/card.component';
import { DemoOverviewComponent } from './demo-overview/demo-overview.component';

@NgModule({
  declarations: [TimeComponent, CardComponent, DemoOverviewComponent],
  bootstrap: [DemoOverviewComponent],
  imports: [CommonModule],
  exports: [DemoOverviewComponent],
})
export class DemoModulModule {}
