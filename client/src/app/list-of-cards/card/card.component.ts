import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

import {Card} from '../../models/card.model';
import {FlashcardService} from "../../services/flashcard.service";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() card: Card;

  constructor(private flashcardService: FlashcardService) {
  }

  ngOnInit(): void {
  }

  onDeleted(): void {
    this.flashcardService.deleteCard(this.card.card_id).subscribe(
        () => console.log('OK'),
        error => console.log(error)
    );
  }
}
