import {EventEmitter, Injectable} from '@angular/core';
import { data } from '../data';
import {Set} from '../models/set.model';
import {Card} from '../models/card.model';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
  sets = data;
  setSelected = new EventEmitter<Set>();
  setChanged = new EventEmitter<Set[]>();

  constructor() {}

  getSets(): Set[] {
    return this.sets.slice();
  }

  addSet(setName: string): void {
    this.sets.push(new Set(setName));
    this.setChanged.emit(this.sets.slice());
  }

  deleteSet(set: Set): void {
    this.sets = this.sets.filter(s => s !== set);
    this.setChanged.emit(this.sets.slice());
  }

  addCard(selectedSet: Set, card: Card): void {
    for (const set of this.sets) {
      if (set === selectedSet) {
        set.addCard(card);
      }
    }
    this.setChanged.emit(this.sets.slice());
  }

  editCard(selectedSet: Set, newCard: Card): void {
    console.log('Change card');
  }

  removeCard(selectedCard: Card): void {
    for (let i = 0; i < this.sets.length; i++) {
      this.sets[i].cards.filter(card => card !== selectedCard);
    }
    this.setChanged.emit(this.sets.slice());
  }
}


