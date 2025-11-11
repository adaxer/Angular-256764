import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demo-overview',
  templateUrl: './demo-overview.component.html',
  styleUrls: ['./demo-overview.component.css']
})
export class DemoOverviewComponent implements OnInit {
  // for outputs component
  scnds: number;
  startMessage: string;
  timerMessage: string;
  endMessage: string;
  endMessageFromChild: string;

  constructor() {
  }

  ngOnInit(): void {
  }
  clickHandler(sec: number) {
    this.scnds = sec;
  }

  startHandler() {
    this.startMessage = 'Zeit gestartet';
  }
  tickHandler(ev: number) {
    this.timerMessage = `restliche Zeit ${ev}`;
    if (ev === 0) this.endMessage = 'Zeit abgelaufen';
  }
  endHandler(ev: string) {
    this.endMessageFromChild = ev;
  }

}
