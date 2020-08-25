import { Component, OnInit } from '@angular/core';
import {Set} from '../models/set.model';
import {FlashcardService} from "../services/flashcard.service";

@Component({
  selector: 'app-list-of-sets',
  templateUrl: './list-of-sets.component.html',
  styleUrls: ['./list-of-sets.component.css']
})
export class ListOfSetsComponent implements OnInit {
  sets: Set[];
  newSet = '';

  constructor(private flashcardService: FlashcardService) {
  }

  ngOnInit(): void {
    this.loadAllSets();
  }

  onAdded(): void {
    this.flashcardService.addSet(this.newSet).subscribe(
        () => this.loadAllSets()
    );
  }

  loadAllSets() {
    this.flashcardService.getSets().subscribe(
        sets => this.sets = sets
    )
  }
}
