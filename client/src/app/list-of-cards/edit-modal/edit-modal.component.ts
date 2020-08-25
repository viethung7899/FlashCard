import {Component, OnInit, ViewChild} from '@angular/core';
import {Card} from '../../models/card.model';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css']
})
export class EditModalComponent implements OnInit {
  @ViewChild('editForm') editForm;
  title = '';
  description = '';

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(): void {

  }

  recieveCard(card: Card): void {
    this.title = card.title;
    this.description = card.description;
  }
}
