import { Component, OnInit } from '@angular/core';
import {CardsService} from '../services/cards.service';

import {Set} from '../models/set.model';

@Component({
  selector: 'app-list-of-cards',
  templateUrl: './list-of-cards.component.html',
  styleUrls: ['./list-of-cards.component.css']
})
export class ListOfCardsComponent implements OnInit {
  selectedSet: Set;

  constructor(private cardsService: CardsService) {
  }

  ngOnInit(): void {
    this.cardsService.setSelected.subscribe(
      (set: Set) => {
        this.selectedSet = set;
      }
    );
  }
}
