import { Component, signal, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Rating } from './rating';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Rating],
  templateUrl: './app.html',
  styles: [],
})
export class App {
  protected readonly title = signal('todo-app');
  // Zugriff auf die Kind-Komponente per Template-Referenz `#starComponent`
  @ViewChild('starComponent') starComponent!: Rating;

  description: string = "Unsere erste Angular Applikation";
  myRating: number = 5;

  ratingChanged(newRating: number) {
    console.log("Rating geändert: neuer Wert = ", newRating);
    console.log("myRating geändert: neuer Wert = ", this.myRating);
  }

  increaseRating() {
    this.starComponent.stars++;
  }
}
