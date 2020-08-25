import {Card} from './card.model';

export class Set {
  public name: string;
  public cards: Card[];

  constructor(name: string) {
    this.name = name;
    this.cards = [];
  }

  addCard(card: Card): void {
    this.cards.push(card);
  }
}
