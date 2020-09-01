import { Component, OnInit, ViewChild } from '@angular/core'

import { Set } from '../../../_models/set.model'
import { Card } from '../../../_models/card.model'
import { FlashcardService } from '../../../_services/flashcard.service'
import { ActivatedRoute, Params } from '@angular/router'
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-cards-detail',
  templateUrl: './cards-detail.component.html',
  styleUrls: ['./cards-detail.component.css'],
})
export class CardsDetailComponent implements OnInit {
  set: Set
  cards: Card[]

  constructor(
    private flashcardService: FlashcardService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadCards(this.route.snapshot.params['id'])
    this.route.params.subscribe((params: Params) =>
      this.loadCards(params['id'])
    )
    this.flashcardService.reloadCards.subscribe(() =>
      this.loadCards(this.set.set_id)
    )
  }

  loadCards(id: number): void {
    if (id) {
      this.flashcardService.getSetById(id).subscribe((set) => (this.set = set))
      this.flashcardService
        .getCards(id)
        .subscribe((cards) => (this.cards = cards.reverse()))
    }
  }
}
