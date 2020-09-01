import { Component, Input, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'

import { Set } from '../../../_models/set.model'
import { FlashcardService } from '../../../_services/flashcard.service'

@Component({
  selector: 'app-set-item',
  templateUrl: './set-item.component.html',
  styleUrls: ['./set-item.component.css'],
})
export class SetItemComponent implements OnInit {
  @Input() set: Set

  constructor() {}

  ngOnInit(): void {}

  contains(substring: string) {
    return this.set.title.toLowerCase().includes(substring.toLowerCase())
  }
}
