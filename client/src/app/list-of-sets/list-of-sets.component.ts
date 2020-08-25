import { Component, OnInit } from '@angular/core';
import {CardsService} from '../services/cards.service';
import {Set} from '../models/set.model';

@Component({
  selector: 'app-list-of-sets',
  templateUrl: './list-of-sets.component.html',
  styleUrls: ['./list-of-sets.component.css']
})
export class ListOfSetsComponent implements OnInit {
  sets: Set[];
  newSet = '';

  constructor(private cardsService: CardsService) {
  }

  ngOnInit(): void {
    this.sets = this.cardsService.getSets();
    this.cardsService.setChanged.subscribe(
      (sets: Set[]) => this.sets = sets
    );
  }

  onAdded(): void {
    console.log(this.newSet);
    if (this.newSet.trim().length > 0) {
      this.cardsService.addSet(this.newSet);
    }
  }
}
