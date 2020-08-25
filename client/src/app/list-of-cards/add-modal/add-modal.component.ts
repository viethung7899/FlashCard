import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Card} from '../../models/card.model';
import {FlashcardService} from "../../services/flashcard.service";

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit {
  @Input() currentSet;
  @ViewChild('form') form;
  card = {
    title: '',
    description: ''
  }

  constructor(private flashcardService: FlashcardService) {
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.flashcardService
        .addCard(this.currentSet.set_id, this.card)
        .subscribe(() => console.log('OK'));
    this.reset();
  }

  reset(): void {
    this.form.reset();
  }
}
