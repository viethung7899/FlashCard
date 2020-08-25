import {Component, Input, OnInit} from '@angular/core';

import {Set} from '../../models/set.model';
import {FlashcardService} from "../../services/flashcard.service";

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit {
  @Input() set: Set;

  constructor(private flashcardService: FlashcardService) { }

  ngOnInit(): void {
  }

  onSelected(): void {
    console.log(this.set.set_id);
    this.flashcardService.selectSet.emit(this.set);
  }

  onDeleted(): void {
    this.flashcardService.deleteSet(this.set.set_id).subscribe(
        res => console.log(res)
    )
  }
}
