import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star',
  imports: [],
  templateUrl: './rating.html',
  styles: ``,
})
export class Rating {
  private _stars: number = 3;

  @Input() get stars() {
    return this._stars;
  }

  set stars(value: number){
    if(value===this._stars) {
      return;
    }
    this._stars=value;
    this.starsChanged.emit(value);
  }

  @Output() starsChanged: EventEmitter<number> = new EventEmitter<number>();

}
