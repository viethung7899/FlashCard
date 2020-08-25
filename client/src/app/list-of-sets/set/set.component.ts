import {Component, Input, OnInit} from '@angular/core';
import {CardsService} from '../../services/cards.service';
import {Set} from '../../models/set.model';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit {
  @Input() set: Set;

  constructor(private cardsService: CardsService) { }

  ngOnInit(): void {
  }

  onSelected(): void {
    this.cardsService.setSelected.emit(this.set);
  }

  onDeleted(): void {
    this.cardsService.deleteSet(this.set);
  }
}
