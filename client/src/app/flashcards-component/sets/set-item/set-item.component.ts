import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core'

import { Set } from '../../../_models/set.model'

@Component({
  selector: 'app-set-item',
  templateUrl: './set-item.component.html',
  styleUrls: ['./set-item.component.css'],
})
export class SetItemComponent implements OnInit {
  @Input() set: Set
  @Output() deleteEvent = new EventEmitter<Set>()

  constructor() {}

  ngOnInit(): void {}

  onDelete($event) {
    $event.stopPropagation()
    this.deleteEvent.emit(this.set)
  }
}
