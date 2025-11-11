import { Component, Input } from '@angular/core';

type CardType = 'pik' | 'karo' | 'herz' | 'kreuz';

const cardSymbols: Record<CardType, string> = {
  pik: '♠',
  karo: '♦',
  herz: '♥',
  kreuz: '♣',
} as const;

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
  @Input({ required: true }) value: string = '';
  @Input() type: CardType = 'pik';

  get color() {
    if (this.type === 'herz' || this.type === 'karo') {
      return 'red';
    }
    return 'black';
  }

  get symbol() {
    return cardSymbols[this.type];
  }
}
