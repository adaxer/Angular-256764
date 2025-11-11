import { Component } from '@angular/core';

@Component({
  selector: 'app-time',
  templateUrl: './time.component.html',
  styleUrl: './time.component.css',
})
export class TimeComponent {
  timestring!: string;

  constructor() {
    window.setInterval(
      () => ((this.timestring = new Date().toLocaleTimeString()), 1000)
    );
  }
}
