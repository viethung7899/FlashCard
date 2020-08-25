import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {CardsService} from '../../services/cards.service';
import {Card} from '../../models/card.model';

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent implements OnInit {
  @Input() currentSet;
  @ViewChild('form') form;
  title = '';
  description = '';

  constructor(private cardsService: CardsService) { }

  ngOnInit(): void {

  }

  onSubmit(): void {
    this.cardsService.addCard(this.currentSet, new Card(this.title, this.description));
    this.reset();
  }

  reset(): void {
    this.form.reset();
  }
}
