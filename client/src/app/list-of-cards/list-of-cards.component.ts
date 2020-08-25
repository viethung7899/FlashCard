import { Component, OnInit } from '@angular/core';

import {Set} from '../models/set.model';
import {Card} from "../models/card.model";
import {FlashcardService} from "../services/flashcard.service";

@Component({
  selector: 'app-list-of-cards',
  templateUrl: './list-of-cards.component.html',
  styleUrls: ['./list-of-cards.component.css']
})
export class ListOfCardsComponent implements OnInit {
  set: Set;
  cards: Card[];

  constructor(private flashcardService: FlashcardService) {
  }

  ngOnInit(): void {
    this.loadAllCards();
  }

  loadAllCards() {
    this.flashcardService.selectSet
        .subscribe(set => {
          this.set = set;
          this.flashcardService.getCards(set.set_id)
              .subscribe(cards => this.cards = cards);
        }
    )
  }
}
