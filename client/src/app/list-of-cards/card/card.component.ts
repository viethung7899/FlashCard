import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {CardsService} from '../../services/cards.service';

import {Card} from '../../models/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card: Card;
  @Output() sendCard = new EventEmitter<Card>();

  constructor(private cardsService: CardsService) {
  }

  ngOnInit(): void {
  }

  showEdit(): void {
    this.sendCard.emit(this.card);
  }

  onDeleted(): void {
    this.cardsService.removeCard(this.card);
  }
}
