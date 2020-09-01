import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core'

import { Card } from '../../../_models/card.model'

@Component({
  selector: 'app-card-item',
  templateUrl: './card-item.component.html',
  styleUrls: ['./card-item.component.css'],
})
export class CardItemComponent implements OnInit {
  @Input() card: Card
  @Output() deleteEvent = new EventEmitter<Card>();

  constructor() {}

  ngOnInit(): void {}

  onDeletion() {
    this.deleteEvent.emit(this.card)
  }
}
